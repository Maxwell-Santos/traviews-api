const toCamel = (s: string) =>
  s.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))

export const keysToCamel = (obj: any): any => {
  if (Array.isArray(obj)) return obj.map((v) => keysToCamel(v))
  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[toCamel(key)] = keysToCamel(obj[key])
      return acc
    }, {} as any)
  }
  return obj
}
