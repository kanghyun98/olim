import { Model, DataTypes, Sequelize } from 'sequelize';

interface ImagesAttributes {
  src: string;
}

class Image extends Model<ImagesAttributes> {
  public readonly id!: number;
  public src!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    return Image.init(
      {
        src: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
      },
      {
        modelName: 'Image',
        tableName: 'images',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize,
      }
    );
  }
  static associate(db: any) {
    db.Image.belongsTo(db.Post);
  }
}

export default Image;
