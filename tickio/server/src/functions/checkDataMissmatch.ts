export default function checkDataMissmatch(example: Object, data: Object): boolean {
  let isMismatch: boolean = false

  // NOTE: Compare object keys
  const exampleKeys: string[] = Object.keys(example)
  const dataKeys: string[] = Object.keys(data)

  if (exampleKeys.length === 0 || dataKeys.length === 0) {
    return isMismatch
  }

  const isKeysAmountSame: boolean = exampleKeys.length === dataKeys.length
  if (!isKeysAmountSame) {
    isMismatch = true
    return isMismatch
  }

  dataKeys.forEach((key: string) => {
    if (isMismatch) {
      return
    }

    const exampleHasKey: boolean = exampleKeys.includes(key)
    if (!exampleHasKey) {
      isMismatch = true
      return
    }

    const exampleValue = example[key as keyof Object]
    const dataValue = data[key as keyof Object]
    if (typeof dataValue !== typeof exampleValue) {
      isMismatch = true
    }
  })

  // NOTE: Compare object value types
  // if (isMismatch) {
  //   return isMismatch
  // }

  return isMismatch
}
