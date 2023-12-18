import { DataTypes } from "sequelize";

const book = (sequelize) => {
  const Book = sequelize.define(
    "book",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ISBN: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      edition: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      numberOfPages: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      publisher: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avgScore: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      isLoaned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isLongLoan: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: true },
  );
  Book.associate = (models) => {
    Book.belongsToMany(models.Author, { through: "author_book" });
    Book.belongsToMany(models.Language, { through: "book_language" });
    Book.belongsToMany(models.Genre, { through: "book_genre" });
    Book.belongsToMany(models.Collection, { through: "collection_book" });
    Book.hasMany(models.Loan);
    Book.hasMany(models.Review);
  };
  return Book;
};

export default book;
