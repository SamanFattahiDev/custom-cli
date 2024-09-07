import fs from 'fs'

interface IOpts {
    directoryPath: string
    fileName?: string,
    fileContent: unknown
}

// Check if a file exists
export async function exists(path: string) {
    try {
        await fs.promises.access(path)
        return true
    } catch {
        return false
    }
}

async function createFile(opts: IOpts) {
    const isDirectoryExists = await exists(opts.directoryPath)
    if (!isDirectoryExists) {
        fs.mkdirSync(opts.directoryPath)
    }
    fs.writeFileSync(`${opts.directoryPath}/${opts.fileName}`, opts.fileContent)

}

async function getContent(filePath) {
    const isFileExists = await exists(filePath)
    if (isFileExists) {
        return await fs.readFileSync(filePath)
    } else {
        throw('no such file !')
    }
}


export {
    createFile,
    getContent
}
