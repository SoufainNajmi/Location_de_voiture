export function getLocalDateInputValue(date = new Date()) {
  const localDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60_000,
  )
  return localDate.toISOString().slice(0, 10)
}

export function addDaysToDate(date: string, days: number) {
  const result = new Date(`${date}T12:00:00`)
  if (Number.isNaN(result.getTime())) return ''
  result.setDate(result.getDate() + days)
  return getLocalDateInputValue(result)
}

export function isDateInputValue(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsedDate = new Date(`${value}T00:00:00.000Z`)
  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === value
  )
}

export function parseDateInput(value: string | null) {
  return value && isDateInputValue(value) ? value : ''
}

export function rentalDays(startDate: string, endDate: string) {
  if (
    !isDateInputValue(startDate) ||
    !isDateInputValue(endDate) ||
    endDate <= startDate
  ) {
    return 0
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000
  return (
    (Date.parse(`${endDate}T00:00:00.000Z`) -
      Date.parse(`${startDate}T00:00:00.000Z`)) /
    millisecondsPerDay
  )
}

export function formatDate(
  value: string,
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
) {
  return new Intl.DateTimeFormat('fr-FR', options).format(
    new Date(`${value}T12:00:00`),
  )
}
