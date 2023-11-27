import { Sequelize, DataTypes } from "sequelize";

const user = (sequelize) => {
  const User = sequelize.define("user", {
    userId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
        },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
        },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    roleId:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
  }, { timestamps: true });
  User.associate = (models) => {
    User.hasOne(models.Role, {
      foreignKey: "roleId",
      as: "role",
    },
    User.hasMany(models.Review, {
        foreignKey: "userId",
        as: "reviews",
      }),
    );
  }
  return User;
};



export default user;