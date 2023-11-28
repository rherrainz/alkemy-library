import {DataTypes} from 'sequelize';

const author = (sequelize) => {
    const Author = sequelize.define('author', {
        authorId: {
            type: DataTypes.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true,
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthDate:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        nationality:{
            type: DataTypes.STRING,
        }
    }, {timestamps: true});
    Author.associate = (models) => {
        Author.hasMany(models.Book, {
            foreignKey: "authorId",
            as: "books",
        });
    }
    return Author;
}
export default author;