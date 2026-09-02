import { APARTMENTS, DEFAULT_APARTMENT_SLUG } from './apartments'

export { APARTMENTS, DEFAULT_APARTMENT_SLUG }

export function getApartmentBySlug(slug) {
  return APARTMENTS[slug] || null
}
