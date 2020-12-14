import { promises as fs, read } from 'fs'
import path from 'path'
import { nextTick } from 'process'
import { fileURLToPath } from 'url'

const userFile = path.resolve(process.env.USER_FILE_LOCATION)
const entryFile = path.resolve(process.env.ENTRY_FILE_LOCATION)

// Read the file
const readData = async (file) => {
    try {
        let currentFile = await fs.readFile(file)
        return JSON.parse(currentFile)
    } catch (err) {
        console.error(err)
        throw err
    }
}

// Write to file
const writeData = async (file, data) => {
        await fs.writeFile(file, JSON.stringify(data, null, 2))
}

// Add to file
const addData = async (file, data) => {
  try {
    let fullFile = await readData(file);
    fullFile.push(data);
    await writeData(file, fullFile);
  } catch (err) {
    console.error(err);
    throw err;
  }
};


export {
    readData,
    addData,
    userFile,
    entryFile
}