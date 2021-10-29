import { Model, DataTypes, Sequelize } from 'sequelize';

class User extends Model {
  [x: string]: any;
  public readonly id!: number;
  public loginId!: string;
  public password!: string;
  public userName!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    return User.init(
      {
        loginId: {
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
  }

  static associate(db: any) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followers',
      foreignKey: 'FollowingId',
    });
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followings',
      foreignKey: 'FollowerId',
    });
  }
}

export default User;
