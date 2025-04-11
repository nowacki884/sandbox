export default function checkPassword(pass: string): boolean {
  if (!pass) return false

  const regexMatch: RegExpMatchArray | null = pass.match(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  )

  if (!regexMatch) return false
  return true
}
