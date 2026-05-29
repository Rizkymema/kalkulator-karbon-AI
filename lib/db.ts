import { promises as fs } from "fs"
import path from "path"
import { randomUUID } from "crypto"
import bcrypt from "bcryptjs"

type UserRole = "ADMIN" | "MODERATOR" | "USER"
type UserStatus = "active" | "inactive" | "suspended"
type SortDirection = "asc" | "desc"

type QueryArgs = {
  where?: Record<string, unknown>
  include?: Record<string, unknown>
  select?: Record<string, unknown>
  orderBy?: Record<string, unknown>
  take?: number
  skip?: number
  data?: Record<string, unknown>
  update?: Record<string, unknown>
  create?: Record<string, unknown>
}

type DatabaseUser = {
  id: string
  name: string | null
  email: string
  hashedPassword: string | null
  role: UserRole
  status: UserStatus
  phone: string | null
  city: string | null
  job: string | null
  gender: string | null
  about: string | null
  instagram: string | null
  image: string | null
  emailVerified: string | null
  createdAt: string
  updatedAt: string
}

type DatabaseEmission = {
  id: string
  userId: string
  totalEmisi: number
  pohonDibutuhkan: number
  aksiTebus: string | null
  tanggal: string
  emissionData: string | null
  createdAt: string
  updatedAt: string
}

type DatabaseState = {
  users: DatabaseUser[]
  emissions: DatabaseEmission[]
}

export interface DbEmissionRecord {
  id: string
  userId: string
  totalEmisi: number
  pohonDibutuhkan: number
  aksiTebus: string | null
  tanggal: Date
  emissionData: string
  createdAt: Date
  updatedAt: Date
  user: DbUserRecord
}

export interface DbUserRecord {
  id: string
  name: string | null
  email: string
  hashedPassword: string | null
  role: UserRole
  status: UserStatus
  phone: string | null
  city: string | null
  job: string | null
  gender: string | null
  about: string | null
  instagram: string | null
  image: string | null
  emailVerified: string | null
  createdAt: Date
  updatedAt: Date
  emissions: DbEmissionRecord[]
}

type TransactionClient = {
  user: LocalUserTable
  emissionRecord: LocalEmissionTable
  emission: LocalEmissionTable
}

type LocalUserTable = {
  findUnique: (args?: QueryArgs) => Promise<DbUserRecord | null>
  findFirst: (args?: QueryArgs) => Promise<DbUserRecord | null>
  findMany: (args?: QueryArgs) => Promise<DbUserRecord[]>
  count: (args?: QueryArgs) => Promise<number>
  create: (args: QueryArgs) => Promise<DbUserRecord>
  update: (args: QueryArgs) => Promise<DbUserRecord>
  delete: (args: QueryArgs) => Promise<DbUserRecord>
  upsert: (args: QueryArgs) => Promise<DbUserRecord>
}

type LocalEmissionTable = {
  findUnique: (args?: QueryArgs) => Promise<DbEmissionRecord | null>
  findFirst: (args?: QueryArgs) => Promise<DbEmissionRecord | null>
  findMany: (args?: QueryArgs) => Promise<DbEmissionRecord[]>
  count: (args?: QueryArgs) => Promise<number>
  create: (args: QueryArgs) => Promise<DbEmissionRecord>
  deleteMany: (args?: QueryArgs) => Promise<{ count: number }>
  aggregate: (args?: QueryArgs & { _sum?: Record<string, boolean> }) => Promise<{ _sum: Record<string, number | null> }>
}

type LocalDatabaseClient = TransactionClient & {
  $transaction: <T>(callback: (tx: TransactionClient) => Promise<T>) => Promise<T>
}

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "local-db.json")

let writeQueue = Promise.resolve()

