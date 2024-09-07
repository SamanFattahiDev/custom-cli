import {defineCommand} from "../../src";
import {createFile, getContent} from "../utils/fs";

export default defineCommand({
    meta: {
        name: "utility",
        description: "test",
    },
    args: {
        template: {
            type: "enum",
            description: "some local templates",
            options: ["utility", "alert", "overlay"],
            default: "utility",
            required: false,
        }
    },
    async run(ctx) {
        try {
            await createFile({
                directoryPath: `${process.cwd()}/composables`,
                fileName: `use${ctx.args.template.charAt(0).toUpperCase() + ctx.args.template.slice(1)}.ts`,
                fileContent:await getContent(`${process.cwd()}/templates/${ctx.args.template}.ts`)
            })
        } catch (e) {
            console.log(e)
        }

    },
});

