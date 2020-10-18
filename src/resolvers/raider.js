import Sequelize from "sequelize";
import pubsub from "../subscription";

export default {
    Query: {
        raiders: async (parent, args, { models }) => {
            return await models.Raider.findAll();
        },
        raider: async (parent, { name }, { models }) => {
            return await models.Raider.findOne({
                where: { name: name },
            });
        },
    },

    Subscription: {
        raiderAdded: {
            subscribe: () => pubsub.asyncIterator(EVENTS.RAIDER.CREATED),
        },
    },

    Mutation: {
        addRaider: async (parent, args, { models }) => {
            const raider = await models.Raider.create({
                name: args.name,
                class: args.class,
                spec: args.spec,
            });
            return raider;
        },
    },
};
