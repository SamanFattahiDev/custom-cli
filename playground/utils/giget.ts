import {loadConfig} from "c12";
import {moduleTemplates} from "./moduleTemplates";
import {exec} from "child_process"

let dependenciesCommand = 'pnpm i'
let devDependenciesCommand = 'pnpm i -D'

async function getGigetTemplate(template: string) {

    try {

        // await downloadTemplate(moduleTemplates[template].url, {
        //     cwd: ".",
        //     dir: "./playground",
        //     force: true,
        // });
        if (moduleTemplates[template].dependencies.length > 0) {
            await installPackages(moduleTemplates[template].dependencies, false)
        }
        if (moduleTemplates[template].devDependencies.length > 0) {
            await installPackages(moduleTemplates[template].devDependencies, true)
        }
        await runCommand()
    } catch (e) {
        console.log(e);
    }
}

async function installPackages(packageList: [], dev: boolean) {
    const {config, configFile} = await loadConfig({
        cwd: process.cwd(),
        configFile: 'package.json'
    })
    const projectPackages = dev ? config.devDependencies : config.dependencies
    packageList.forEach((packageName: string) => {
        if (projectPackages[packageName]) {
            // package exists
        } else {
            dev ? devDependenciesCommand += ` ${packageName} ` : dependenciesCommand += ` ${packageName} `
        }
    })

}


async function runCommand() {
    await exec(`${dependenciesCommand} & ${devDependenciesCommand}`, (error, stdout, stderr) => {
        if (error) {
            console.error('error happened:', error)
        }
        if (stderr) {
            console.error('std happened: ', stderr)
        }
        console.log('stdout', stdout)
    })
}

export {getGigetTemplate};
