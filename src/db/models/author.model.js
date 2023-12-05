import { DataTypes } from "sequelize";

const author = (sequelize) => {
  const Author = sequelize.define(
    "author",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      nationality: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: true },
  );
  Author.associate = (models) => {
    Author.belongsToMany(models.Book, { through: "author_book" });
  };
  return Author;
};
export default author;
