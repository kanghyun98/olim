import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';

import Post from './post';

interface ImagesAttributes {
  src: string;
}

class Image extends Model<ImagesAttributes> {
  public readonly id!: number;
  public src!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Image.init(
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

Image.belongsTo(Post);

export default Image;
