import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';

import User from './user';
import Post from './post';

interface CommentsAttributes {
  content: string;
}

class Comment extends Model<CommentsAttributes> {
  public readonly id!: number;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    modelName: 'Comment',
    tableName: 'comments',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    sequelize,
  }
);

Comment.belongsTo(User);
Comment.belongsTo(Post);

export default Comment;
