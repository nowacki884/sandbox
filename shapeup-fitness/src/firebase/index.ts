import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore"

import { auth, firestore } from "./firebase"

import { DaySchedule, NewsArticle, OfferItem, UserPassData } from "../types"

async function getDataFromCollection<T>(collectionName: string): Promise<T[]> {
  const tempArr: T[] = []

  try {
    const querySnapshot = await getDocs(query(collection(firestore, collectionName)))

    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        const savedData = doc.data() as T
        tempArr.push(savedData)
      })
    }
  } catch (error) {
    console.log(error)
  }

  return tempArr
}

export async function getExerciseSchedule(): Promise<DaySchedule[]> {
  let tempArr: DaySchedule[] = []

  try {
    const savedData = await getDataFromCollection<DaySchedule>("zajeciatest")
    tempArr = savedData
  } catch (error) {
    console.log(error)
  }

  return tempArr.sort((a, b) => a.dayId - b.dayId)
}

export async function getKarnety(): Promise<OfferItem[]> {
  let tempArr: OfferItem[] = []

  try {
    const savedData = await getDataFromCollection<OfferItem>("karnety")
    tempArr = savedData
  } catch (error) {
    console.log(error)
  }

  return tempArr.sort((a, b) => a.id - b.id)
}

export async function getTreningiJednaOsoba(): Promise<OfferItem[]> {
  let tempArr: OfferItem[] = []

  try {
    const savedData = await getDataFromCollection<OfferItem>("treningiJednaOsoba")
    tempArr = savedData
  } catch (error) {
    console.log(error)
  }

  return tempArr.sort((a, b) => a.id - b.id)
}

export async function getTreningiDwieOsoby(): Promise<OfferItem[]> {
  let tempArr: OfferItem[] = []

  try {
    const savedData = await getDataFromCollection<OfferItem>("treningiDwieOsoby")
    tempArr = savedData
  } catch (error) {
    console.log(error)
  }

  return tempArr.sort((a, b) => a.id - b.id)
}

export async function getInne(): Promise<OfferItem[]> {
  let tempArr: OfferItem[] = []

  try {
    const savedData = await getDataFromCollection<OfferItem>("inne")
    tempArr = savedData
  } catch (error) {
    console.log(error)
  }

  return tempArr.sort((a, b) => a.id - b.id)
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  let tempArr: NewsArticle[] = []

  try {
    const savedData = await getDataFromCollection<NewsArticle>("aktualnosci")
    tempArr = savedData
  } catch (error) {
    console.log(error)
  }

  return tempArr.sort((a, b) => b.date.toDate().getTime() - a.date.toDate().getTime())
}

export async function getUserPassDataWithId(userId: string): Promise<UserPassData | null> {
  let val: UserPassData | null = null

  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, "uzytkownicy"), where("userId", "==", userId))
    )
    if (querySnapshot.size !== 1) return val
    querySnapshot.forEach((doc) => (val = doc.data() as UserPassData))
  } catch (error) {
    console.log(error)
  }

  return val
}

export async function getUserPassDataWithEmail(email: string): Promise<UserPassData | null> {
  let userPass: UserPassData | null = null

  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, "uzytkownicy"), where("email", "==", email))
    )
    if (querySnapshot.size !== 1) return userPass
    querySnapshot.forEach((doc) => {
      userPass = doc.data() as UserPassData
    })
  } catch (error) {
    console.log(error)
  }

  return userPass
}

export async function getPassData(passId: number): Promise<OfferItem | null> {
  let val: OfferItem | null = null

  if (passId === -1) return val

  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, "karnety"), where("id", "==", passId))
    )
    if (querySnapshot.size !== 1) return val
    querySnapshot.forEach((doc) => (val = doc.data() as OfferItem))
  } catch (error) {
    console.log(error)
  }

  return val
}

export async function registerNewUser(
  displayName: string,
  email: string,
  password: string,
  cb: () => void
): Promise<void> {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      updateProfile(user.user, {
        displayName: displayName,
      })
        .then(() => {
          addDoc(collection(firestore, "uzytkownicy"), {
            userId: user.user.uid,
            username: displayName,
            email: email,
            activePass: -1,
            purchaseDate: new Timestamp(0, 0),
            validUntil: new Timestamp(0, 0),
          })
            .then(() => {
              cb()
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
}
