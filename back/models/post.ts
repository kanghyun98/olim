import { Model, DataTypes } from 'sequelize';

class Post extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataTypes.TEXT,
        },
      },
      {
        modelName: 'Post',
        tableName: 'posts',
        charset: 'utf8mb4', // 이모티콘 저장
        collate: 'utf8mb4_general_ci',
        sequelize,
      }
    );
  }

  static associate(db) {
    db.Post.hasMany(db.Image);
    db.Post.hasMany(db.Comment);
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    db.Post.belongsToMany(db.Post, { through: 'Like', as: 'Likers' });
  }
}

export default Post;
