import { readFileSync, writeFile } from "fs"

import log from "../functions/log"

export interface User {
  uid: string
  username: string
  level: number
  exp: number
}

interface UserHandler {
  data: User[]
  needsSaving: boolean
}

const users: UserHandler = {
  data: [],
  needsSaving: false,
}

export function loadSavedUserData(): unknown | null {
  let err = null

  try {
    const savedUserData = readFileSync("./src/data/users.json", { encoding: "utf-8" })
    const parsedUserData = JSON.parse(savedUserData) as User[]
    users.data = parsedUserData
  } catch (error) {
    err = error
  }

  return err
}

export type ResultMessage = "uid_exists" | "username_taken" | "success"

export function registerNewUser(uid: string, username: string): ResultMessage {
  let result: ResultMessage

  // STEP 1: Check if uid already exists in database
  const uidExists: boolean = users.data.some((user) => user.uid === uid)
  if (uidExists) {
    result = "uid_exists"
    return result
  }

  // STEP 2: Check if username is already taken
  const usernameIsTaken: boolean = users.data.some((user) => user.username === username)
  if (usernameIsTaken) {
    result = "username_taken"
    return result
  }

  // STEP 3: Register new user
  const newUserData: User = {
    uid,
    username,
    level: 1,
    exp: 0,
  }

  users.data.push(newUserData)
  users.needsSaving = true

  result = "success"
  return result
}

export function userDataBackupRoutine(): void {
  if (!users.needsSaving) return

  log("INFO", "Starting user data backup...")

  writeFile("./src/data/users.json", JSON.stringify(users.data, null, "\t"), (err) => {
    if (err) return log("ERROR", `${err}`)

    users.needsSaving = false
    log("INFO", "User data successfully updated!")
  })
}

export default users
