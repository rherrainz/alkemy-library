import {DataTypes,Sequelize} from 'sequelize';

const language = (sequelize) => {
    const Language = sequelize.define('language', {
        languageId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        languageName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {timestamps: true});
    Language.associate = (models) => {
        Language.belongsToMany(models.Book, {
            foreignKey: 'bookId',
            as: 'books',
            through: 'book_language',
        });
    }
    return Language;
}
export default language;