function nowIso() {
  return new Date().toISOString()
}

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function toNullableString(value: unknown): string | null {
  return typeof value === "string" ? value : value == null ? null : String(value)
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function toIsoString(value: unknown, fallback = nowIso()): string {
  if (value instanceof Date) {
    return value.toISOString()
  }

  if (typeof value === "string") {
    const parsed = new Date(value)
    return Number.isNaN(parsed.getTime()) ? fallback : parsed.toISOString()
  }

  return fallback
}

function toDate(value: string): Date {
  return new Date(value)
}

function normalizeRole(value: unknown): UserRole {
  if (value === "ADMIN" || value === "MODERATOR") {
    return value
  }

  return "USER"
}

function normalizeStatus(value: unknown): UserStatus {
  if (value === "inactive" || value === "suspended") {
    return value
  }

  return "active"
}

function createSeedState(): DatabaseState {
  const timestamp = nowIso()

  return {
    users: [
      {
        id: randomUUID(),
        name: "Admin TebusKarbon",
        email: "admin@tebuskarbon.com",
        hashedPassword: bcrypt.hashSync("admin123", 10),
        role: "ADMIN",
        status: "active",
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
      },
      {
        id: randomUUID(),
        name: "User Demo 1",
        email: "user1@example.com",
        hashedPassword: bcrypt.hashSync("user123", 10),
        role: "USER",
        status: "active",
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
      },
    ],
    emissions: [],
  }
}

function normalizeUser(raw: Record<string, unknown>): DatabaseUser {
  const timestamp = nowIso()

  return {
    id: typeof raw.id === "string" ? raw.id : randomUUID(),
    name: toNullableString(raw.name),
    email: typeof raw.email === "string" ? raw.email.toLowerCase() : "",
    hashedPassword: toNullableString(raw.hashedPassword),
    role: normalizeRole(raw.role),
    status: normalizeStatus(raw.status),
    phone: toNullableString(raw.phone),
    city: toNullableString(raw.city),
    job: toNullableString(raw.job),
    gender: toNullableString(raw.gender),
    about: toNullableString(raw.about),
    instagram: toNullableString(raw.instagram),
    image: toNullableString(raw.image),
    emailVerified: raw.emailVerified == null ? null : toIsoString(raw.emailVerified, timestamp),
    createdAt: toIsoString(raw.createdAt, timestamp),
    updatedAt: toIsoString(raw.updatedAt, timestamp),
  }
}

function normalizeEmission(raw: Record<string, unknown>): DatabaseEmission {
  const timestamp = nowIso()

  return {
    id: typeof raw.id === "string" ? raw.id : randomUUID(),
    userId: typeof raw.userId === "string" ? raw.userId : "",
    totalEmisi: toNumber(raw.totalEmisi),
    pohonDibutuhkan: toNumber(raw.pohonDibutuhkan),
    aksiTebus: toNullableString(raw.aksiTebus),
    tanggal: toIsoString(raw.tanggal, timestamp),
    emissionData: toNullableString(raw.emissionData),
    createdAt: toIsoString(raw.createdAt, timestamp),
    updatedAt: toIsoString(raw.updatedAt, timestamp),
  }
}

function normalizeState(raw: unknown): DatabaseState {
  if (!raw || typeof raw !== "object") {
    return createSeedState()
  }

  const parsed = raw as Partial<DatabaseState>

  return {
    users: Array.isArray(parsed.users)
      ? parsed.users.map((user) => normalizeUser(user as unknown as Record<string, unknown>))
      : createSeedState().users,
    emissions: Array.isArray(parsed.emissions)
      ? parsed.emissions.map((emission) => normalizeEmission(emission as unknown as Record<string, unknown>))
      : [],
  }
}

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true })

  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(createSeedState(), null, 2), "utf8")
  }
}

async function readState(): Promise<DatabaseState> {
  await ensureDataFile()

  try {
    const file = await fs.readFile(DATA_FILE, "utf8")
    return normalizeState(JSON.parse(file))
  } catch {
    const seedState = createSeedState()
    await fs.writeFile(DATA_FILE, JSON.stringify(seedState, null, 2), "utf8")
    return seedState
  }
}

async function writeState(state: DatabaseState) {
  await fs.writeFile(DATA_FILE, JSON.stringify(state, null, 2), "utf8")
}

async function withRead<T>(operation: (client: TransactionClient) => Promise<T>) {
  const state = await readState()
  const client = createStatefulClient(state)
  return operation(client)
}

async function withWrite<T>(operation: (client: TransactionClient) => Promise<T>) {
  const pending = writeQueue.then(async () => {
    const state = await readState()
    const client = createStatefulClient(state)
    const result = await operation(client)

    await writeState(state)
    return result
  })

  writeQueue = pending.then(() => undefined, () => undefined)
  return pending
}

function compareValues(left: unknown, right: unknown): number {
  if (left === right) {
    return 0
  }

  if (typeof left === "number" && typeof right === "number") {
    return left - right
  }

  const leftDate = new Date(String(left)).getTime()
  const rightDate = new Date(String(right)).getTime()

  if (!Number.isNaN(leftDate) && !Number.isNaN(rightDate)) {
    return leftDate - rightDate
  }

  return String(left ?? "").localeCompare(String(right ?? ""))
}

