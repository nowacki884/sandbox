document.addEventListener("DOMContentLoaded", () => {
  const modeSelect = document.querySelector("#mode")
  const purgeOption = document.querySelector("#purge-option")
  const whitelistOption = document.querySelector("#whitelist-option")
  const blacklistOption = document.querySelector("#blacklist-option")

  const startTime = document.querySelector("#start-time")
  const endTime = document.querySelector("#end-time")

  const whitelistWrapper = document.querySelector("#whitelist-wrapper")
  const whitelistInput = document.querySelector("#whitelist-input")
  const whitelistSaveButton = document.querySelector("#whitelist-save-button")
  const whitelistAddresses = document.querySelector("#whitelist-addresses")
  let whitelistArray = []

  const blacklistWrapper = document.querySelector("#blacklist-wrapper")
  const blacklistInput = document.querySelector("#blacklist-input")
  const blacklistSaveButton = document.querySelector("#blacklist-save-button")
  const blacklistAddresses = document.querySelector("#blacklist-addresses")
  let blacklistArray = []

  const saveButton = document.querySelector("#save-button")

  const modeStatus = document.querySelector("#mode-status")
  const timeStatus = document.querySelector("#time-status")

  const updateableElements = [startTime, endTime]

  // NOTE: Init
  updateableElements.forEach((el) => {
    el.addEventListener("change", () => {
      saveButton.style.display = "initial"
      modeStatus.textContent = ""
      timeStatus.textContent = ""
    })
  })

  chrome.storage.sync.get(
    ["startHour", "endHour", "mode", "whitelistAddresses", "blacklistAddresses"],
    (result) => {
      if (result.startHour !== undefined) startTime.value = result.startHour
      if (result.endHour !== undefined) endTime.value = result.endHour
      if (result.mode !== undefined) {
        switch (result.mode) {
          case "purge":
            purgeOption.selected = "selected"
            break
          case "whitelist":
            whitelistOption.selected = "selected"
            whitelistWrapper.style.display = "block"
            break
          case "blacklist":
            blacklistOption.selected = "selected"
            blacklistWrapper.style.display = "block"
            break
          default:
            break
        }
      }
      if (result.whitelistAddresses !== undefined && result.whitelistAddresses.length > 0) {
        result.whitelistAddresses.forEach((address) => {
          whitelistArray.push(address)

          const li = document.createElement("li")
          const p = document.createElement("p")
          p.textContent = address

          const delButton = document.createElement("button")
          delButton.textContent = "X"

          li.appendChild(p)
          li.appendChild(delButton)

          whitelistAddresses.appendChild(li)
          delButton.addEventListener("click", () => {
            // TODO: Delete
            whitelistArray = whitelistArray.filter(
              (whitelistAddress) => whitelistAddress !== address
            )
            li.remove()
            saveButton.style.display = "initial"
          })
        })
      }
      if (result.blacklistAddresses !== undefined && result.blacklistAddresses.length > 0) {
        result.blacklistAddresses.forEach((address) => {
          blacklistArray.push(address)

          const li = document.createElement("li")

          const p = document.createElement("p")
          p.textContent = address

          const delButton = document.createElement("button")
          delButton.textContent = "X"

          li.appendChild(p)
          li.appendChild(delButton)

          blacklistAddresses.appendChild(li)
          delButton.addEventListener("click", () => {
            // TODO: Delete
            blacklistArray = blacklistArray.filter(
              (blacklistAddress) => blacklistAddress !== address
            )
            li.remove()
            saveButton.style.display = "initial"
          })
        })
      }
    }
  )

  modeSelect.addEventListener("change", (e) => {
    const selectedMode = e.target.value

    switch (selectedMode) {
      case "purge":
        whitelistWrapper.style.display = "none"
        blacklistWrapper.style.display = "none"
        break
      case "whitelist":
        whitelistWrapper.style.display = "block"
        blacklistWrapper.style.display = "none"
        break
      case "blacklist":
        whitelistWrapper.style.display = "none"
        blacklistWrapper.style.display = "block"
        break
      default:
        break
    }

    modeStatus.textContent = ""
    timeStatus.textContent = ""
    saveButton.style.display = "initial"
  })

  whitelistSaveButton.addEventListener("click", () => {
    const inputVal = whitelistInput.value

    if (!inputVal) {
      timeStatus.textContent = "Please input a correct website address!"
      return
    }

    whitelistArray.push(inputVal)

    const li = document.createElement("li")

    const p = document.createElement("p")
    p.textContent = inputVal

    const delButton = document.createElement("button")
    delButton.textContent = "X"

    li.appendChild(p)
    li.appendChild(delButton)

    whitelistAddresses.appendChild(li)
    delButton.addEventListener("click", () => {
      // TODO: Delete
      whitelistArray = whitelistArray.filter((whitelistAddress) => whitelistAddress !== inputVal)
      li.remove()
      saveButton.style.display = "initial"
    })

    saveButton.style.display = "initial"
    whitelistInput.value = ""
  })

  blacklistSaveButton.addEventListener("click", () => {
    const inputVal = blacklistInput.value

    if (!inputVal) {
      timeStatus.textContent = "Please input a correct website address!"
      return
    }

    blacklistArray.push(inputVal)

    const li = document.createElement("li")

    const p = document.createElement("p")
    p.textContent = inputVal

    const delButton = document.createElement("button")
    delButton.textContent = "X"

    li.appendChild(p)
    li.appendChild(delButton)

    blacklistAddresses.appendChild(li)
    delButton.addEventListener("click", () => {
      // TODO: Delete
      blacklistArray = blacklistArray.filter((blacklistAddress) => blacklistAddress !== inputVal)
      li.remove()
      saveButton.style.display = "initial"
    })

    saveButton.style.display = "initial"
    blacklistInput.value = ""
  })

  saveButton.addEventListener("click", () => {
    const parsedStartTime = parseInt(startTime.value, 10)
    const parsedEndTime = parseInt(endTime.value, 10)

    if (
      isNaN(parsedStartTime) ||
      isNaN(parsedEndTime) ||
      parsedStartTime < 0 ||
      parsedStartTime > 23 ||
      parsedEndTime < 0 ||
      parsedEndTime > 23 ||
      parsedStartTime === parsedEndTime
    ) {
      timeStatus.textContent = "Please set the time to a valid number (0-23)!"
      return
    }

    const payload = {
      startHour: parsedStartTime,
      endHour: parsedEndTime,
      mode: modeSelect.value,
      whitelistAddresses: whitelistArray,
      blacklistAddresses: blacklistArray,
    }

    chrome.storage.sync.set(payload, () => {
      const color =
        modeSelect.value === "purge" ? "red" : modeSelect.value === "whitelist" ? "yellow" : "blue"
      const span = document.createElement("span")
      span.classList.add(color)
      span.textContent = modeSelect.value
      modeStatus.textContent = `Lockdown mode: `
      modeStatus.appendChild(span)
      timeStatus.textContent = `Lockdown will start at: ${parsedStartTime}:00, and will end at: ${parsedEndTime}:00`
      saveButton.style.display = "none"
    })
  })

  // NOTE: TEST
  // const test = document.querySelector("#test")
  // test.addEventListener("click", () => {
  //   chrome.windows.getCurrent({ populate: true }).then((windowInfo) => {
  //     for (const tabInfo of windowInfo.tabs) {
  //       timeStatus.textContent += tabInfo.url
  //     }
  //   }, console.log)
  // })
})
