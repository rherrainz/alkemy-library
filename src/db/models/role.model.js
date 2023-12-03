import { DataTypes, Sequelize } from 'sequelize';

const role = (sequelize) => {
  const Role = sequelize.define("role", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role: {
      type: DataTypes.ENUM(['superadmin', 'admin', 'user', 'guest']),
      allowNull: false,
    },

  }, { timestamps: true });
  // Role.associate = (models) => {
  //   Role.hasMany(models.User)
  // }
  return Role;
};

export default role;