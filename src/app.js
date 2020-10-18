import { ApolloServer } from "apollo-server-express";
require("dotenv").config();
import express from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";

import schema from "./schema";
import resolvers from "./resolvers/index.js";
import models, { sequelize } from "./model/index.js";
import seedDatabase from "./seeders";

const app = express();

app.use(cors());
app.use(morgan("dev"));

const server = new ApolloServer({
    introspection: true,
    playground: true,
    typeDefs: schema,
    resolvers: resolvers,
    formatError: (error) => {
        // remove the internal sequelize error message
        // leave only the important validation error
        const message = error.message
            .replace("SequelizeValidationError: ", "")
            .replace("Validation error: ", "");
        return { ...error, message };
    },
    // context is used by resolvers
    context: async ({ req, connection }) => {
        return { models };
    },
});

server.applyMiddleware({ app, path: "/" });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT;

// force: true = wipe DB on start
sequelize.sync({ force: true }).then(async () => {
    // insert test data and necessary database seeders
    console.log("Insertin seed data...");
    await seedDatabase();
    // query all raiders
    let r = await findRaiders();
    console.log("All raiders");
    r.map((item, index) => {
        console.log("Raider", item.dataValues);
    });
    // query raider by name
    let one = await findRaider("Nekuin");
    console.log("one", one.dataValues);

    httpServer.listen({ port }, () => {
        console.log("Apollo server on http://localhost:" + port);
        console.log(
            "Subscriptions at ws://localhost" + port + server.subscriptionsPath
        );
    });
});

const findRaiders = async () => {
    return await models.Raider.findAll();
};

const findRaider = async (raiderName) => {
    return await models.Raider.findOne({
        where: { name: raiderName },
    });
};
