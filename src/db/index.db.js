import { Sequelize } from "sequelize";
import author from "./models/author.model.js";
import book from "./models/book.model.js";
import genre from "./models/genre.model.js";
import language from "./models/language.model.js";
import loan from "./models/loan.model.js";
import review from "./models/review.model.js";
import role from "./models/role.model.js";
import user from "./models/user.model.js";
import 'dotenv/config';

let db = {};

// const sequelize = new Sequelize(process.env.DATABASE_URI,{
//     dialect: 'mysql',
//     dialectOptions:{
//         ssl:{
//             rejectUnauthorized: true
//         }
//     }
// }); 


const sequelize = new Sequelize('alkemy_library', 'root', '159dae159', {
    host: 'localhost',
    dialect: 'mysql'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Author = author(sequelize, Sequelize);
db.Book = book(sequelize, Sequelize);
db.Genre = genre(sequelize, Sequelize);
db.Language = language(sequelize, Sequelize);
db.Loan = loan(sequelize, Sequelize);
db.Review = review(sequelize, Sequelize);
db.Role = role(sequelize, Sequelize);
db.User = user(sequelize, Sequelize);

db.Author.associate(db);
db.Book.associate(db);
db.Genre.associate(db);
db.Language.associate(db);
db.Loan.associate(db);
db.Review.associate(db);
db.Role.associate(db);
db.User.associate(db);

export { db };