import { gql } from "apollo-server-express";

export default gql`
    directive @rateLimit(
        max: Int
        window: String
        message: String
        identityArgs: [String]
        arrayLenghtField: String
    ) on FIELD_DEFINITION

    extend type Query {
        raiders: [Raider!]
        raider(name: String!): Raider
    }

    extend type Mutation {
        addRaider(name: String, class: String, spec: String): Raider
            @rateLimit(
                window: "60s"
                max: 2
                message: "Stop right there you criminal scum!"
            )
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
