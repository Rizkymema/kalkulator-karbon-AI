const fs = require('fs/promises')
const path = require('path')

const DATA_FILE = path.join(process.cwd(), 'data', 'local-db.json')

async function resetLocalDb() {
  try {
    await fs.rm(DATA_FILE, { force: true })
    console.log('Local storage reset. The file will be recreated automatically on next use.')
  } catch (error) {
    console.error('Failed to reset local storage:', error)
    process.exitCode = 1
  }
}

resetLocalDb()