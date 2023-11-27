import { Sequelize, DataTypes } from "sequelize";

const role = (sequelize) => {
  const Role = sequelize.define("role", {
    roleId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name:{
        type: DataTypes.ENUM('superadmin','admin', 'user', 'guest'),
        allowNull: false,        
        },
    
  }, { timestamps: true });
  Role.associate = (models) => {
    Role.belongsToMany(models.User, { //revisar si funciona mal el belongsToMany si no va el hasMany
      foreignKey: "roleId",
      as: "users",
    });
  }
  return Role;
};

export default role;