export default function socketCallback(statusCode: number, cb: () => any): void {
  switch (statusCode) {
    case 200:
      cb()
      break
    case 400:
      console.log("bad request")
      break
    case 403:
      // Forbidden
      console.log("forbidden")
      break
    case 404:
      // Not found
      console.log("not found")
      break
    case 500:
      // Internal server error
      console.log("internal server error")
      break
  }
}