function matchesComparator(value: unknown, comparator: Record<string, unknown>): boolean {
  if ("contains" in comparator) {
    const source = String(value ?? "").toLowerCase()
    const term = String(comparator.contains ?? "").toLowerCase()
    return source.includes(term)
  }

  const checks = [
    ["gte", (left: number, right: number) => left >= right],
    ["gt", (left: number, right: number) => left > right],
    ["lte", (left: number, right: number) => left <= right],
    ["lt", (left: number, right: number) => left < right],
  ] as const

  return checks.every(([key, matcher]) => {
    if (!(key in comparator) || comparator[key] === undefined) {
      return true
    }

    const expected = comparator[key]

    if (typeof value === "number" || typeof expected === "number") {
      return matcher(toNumber(value), toNumber(expected))
    }

    return matcher(new Date(String(value)).getTime(), new Date(String(expected)).getTime())
  })
}

function matchesUser(user: DatabaseUser, where: Record<string, unknown> | undefined, state: DatabaseState): boolean {
  if (!where || Object.keys(where).length === 0) {
    return true
  }

  return Object.entries(where).every(([key, value]) => {
    if (key === "OR") {
      return Array.isArray(value) && value.some((entry) => matchesUser(user, entry as Record<string, unknown>, state))
    }

    if (key === "AND") {
      return Array.isArray(value) && value.every((entry) => matchesUser(user, entry as Record<string, unknown>, state))
    }

    if (key === "NOT") {
      return !matchesUser(user, value as Record<string, unknown>, state)
    }

    if (key === "emissions" && value && typeof value === "object") {
      const relation = value as Record<string, unknown>
      const userEmissions = state.emissions.filter((emission) => emission.userId === user.id)

      if (relation.some) {
        return userEmissions.some((emission) => matchesEmission(emission, relation.some as Record<string, unknown>, state))
      }

      return true
    }

    const fieldValue = user[key as keyof DatabaseUser]
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return matchesComparator(fieldValue, value as Record<string, unknown>)
    }

    return fieldValue === value
  })
}

function matchesEmission(emission: DatabaseEmission, where: Record<string, unknown> | undefined, state: DatabaseState): boolean {
  if (!where || Object.keys(where).length === 0) {
    return true
  }

  return Object.entries(where).every(([key, value]) => {
    if (key === "OR") {
      return Array.isArray(value) && value.some((entry) => matchesEmission(emission, entry as Record<string, unknown>, state))
    }

    if (key === "AND") {
      return Array.isArray(value) && value.every((entry) => matchesEmission(emission, entry as Record<string, unknown>, state))
    }

    if (key === "NOT") {
      return !matchesEmission(emission, value as Record<string, unknown>, state)
    }

    if (key === "user" && value && typeof value === "object") {
      const user = state.users.find((entry) => entry.id === emission.userId)
      return user ? matchesUser(user, value as Record<string, unknown>, state) : false
    }

    const fieldValue = emission[key as keyof DatabaseEmission]
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return matchesComparator(fieldValue, value as Record<string, unknown>)
    }

    return fieldValue === value
  })
}

function applyOrder<T extends Record<string, unknown>>(records: T[], orderBy?: Record<string, unknown>): T[] {
  if (!orderBy || Object.keys(orderBy).length === 0) {
    return [...records]
  }

  const [field, direction] = Object.entries(orderBy)[0] as [string, SortDirection | undefined]
  const multiplier = direction === "desc" ? -1 : 1

  return [...records].sort((left, right) => compareValues(left[field], right[field]) * multiplier)
}

function applyPagination<T>(records: T[], skip?: number, take?: number): T[] {
  const sliced = typeof skip === "number" && skip > 0 ? records.slice(skip) : records
  return typeof take === "number" ? sliced.slice(0, take) : sliced
}

function applySelect<T extends Record<string, unknown>>(record: T, select?: Record<string, unknown>): Record<string, unknown> {
  if (!select) {
    return cloneValue(record)
  }

  const selected: Record<string, unknown> = {}

  Object.entries(select).forEach(([key, enabled]) => {
    if (enabled) {
      selected[key] = record[key]
    }
  })

  return selected
}

function createFallbackUser(): DbUserRecord {
  const timestamp = new Date(0)

  return {
    id: "unknown-user",
    name: "Unknown User",
    email: "unknown@local",
    hashedPassword: null,
    role: "USER",
    status: "inactive",
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
    emissions: [],
  }
}

function materializeUser(user: DatabaseUser, args: QueryArgs | undefined, state: DatabaseState): DbUserRecord {
  const publicUser = {
    ...user,
    createdAt: toDate(user.createdAt),
    updatedAt: toDate(user.updatedAt),
  }

  const result = {
    ...applySelect(publicUser, args?.select),
    emissions: [] as DbEmissionRecord[],
  } as DbUserRecord

  if (args?.include?.emissions) {
    const includeArgs = args.include.emissions as QueryArgs
    const emissions = applyPagination(
      applyOrder(
        state.emissions.filter((emission) => emission.userId === user.id),
        includeArgs.orderBy
      ),
      includeArgs.skip,
      includeArgs.take
    ).map((emission) => materializeEmission(emission, includeArgs, state))

    result.emissions = emissions
  }

  return result
}

