import Sequelize from "sequelize";
require("dotenv").config();

const un = process.env.DATABASE_USER;
const pw = process.env.DATABASE_PASSWORD;
const db = process.env.DATABASE;

let sequelize = new Sequelize(db, un, pw, {
    dialect: "postgres",
    protocol: "postgres",
    host: "localhost",
});

const models = {
    Raider: sequelize.import("./raider"),
};

// do any associations where needed
Object.keys(models).forEach((key) => {
    if ("associate" in models[key]) {
        models[key].associate(models);
    }
});

export { sequelize };
export default models;
