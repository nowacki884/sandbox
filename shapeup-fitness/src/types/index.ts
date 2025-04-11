import { User } from "firebase/auth"
import { Timestamp } from "firebase/firestore"

export interface NewsArticle {
  id: string
  title: string
  date: Timestamp
  desc?: string[]
  imageId: string
}

export interface OfferItem {
  id: number
  name: string
  price: number
}

export interface Exercise {
  key: number
  name: string
  startingHour: string
  timeInMinutes: number
  instructorName: string
  difficulty: string
}

export interface DaySchedule {
  dayId: number
  firestoreId?: string
  dayName: string
  exercises: Exercise[]
}

export interface UserProviderData {
  loaded: boolean
  data: User | null
}

export type SetCacheOptions =
  | "zajecia"
  | "karnety"
  | "treningiJ"
  | "treningiD"
  | "inne"
  | "aktualnosci"
  | "aktualnyKarnet"
  | "daneKarnetu"

export interface UserPassData {
  userId: string
  username: string
  email: string
  activePass: number
  purchaseDate: Timestamp
  validUntil: Timestamp
}

export interface CacheData {
  zajecia: DaySchedule[] | null
  karnety: OfferItem[] | null
  treningiJ: OfferItem[] | null
  treningiD: OfferItem[] | null
  inne: OfferItem[] | null
  aktualnosci: NewsArticle[] | null
  aktualnyKarnet: UserPassData | null
  daneKarnetu: OfferItem | null
}
