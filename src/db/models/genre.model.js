import { DataTypes } from "sequelize";

const genre = (sequelize) => {
  const Genre = sequelize.define(
    "genre",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true },
  );
  Genre.associate = (models) => {
    Genre.belongsToMany(models.Book, { through: "book_genre" });
  };
  return Genre;
};
export default genre;
