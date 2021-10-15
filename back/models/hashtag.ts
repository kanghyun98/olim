import { Model, DataTypes } from 'sequelize';

class Hashtag extends Model {
  static init(sequelize) {
    return super.init(
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
  }

  static associate(db) {
    db.Hashtag.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  }
}

export default Hashtag;
