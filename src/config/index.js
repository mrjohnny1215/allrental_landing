import { APARTMENTS } from './apartments'

export function getApartmentBySlug(slug) {
  return APARTMENTS[slug] || null
}
