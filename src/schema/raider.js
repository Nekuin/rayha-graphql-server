import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        raiders: [Raider!]
        raider(name: String!): Raider
    }

    extend type Mutation {
        addRaider(name: String, class: String, spec: String): Raider
    }

    extend type Subscription {
        raiderAdded: Raider
    }

    type Raider {
        name: String
        class: String
        spec: String
    }
`;
