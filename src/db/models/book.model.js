import {DataTypes} from 'sequelize';

const book = (sequelize) => {
    const Book = sequelize.define('book', {
        bookId: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        ISBN:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        edition:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        year:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        numberOfPages:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },  
        authorId:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        publisher:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        languageId:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        avgScore:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        isLoaned:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isLongLoan:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isActive:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        genreId:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        authorId:{
            type: DataTypes.STRING,
            allowNull: false,
        }      
        
    }, {timestamps: true});
    Book.associate = (models) => {
        Book.hasMany(models.Author, { //revisar si va belongsToMany
            foreignKey: "authorId",
            as: "author",
        });
        Book.hasMany(models.Language, { //revisar si va belongsToMany
            foreignKey: "languageId",
            as: "language",
        });
        Book.hasMany(models.Genre, { //revisar si va belongsToMany
            foreignKey: "genreId",
            as: "genre",
        });
        Book.hasMany(models.Loan, {
            foreignKey: "bookId",
            as: "loan",
        });
    }
    return Book;
}

export default book;