function materializeEmission(emission: DatabaseEmission, args: QueryArgs | undefined, state: DatabaseState): DbEmissionRecord {
  const publicEmission = {
    ...emission,
    tanggal: toDate(emission.tanggal),
    emissionData: emission.emissionData ?? "{}",
    createdAt: toDate(emission.createdAt),
    updatedAt: toDate(emission.updatedAt),
  }

  const result = {
    ...applySelect(publicEmission, args?.select),
    user: createFallbackUser(),
  } as unknown as DbEmissionRecord

  if (args?.include?.user) {
    const includeArgs = args.include.user as QueryArgs
    const user = state.users.find((entry) => entry.id === emission.userId)
    result.user = user ? materializeUser(user, includeArgs, state) : createFallbackUser()
  }

  return result
}

function findUserIndex(users: DatabaseUser[], where?: Record<string, unknown>): number {
  return users.findIndex((user) => matchesUser(user, where, { users, emissions: [] }))
}

function createStatefulClient(state: DatabaseState): TransactionClient {
  const user: LocalUserTable = {
    async findUnique(args) {
      const match = state.users.find((entry) => matchesUser(entry, args?.where, state))
      return match ? materializeUser(match, args, state) : null
    },
    async findFirst(args) {
      const match = state.users.find((entry) => matchesUser(entry, args?.where, state))
      return match ? materializeUser(match, args, state) : null
    },
    async findMany(args) {
      return applyPagination(
        applyOrder(
          state.users.filter((entry) => matchesUser(entry, args?.where, state)),
          args?.orderBy
        ),
        args?.skip,
        args?.take
      ).map((entry) => materializeUser(entry, args, state))
    },
    async count(args) {
      return state.users.filter((entry) => matchesUser(entry, args?.where, state)).length
    },
    async create(args) {
      const data = args.data ?? {}
      const timestamp = nowIso()
      const createdUser = normalizeUser({
        id: data.id,
        name: data.name,
        email: data.email,
        hashedPassword: data.hashedPassword,
        role: data.role,
        status: data.status,
        phone: data.phone,
        city: data.city,
        job: data.job,
        gender: data.gender,
        about: data.about,
        instagram: data.instagram,
        image: data.image,
        emailVerified: data.emailVerified,
        createdAt: data.createdAt ?? timestamp,
        updatedAt: data.updatedAt ?? timestamp,
      })

      state.users.push(createdUser)
      return materializeUser(createdUser, args, state)
    },
    async update(args) {
      const match = state.users.find((entry) => matchesUser(entry, args.where, state))

      if (!match) {
        throw new Error("User not found")
      }

      const patch = args.data ?? {}
      Object.assign(match, {
        name: patch.name !== undefined ? toNullableString(patch.name) : match.name,
        email: patch.email !== undefined ? String(patch.email).toLowerCase() : match.email,
        hashedPassword: patch.hashedPassword !== undefined ? toNullableString(patch.hashedPassword) : match.hashedPassword,
        role: patch.role !== undefined ? normalizeRole(patch.role) : match.role,
        status: patch.status !== undefined ? normalizeStatus(patch.status) : match.status,
        phone: patch.phone !== undefined ? toNullableString(patch.phone) : match.phone,
        city: patch.city !== undefined ? toNullableString(patch.city) : match.city,
        job: patch.job !== undefined ? toNullableString(patch.job) : match.job,
        gender: patch.gender !== undefined ? toNullableString(patch.gender) : match.gender,
        about: patch.about !== undefined ? toNullableString(patch.about) : match.about,
        instagram: patch.instagram !== undefined ? toNullableString(patch.instagram) : match.instagram,
        image: patch.image !== undefined ? toNullableString(patch.image) : match.image,
        emailVerified: patch.emailVerified !== undefined ? toIsoString(patch.emailVerified, match.emailVerified ?? nowIso()) : match.emailVerified,
        updatedAt: nowIso(),
      })

      return materializeUser(match, args, state)
    },
    async delete(args) {
      const index = state.users.findIndex((entry) => matchesUser(entry, args.where, state))

      if (index === -1) {
        throw new Error("User not found")
      }

      const [deletedUser] = state.users.splice(index, 1)
      return materializeUser(deletedUser, args, state)
    },
    async upsert(args) {
      const match = state.users.find((entry) => matchesUser(entry, args.where, state))

      if (match) {
        return user.update({ where: { id: match.id }, data: args.update })
      }

      return user.create({ data: args.create })
    },
  }

  const emissionRecord: LocalEmissionTable = {
    async findUnique(args) {
      const match = state.emissions.find((entry) => matchesEmission(entry, args?.where, state))
      return match ? materializeEmission(match, args, state) : null
    },
    async findFirst(args) {
      const match = state.emissions.find((entry) => matchesEmission(entry, args?.where, state))
      return match ? materializeEmission(match, args, state) : null
    },
    async findMany(args) {
      return applyPagination(
        applyOrder(
          state.emissions.filter((entry) => matchesEmission(entry, args?.where, state)),
          args?.orderBy
        ),
        args?.skip,
        args?.take
      ).map((entry) => materializeEmission(entry, args, state))
    },
    async count(args) {
      return state.emissions.filter((entry) => matchesEmission(entry, args?.where, state)).length
    },
    async create(args) {
      const data = args.data ?? {}
      const timestamp = nowIso()
      const createdEmission = normalizeEmission({
        id: data.id,
        userId: data.userId,
        totalEmisi: data.totalEmisi,
        pohonDibutuhkan: data.pohonDibutuhkan,
        aksiTebus: data.aksiTebus,
        tanggal: data.tanggal ?? timestamp,
        emissionData: data.emissionData,
        createdAt: data.createdAt ?? timestamp,
        updatedAt: data.updatedAt ?? timestamp,
      })

      state.emissions.push(createdEmission)
      return materializeEmission(createdEmission, args, state)
    },
    async deleteMany(args) {
      const initialLength = state.emissions.length
      state.emissions = state.emissions.filter((entry) => !matchesEmission(entry, args?.where, state))
      return { count: initialLength - state.emissions.length }
    },
    async aggregate(args) {
      const items = state.emissions.filter((entry) => matchesEmission(entry, args?.where, state))
      const sumFields = args?._sum ?? {}
      const sums: Record<string, number | null> = {}

      Object.entries(sumFields).forEach(([field, enabled]) => {
        if (!enabled) {
          return
        }

        sums[field] = items.reduce((total, item) => total + toNumber(item[field as keyof DatabaseEmission]), 0)
      })

      return { _sum: sums }
    },
  }

  return {
    user,
    emissionRecord,
    emission: emissionRecord,
  }
}

