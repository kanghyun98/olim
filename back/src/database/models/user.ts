import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';

import Post from './post';
import Comment from './comment';

interface UsersAttributes {
  userId: string;
  password: string;
  userName: string;
  name: string;
}

class User extends Model<UsersAttributes> {
  public readonly id!: number;
  public userId!: string;
  public password!: string;
  public userName!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    userId: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    modelName: 'User',
    tableName: 'users',
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장
    sequelize,
  }
);

User.hasMany(Post);
User.hasMany(Comment);
User.belongsToMany(Post, { through: 'Like', as: 'Liked' }); // 테이블명: Like
User.belongsToMany(User, {
  through: 'Follow',
  as: 'Followers',
  foreignKey: 'FollowingId',
});
User.belongsToMany(User, {
  through: 'Follow',
  as: 'Followings',
  foreignKey: 'FollowerId',
});

export default User;
