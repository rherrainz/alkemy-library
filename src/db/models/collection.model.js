import { DataTypes } from "sequelize";

const collection = (sequelize) => {
  const Collection = sequelize.define(
    "collection",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      collectionName: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    { timestamps: true },
  );
  Collection.associate = (models) => {
    Collection.belongsToMany(models.Book, { through: "collection_book" });
    Collection.belongsTo(models.User);
  };
  return Collection;
};

export default collection;