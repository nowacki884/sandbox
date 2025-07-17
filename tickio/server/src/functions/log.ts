type Source = "STARTUP" | "SERVER" | "DATA" | "USER" | "ERROR" | "INFO" | "GAME" | "SOCKET" | "HTTP"

export default function log(source: Source, msg: string): void {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  let hoursText = ""
  let minutesText = ""
  let secondsText = ""

  if (hours < 10) {
    hoursText = `0${hours}`
  } else {
    hoursText = `${hours}`
  }

  if (minutes < 10) {
    minutesText = `0${minutes}`
  } else {
    minutesText = `${minutes}`
  }

  if (seconds < 10) {
    secondsText = `0${seconds}`
  } else {
    secondsText = `${seconds}`
  }

  const timeString = `${hoursText}:${minutesText}:${secondsText} -`
  let prefix: string = ""

  switch (source) {
    case "STARTUP":
      prefix = "\x1b[33m[ Startup ]\x1b[0m"
      break
    case "SERVER":
      prefix = "\x1b[36m[ Server ]\x1b[0m"
      break
    case "DATA":
      prefix = "\x1b[32m[ Data ]\x1b[0m"
      break
    case "USER":
      prefix = "\x1b[95m[ User ]\x1b[0m"
      break
    case "ERROR":
      prefix = "\x1b[31m[ Error ]\x1b[0m"
      break
    case "INFO":
      prefix = "\x1b[96m[ Info ]\x1b[0m"
      break
    case "GAME":
      prefix = "\x1b[35m[ Game ]\x1b[0m"
      break
    case "SOCKET":
      prefix = "\x1b[92m[ Socket ]\x1b[0m"
      break
    case "HTTP":
      prefix = "\x1b[93m[ HTTP ]\x1b[0m"
      break
    default:
      prefix = "\x1b[36m[ Server ]\x1b[0m"
      break
  }

  console.log(timeString, prefix, msg)
}
