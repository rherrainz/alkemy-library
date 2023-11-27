import {DataTypes} from 'sequelize';

const language = (sequelize) => {
    const Language = sequelize.define('language', {
        languageId: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
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
        });
    }
    return Language;
}
export default language;