import {DataTypes} from 'sequelize';

const genre = (sequelize) => {
    const Genre = sequelize.define('genre', {
        genreId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        genreName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {timestamps: true});
    Genre.associate = (models) => {
        Genre.belongsToMany(models.Book, {
            foreignKey: 'bookId',
            as: 'books',
            through: 'book_genre',
        });
    }
    return Genre;
}
export default genre;