export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

/**
 *
 * @param dateString - A string representing a date in the format YYYY-MM-DD
 * @returns
 */
export function isValidISODateString(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) return false

  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day) // mês é 0-based no JS

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
}