function createDatabaseClient(): LocalDatabaseClient {
  return {
    user: {
      findUnique: (args) => withRead((client) => client.user.findUnique(args)),
      findFirst: (args) => withRead((client) => client.user.findFirst(args)),
      findMany: (args) => withRead((client) => client.user.findMany(args)),
      count: (args) => withRead((client) => client.user.count(args)),
      create: (args) => withWrite((client) => client.user.create(args)),
      update: (args) => withWrite((client) => client.user.update(args)),
      delete: (args) => withWrite((client) => client.user.delete(args)),
      upsert: (args) => withWrite((client) => client.user.upsert(args)),
    },
    emissionRecord: {
      findUnique: (args) => withRead((client) => client.emissionRecord.findUnique(args)),
      findFirst: (args) => withRead((client) => client.emissionRecord.findFirst(args)),
      findMany: (args) => withRead((client) => client.emissionRecord.findMany(args)),
      count: (args) => withRead((client) => client.emissionRecord.count(args)),
      create: (args) => withWrite((client) => client.emissionRecord.create(args)),
      deleteMany: (args) => withWrite((client) => client.emissionRecord.deleteMany(args)),
      aggregate: (args) => withRead((client) => client.emissionRecord.aggregate(args)),
    },
    emission: {
      findUnique: (args) => withRead((client) => client.emission.findUnique(args)),
      findFirst: (args) => withRead((client) => client.emission.findFirst(args)),
      findMany: (args) => withRead((client) => client.emission.findMany(args)),
      count: (args) => withRead((client) => client.emission.count(args)),
      create: (args) => withWrite((client) => client.emission.create(args)),
      deleteMany: (args) => withWrite((client) => client.emission.deleteMany(args)),
      aggregate: (args) => withRead((client) => client.emission.aggregate(args)),
    },
    $transaction: (callback) => withWrite((client) => callback(client)),
  }
}

const globalForDb = globalThis as typeof globalThis & {
  __tebuskarbonDb?: LocalDatabaseClient
}

export const prisma = globalForDb.__tebuskarbonDb ?? createDatabaseClient()

if (process.env.NODE_ENV !== "production") {
  globalForDb.__tebuskarbonDb = prisma
}
