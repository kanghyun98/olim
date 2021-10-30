import { Model, DataTypes, Sequelize } from 'sequelize';

class Post extends Model {
  [x: string]: any;
  public readonly id!: number;
  public text!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    return Post.init(
      {
        text: {
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
  static associate(db: any) {
    db.Post.hasMany(db.Image);
    db.Post.hasMany(db.Comment);
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
  }
}

export default Post;
