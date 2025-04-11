import { createContext, useContext, useState } from "react"

import {
  CacheData,
  DaySchedule,
  NewsArticle,
  OfferItem,
  SetCacheOptions,
  UserPassData,
} from "../types"

const DataContext = createContext<CacheData>({
  zajecia: null,
  karnety: null,
  treningiJ: null,
  treningiD: null,
  inne: null,
  aktualnosci: null,
  aktualnyKarnet: null,
  daneKarnetu: null,
})

const SetDataContext = createContext<
  (
    option: SetCacheOptions,
    dayScheduleData: DaySchedule[] | null,
    offerItem: OfferItem[] | null,
    newsArticles: NewsArticle[] | null,
    userPass: UserPassData | null,
    passData: OfferItem | null
  ) => void
>(() => {})

export function useDataContext(): CacheData {
  return useContext(DataContext)
}

export function useSetDataContext(): (
  option: SetCacheOptions,
  dayScheduleData: DaySchedule[] | null,
  offerItem: OfferItem[] | null,
  newsArticles: NewsArticle[] | null,
  userPass: UserPassData | null,
  passData: OfferItem | null
) => void {
  return useContext(SetDataContext)
}

interface DataProviderProps {
  children: JSX.Element
}

export default function DataProvider({ children }: DataProviderProps) {
  const [cacheData, setCacheData] = useState<CacheData>({
    zajecia: null,
    karnety: null,
    treningiJ: null,
    treningiD: null,
    inne: null,
    aktualnosci: null,
    aktualnyKarnet: null,
    daneKarnetu: null,
  })

  function setCache(
    option: SetCacheOptions,
    dayScheduleData: DaySchedule[] | null = null,
    offerItem: OfferItem[] | null = null,
    newsArticles: NewsArticle[] | null = null,
    userPass: UserPassData | null = null,
    passData: OfferItem | null = null
  ): void {
    const tempVal: CacheData = cacheData

    switch (option) {
      case "zajecia":
        tempVal.zajecia = dayScheduleData
        break
      case "karnety":
        tempVal.karnety = offerItem
        break
      case "treningiJ":
        tempVal.treningiJ = offerItem
        break
      case "treningiD":
        tempVal.treningiD = offerItem
        break
      case "inne":
        tempVal.inne = offerItem
        break
      case "aktualnosci":
        tempVal.aktualnosci = newsArticles
        break
      case "aktualnyKarnet":
        tempVal.aktualnyKarnet = userPass
      case "daneKarnetu":
        tempVal.daneKarnetu = passData
      default:
        break
    }

    setCacheData(tempVal)
  }

  return (
    <DataContext.Provider value={cacheData}>
      <SetDataContext.Provider value={setCache}>{children}</SetDataContext.Provider>
    </DataContext.Provider>
  )
}
