import {DataTypes} from 'sequelize';

const loan = (sequelize) => {
    const Loan = sequelize.define('loan', {
        loanId: {
            type: DataTypes.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true,
        },
        startDate:{
            type: DataTypes.DATE,
            allowNull: false,
            },
        dueDate:{
            type: DataTypes.DATE,
            allowNull: false,
            },
        userId:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        bookId:{
            type: DataTypes.STRING,
            allowNull: false,
        }    
    }, {timestamps: true});
    Loan.associate = (models) => {
        Loan.hasOne(models.User, {
            foreignKey: "userId",
            as: "user",
        });
        Loan.hasOne(models.Book, {
            foreignKey: "bookId",
            as: "book",
        });
    }
    return Loan;
}
export default loan;