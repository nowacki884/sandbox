// "As a dog returns to its vomit, so fools repeat their folly."
// Proverbs 26:11

const DEFAULT_START_HOUR = 23 // 11 PM
const DEFAULT_END_HOUR = 6 // 6 AM
const DEFAULT_MODE = "purge" // Close all tabs by default
const DEFAULT_WHITELIST = [] // Just in case
const DEFAULT_BLACKLIST = [] // Same here

const CHECK_INTERVAL_MINUTES = 1

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("checkCloseTime", {
    periodInMinutes: CHECK_INTERVAL_MINUTES,
  })
})

chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create("checkCloseTime", {
    periodInMinutes: CHECK_INTERVAL_MINUTES,
  })
})

function getHours(callback) {
  chrome.storage.sync.get(["startHour", "endHour"], (result) =>
    callback(result.startHour ?? DEFAULT_START_HOUR, result.endHour ?? DEFAULT_END_HOUR)
  )
}

function getMode(callback) {
  chrome.storage.sync.get(["mode"], (result) => callback(result.mode ?? DEFAULT_MODE))
}

function getWhitelist(callback) {
  chrome.storage.sync.get(["whitelistAddresses"], (result) =>
    callback(result.whitelistAddresses ?? DEFAULT_WHITELIST)
  )
}

function getBlacklist(callback) {
  chrome.storage.sync.get(["blacklistAddresses"], (result) =>
    callback(result.blacklistAddresses ?? DEFAULT_BLACKLIST)
  )
}

function closeAllWindows() {
  chrome.windows.getAll({}, (wins) => {
    wins.forEach((win) => chrome.windows.remove(win.id))
  })
}

function handleWhitelist() {
  getWhitelist((whitelist) => {
    chrome.tabs.query({}, (tabs) => {
      const tabIDs = []

      tabs.forEach((tab) => {
        let isWhitelisted = false

        whitelist.forEach((whitelistEl) => {
          if (isWhitelisted) return
          const tabURL = `${tab.url}`
          isWhitelisted =
            tabURL.startsWith(`https://${whitelistEl}`) ||
            tabURL.startsWith(`https://www.${whitelistEl}`)
        })

        if (!isWhitelisted && !tabIDs.includes(tab.id)) tabIDs.push(tab.id)
      })

      if (tabIDs.length > 0) {
        tabIDs.forEach((tabID) => chrome.tabs.remove(tabID))
      }
    })
  })
}

function handleBlacklist() {
  getBlacklist((blacklist) => {
    chrome.tabs.query({}, (tabs) => {
      const tabIDs = []

      tabs.forEach((tab) => {
        let isBlacklisted = false

        blacklist.forEach((blacklistEl) => {
          if (isBlacklisted) return
          const tabURL = `${tab.url}`
          isBlacklisted =
            tabURL.startsWith(`https://${blacklistEl}`) ||
            tabURL.startsWith(`https://www.${blacklistEl}`)
        })

        if (isBlacklisted && !tabIDs.includes(tab.id)) tabIDs.push(tab.id)
      })

      if (tabIDs.length > 0) {
        tabIDs.forEach((tabID) => chrome.tabs.remove(tabID))
      }
    })
  })
}

function closeTabs() {
  getMode((mode) => {
    switch (mode) {
      case "purge":
        closeAllWindows()
        break
      case "whitelist":
        handleWhitelist()
        break
      case "blacklist":
        handleBlacklist()
        break
      default:
        break
    }
  })
}

chrome.alarms.onAlarm.addListener(() => {
  getHours((startHour, endHour) => {
    const now = new Date()
    const nowTime = now.getTime()
    const t1 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour).getTime()
    const t2 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour).getTime()

    if (endHour > startHour) {
      // Same day
      if (nowTime >= t1 && nowTime < t2) closeTabs()
    } else {
      // Next day
      if (nowTime >= t1 || nowTime < t2) closeTabs()
    }
  })
})
