import { Model, DataTypes, Sequelize } from 'sequelize';

class Hashtag extends Model {
  public readonly id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    return Hashtag.init(
      {
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
      },
      {
        modelName: 'Hashtag',
        tableName: 'hashtags',
        charset: 'utf8', // 이모티콘 저장
        collate: 'utf8_general_ci',
        sequelize,
      }
    );
  }
  static associate(db: any) {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
  }
}

export default Hashtag;
