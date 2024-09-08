import {defineCommand, runMain} from "../src";
import consola from "consola";

const main = defineCommand({
    meta: {
        name: "citty",
        version: "1.0.0",
        description: "Citty playground CLI",
    },
    setup() {
        consola.info("Setup");
    },
    cleanup() {
        consola.info("Cleanup");
    },
    subCommands: {
        build: () => import("./commands/build").then((r) => r.default),
        deploy: () => import("./commands/deploy").then((r) => r.default),
        addModule: () => import("./commands/module").then((r) => r.default),
    },
});

runMain(main);
