import { downloadTemplate } from "giget";

async function getGigetTemplate(url: string) {
  try {
    await downloadTemplate(url, {
      cwd: ".",
      dir: "./playground",
      force: true,
    });
  } catch (e) {
    console.log(e);
  }
}

export { getGigetTemplate };
