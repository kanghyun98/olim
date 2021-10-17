import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';

import User from './user';
import Comment from './comment';
import Image from './image';
import Hashtag from './hashtag';

interface PostsAttributes {
  content: string;
}

class Post extends Model<PostsAttributes> {
  public readonly id!: number;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
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

Post.hasMany(Image);
Post.hasMany(Comment);
Post.belongsTo(User);
Post.belongsToMany(Hashtag, { through: 'PostHashtag' });
Post.belongsToMany(Post, { through: 'Like', as: 'Likers' });

export default Post;
