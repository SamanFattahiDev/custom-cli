import { defineCommand } from "../../src";
import { getGigetTemplate } from "../utils/giget";

export default defineCommand({
  meta: {
    name: "simagar-cli",
    description: "global utility management for frontend",
  },
  args: {
    template: {
      type: "string",
      description: "some local templates",
      options: ["utility", "alert", "overlay", "auth", "spinner"],
      default: "utility",
      required: false,
    },
  },
  async run(ctx) {
    try {
      await getGigetTemplate(ctx.args.template);
      // await createFile({
      //     directoryPath: `${process.cwd()}/composables`,
      //     fileName: `use${ctx.args.template.charAt(0).toUpperCase() + ctx.args.template.slice(1)}.ts`,
      //     fileContent:!ctx.args.external ? await getContent(`${process.cwd()}/templates/${ctx.args.template}.ts`) : getGigetTemplate(ctx.args.external)
      // })
    } catch (e) {
      console.log(e);
    }
  },
});
