import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';

interface HashtagsAttributes {
  content: string;
}

class Hashtag extends Model<HashtagsAttributes> {
  public readonly id!: number;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Hashtag.init(
  {
    content: {
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

Hashtag.belongsToMany(Hashtag, { through: 'PostHashtag' });

export default Hashtag;
