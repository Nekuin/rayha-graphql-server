import { gql } from "apollo-server-express";

import raiderSchema from "./raider.js";

const linkSchema = gql`
    scalar Date

    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`;

export default [linkSchema, raiderSchema];
