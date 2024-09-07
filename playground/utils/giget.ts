import {downloadTemplate} from "giget";

async function getGigetTemplate(url: string) {
    try {
        await downloadTemplate(url, {});

    } catch (e) {
        console.log(e)
    }
}


export {
    getGigetTemplate
}
