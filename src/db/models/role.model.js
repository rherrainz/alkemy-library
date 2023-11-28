import {DataTypes,Sequelize} from 'sequelize';

const role = (sequelize) => {
  const Role = sequelize.define("role", {
    roleId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role:{
        type: DataTypes.ENUM('superadmin','admin', 'user', 'guest'),
        allowNull: false,        
        },
    
  }, { timestamps: true });
  Role.associate = (models) => {
    Role.belongsToMany(models.User, 
    { 
      foreignKey: "roleId",
      as: "users",
      through: "user_role",
    });
  }
  return Role;
};

export default role;