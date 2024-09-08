import { downloadTemplate, registryProvider } from "giget";

const gitea = registryProvider("http://git.simagar.com:3000", {
  auth: "token 381b5f4a14e08e061a71f9889f989fdfe8961706",
});
async function getGigetTemplate(url: string) {
  console.log(url);
  try {
    await downloadTemplate(`gitea:cli/${url}`, {
      providers: { gitea },
      cwd: ".",
      dir: "./playground",
      force: true,
    });
  } catch (e) {
    console.log(e);
  }
}

export { getGigetTemplate };
