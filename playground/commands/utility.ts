import {defineCommand} from "../../src";
import {getGigetTemplate} from "../utils/giget";

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
        },
        external: {
            type: "string",
            description: 'link to github repo'
        }
    },
    async run(ctx) {
        try {
            getGigetTemplate(ctx.args.external)
            // await createFile({
            //     directoryPath: `${process.cwd()}/composables`,
            //     fileName: `use${ctx.args.template.charAt(0).toUpperCase() + ctx.args.template.slice(1)}.ts`,
            //     fileContent:!ctx.args.external ? await getContent(`${process.cwd()}/templates/${ctx.args.template}.ts`) : getGigetTemplate(ctx.args.external)
            // })
        } catch (e) {
            console.log(e)
        }
    },
});

