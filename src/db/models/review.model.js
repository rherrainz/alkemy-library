import {DataTypes} from 'sequelize';

const review = (sequelize) => {
    const Review = sequelize.define('review', {
        reviewId: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        reviewText:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating:{
            type: DataTypes.INTEGER,
            validate:{
                min: 1,
                max: 10
            },
            allowNull: false,
        },
        userId:{
            type: DataTypes.UUID,
            allowNull: false,
        },
        bookId:{
            type: DataTypes.UUID,
            allowNull: false,
        },
    
    }, {timestamps: true});
    Review.asociate = (models) => {
        Review.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
        Review.belongsTo(models.Book, {
            foreignKey: 'bookId',
            as: 'book',
        });

    }

    return Review;
}
export default review;