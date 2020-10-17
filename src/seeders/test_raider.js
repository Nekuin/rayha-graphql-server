import models from "../model";

export const insertSeedRaider = () =>
    models.Raider.upsert({
        name: "Nekuin",
        class: "Paladin",
        spec: "Holy",
    }).then(() => console.log("Created Nekuin"));
