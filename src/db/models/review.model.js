import { DataTypes } from 'sequelize';

const review = (sequelize) => {
    const Review = sequelize.define('review', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        reviewText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            },
            allowNull: false,
        },
    }, { timestamps: true });
    Review.associate = (models) => {
        Review.belongsTo(models.User)
        Review.belongsTo(models.Book)
    }

    return Review;
}
export default review;