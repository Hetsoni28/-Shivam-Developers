export function getGoogleMapsUrl(lat?: number, lng?: number, query?: string): string {
  if (lat && lng) {
    return `https://www.google.com/maps?q=${lat},${lng}`
  }
  if (query) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
  }
  return '#'
}
