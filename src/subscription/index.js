import { PubSub } from "apollo-server";

import * as RAIDER_EVENTS from "./raider";

export const EVENTS = {
    RAIDER: RAIDER_EVENTS,
};

export default new PubSub();
