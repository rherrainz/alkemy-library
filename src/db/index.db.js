import { Sequelize } from "sequelize";
import author from "./models/author.model.js";
import book from "./models/book.model.js";
import genre from "./models/genre.model.js";
import language from "./models/language.model.js";
import loan from "./models/loan.model.js";
import review from "./models/review.model.js";
import user from "./models/user.model.js";
import event from "./models/event.model.js";
import collection from "./models/collection.model.js";
import "dotenv/config";

let db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  },
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Author = author(sequelize, Sequelize);
db.Book = book(sequelize, Sequelize);
db.Genre = genre(sequelize, Sequelize);
db.Language = language(sequelize, Sequelize);
db.Loan = loan(sequelize, Sequelize);
db.Review = review(sequelize, Sequelize);
db.User = user(sequelize, Sequelize);
db.Event = event(sequelize, Sequelize);
db.Collection = collection(sequelize, Sequelize);

db.Author.associate(db);
db.Book.associate(db);
db.Genre.associate(db);
db.Language.associate(db);
db.Loan.associate(db);
db.Review.associate(db);
db.User.associate(db);
db.Event.associate(db);
db.Collection.associate(db);

export { db };
