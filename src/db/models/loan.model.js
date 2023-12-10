import { DataTypes } from "sequelize";

const loan = (sequelize) => {
  const Loan = sequelize.define(
    "loan",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
    },
    { timestamps: true }
  );
  Loan.associate = (models) => {
    Loan.belongsTo(models.User);
    Loan.belongsTo(models.Book);
  };
  return Loan;
};
export default loan;
