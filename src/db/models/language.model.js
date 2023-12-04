import { DataTypes } from "sequelize";

const language = (sequelize) => {
  const Language = sequelize.define(
    "language",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true },
  );
  Language.associate = (models) => {
    Language.belongsToMany(models.Book, { through: "book_language" });
  };
  return Language;
};
export default language;
