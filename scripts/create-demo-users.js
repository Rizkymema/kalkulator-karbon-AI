// Script untuk membuat user demo pada storage lokal.
// Jalankan dengan: node scripts/create-demo-users.js

const fs = require('fs/promises')
const path = require('path')
const { randomUUID } = require('crypto')
const bcrypt = require('bcryptjs')

const DATA_FILE = path.join(process.cwd(), 'data', 'local-db.json')

function nowIso() {
  return new Date().toISOString()
}

async function loadData() {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })

  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8')
    const parsed = JSON.parse(raw)

    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      emissions: Array.isArray(parsed.emissions) ? parsed.emissions : [],
    }
  } catch {
    return { users: [], emissions: [] }
  }
}

async function saveData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8')
}

function upsertUser(data, payload) {
  const existingUser = data.users.find((user) => user.email === payload.email)

  if (existingUser) {
    Object.assign(existingUser, payload, { updatedAt: nowIso() })
    return existingUser
  }

  const timestamp = nowIso()
  const createdUser = {
    id: randomUUID(),
    status: 'active',
    phone: null,
    city: null,
    job: null,
    gender: null,
    about: null,
    instagram: null,
    image: null,
    emailVerified: null,
    createdAt: timestamp,
    updatedAt: timestamp,
    ...payload,
  }

  data.users.push(createdUser)
  return createdUser
}

async function createDemoUsers() {
  console.log('Creating demo users in local storage...')

  try {
    const data = await loadData()
    const adminPassword = await bcrypt.hash('admin123', 10)
    const userPassword = await bcrypt.hash('user123', 10)

    const admin = upsertUser(data, {
      name: 'Admin TebusKarbon',
      email: 'admin@tebuskarbon.com',
      hashedPassword: adminPassword,
      role: 'ADMIN',
    })

    console.log('Admin ready:', admin.email)

    const user = upsertUser(data, {
      name: 'User Demo 1',
      email: 'user1@example.com',
      hashedPassword: userPassword,
      role: 'USER',
    })

    console.log('Demo user ready:', user.email)

    await saveData(data)

    console.log('Done.')
    console.log('Login credentials:')
    console.log('Admin: admin@tebuskarbon.com / admin123')
    console.log('User: user1@example.com / user123')
  } catch (error) {
    console.error('Failed to create demo users:', error)
    process.exitCode = 1
  }
}

createDemoUsers()
