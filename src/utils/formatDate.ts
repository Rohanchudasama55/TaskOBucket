export const formatDate = (d?: string | number | Date) => {
  if (!d) return ''
  return new Date(d).toLocaleString()
}
