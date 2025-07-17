export default function generateId(length: number = 5): string {
  let result: string = ""
  const options = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (let i = 0; i < length; i++) {
    result += options.charAt(Math.floor(Math.random() * options.length))
  }

  return result
}
