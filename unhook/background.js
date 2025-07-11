// "As a dog returns to its vomit, so fools repeat their folly."
// Proverbs 26:11

// NOTE: Init values
const DEFAULT_START_HOUR = 23 // 11 PM
const DEFAULT_END_HOUR = 6 // 6 AM
const DEFAULT_MODE = "purge" // Close all tabs by default
const DEFAULT_WHITELIST = [] // Just in case
const DEFAULT_BLACKLIST = [] // Same here
const CHECK_INTERVAL_MINUTES = 1

// NOTE: Set up chrome interval
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

// NOTE: Saved data getters
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

// NOTE: URL detection
function isUrlListed(tabUrl, list) {
  let regexString = ""

  list.forEach((el, index) => {
    regexString += el

    if (index !== list.length - 1) {
      regexString += "|"
    }
  })

  const regex = new RegExp(regexString)

  return regex.test(tabUrl)
}

// NOTE: Tab close functions
function closeAllWindows() {
  chrome.windows.getAll({}, (wins) => {
    wins.forEach((win) => chrome.windows.remove(win.id))
  })
}

function handleWhitelist() {
  getWhitelist((whitelist) => {
    chrome.tabs.query({}, (tabs) => {
      const tabIDsToClose = []

      tabs.forEach((tab) => {
        const tabURL = `${tab.url}`
        const isWhitelisted = isUrlListed(tabURL, whitelist)

        if (!isWhitelisted && !tabIDsToClose.includes(tab.id)) {
          tabIDsToClose.push(tab.id)
        }
      })

      if (tabIDsToClose.length > 0) {
        tabIDsToClose.forEach((tabID) => {
          chrome.tabs.remove(tabID)
        })
      }
    })
  })
}

function handleBlacklist() {
  getBlacklist((blacklist) => {
    chrome.tabs.query({}, (tabs) => {
      const tabIDsToClose = []

      tabs.forEach((tab) => {
        const tabURL = `${tab.url}`
        const isBlacklisted = isUrlListed(tabURL, blacklist)

        if (isBlacklisted && !tabIDsToClose.includes(tab.id)) {
          tabIDsToClose.push(tab.id)
        }
      })

      if (tabIDsToClose.length > 0) {
        tabIDsToClose.forEach((tabID) => {
          chrome.tabs.remove(tabID)
        })
      }
    })
  })
}

function closeTabs() {
  chrome.storage.sync.set({ isOnLockdown: true }, () => {
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
  })
}

// NOTE: Time check
chrome.alarms.onAlarm.addListener(() => {
  getHours((startHour, endHour) => {
    const now = new Date()
    const nowTime = now.getTime()
    const t1 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour).getTime()
    const t2 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour).getTime()

    if (endHour > startHour) {
      // Same day
      if (nowTime >= t1 && nowTime < t2) {
        closeTabs()
      } else {
        chrome.storage.sync.set({ isOnLockdown: false })
      }
    } else {
      // Next day
      if (nowTime >= t1 || nowTime < t2) {
        closeTabs()
      } else {
        chrome.storage.sync.set({ isOnLockdown: false })
      }
    }
  })
})
