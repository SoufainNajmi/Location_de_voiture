import { SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import Button from '../components/Button'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import VehicleCard from '../components/VehicleCard'
import {
  demoFleet,
  vehicleCategories,
  type VehicleCategory,
} from '../data/demoFleet'
import { formatDate, parseDateInput } from '../utils/dates'

const maximumPrice = Math.ceil(
  Math.max(...demoFleet.map((vehicle) => vehicle.pricePerDay)) / 100,
) * 100

const availabilityOptions = ['all', 'available', 'unavailable'] as const
const sortOptions = [
  'recommended',
  'price-asc',
  'price-desc',
  'newest',
  'brand',
] as const

type AvailabilityFilter = (typeof availabilityOptions)[number]
type SortOrder = (typeof sortOptions)[number]

function parseAvailability(value: string): AvailabilityFilter {
  return availabilityOptions.find((option) => option === value) ?? 'all'
}

function parseCategory(value: string): VehicleCategory | 'all' {
  if (value === 'all') return 'all'
  return vehicleCategories.find((category) => category.id === value)?.id ?? 'all'
}

function parseSortOrder(value: string): SortOrder {
  return sortOptions.find((option) => option === value) ?? 'recommended'
}

const selectClassName =
  'min-h-12 w-full rounded-control border border-line bg-canvas px-4 text-sm text-ink outline-none transition focus:border-gold'

function CarsPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [city, setCity] = useState(searchParams.get('city') ?? '')
  const [pickupDate, setPickupDate] = useState(
    parseDateInput(searchParams.get('pickup')),
  )
  const [returnDate, setReturnDate] = useState(
    parseDateInput(searchParams.get('return')),
  )
  const [brand, setBrand] = useState('all')
  const [category, setCategory] = useState<VehicleCategory | 'all'>('all')
  const [priceCeiling, setPriceCeiling] = useState(maximumPrice)
  const [availability, setAvailability] =
    useState<AvailabilityFilter>('all')
  const [sortOrder, setSortOrder] = useState<SortOrder>('recommended')

  const brands = [...new Set(demoFleet.map((vehicle) => vehicle.brand))].sort(
    (first, second) => first.localeCompare(second, 'fr'),
  )
  const normalizedCity = city.trim().toLocaleLowerCase('fr-FR')

  const filteredVehicles = demoFleet.filter((vehicle) => {
    const matchesCity =
      !normalizedCity ||
      vehicle.city.toLocaleLowerCase('fr-FR').includes(normalizedCity)
    const matchesBrand = brand === 'all' || vehicle.brand === brand
    const matchesCategory =
      category === 'all' || vehicle.category === category
    const matchesPrice = vehicle.pricePerDay <= priceCeiling
    const matchesAvailability =
      availability === 'all' ||
      (availability === 'available' && vehicle.isAvailable) ||
      (availability === 'unavailable' && !vehicle.isAvailable)

    return (
      matchesCity &&
      matchesBrand &&
      matchesCategory &&
      matchesPrice &&
      matchesAvailability
    )
  })

  const sortedVehicles = [...filteredVehicles].sort((first, second) => {
    switch (sortOrder) {
      case 'price-asc':
        return first.pricePerDay - second.pricePerDay
      case 'price-desc':
        return second.pricePerDay - first.pricePerDay
      case 'newest':
        return second.year - first.year
      case 'brand':
        return first.brand.localeCompare(second.brand, 'fr')
      case 'recommended':
        return Number(second.featured) - Number(first.featured)
    }
  })

  const hasActiveFilters =
    Boolean(normalizedCity) ||
    brand !== 'all' ||
    category !== 'all' ||
    priceCeiling < maximumPrice ||
    availability !== 'all' ||
    sortOrder !== 'recommended' ||
    Boolean(pickupDate || returnDate)

  function clearFilters() {
    setCity('')
    setPickupDate('')
    setReturnDate('')
    setBrand('all')
    setCategory('all')
    setPriceCeiling(maximumPrice)
    setAvailability('all')
    setSortOrder('recommended')
    setSearchParams({})
  }

  return (
    <main id="main-content">
      <section className="bg-brand-black py-14 text-brand-paper sm:py-20">
        <Container>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            {t('nav.brand')}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {t('cars.pageTitle')}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
            {t('cars.pageSubtitle')}
          </p>
        </Container>
      </section>

      <section className="py-10 sm:py-16">
        <Container>
          {pickupDate && returnDate && (
            <p className="mb-5 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted">
              {t('cars.period')}{' '}
              <span className="font-semibold text-ink">
                {t('common.from')} {formatDate(pickupDate)} {t('common.to')}{' '}
                {formatDate(returnDate)}
              </span>
              <span className="mt-1 block text-xs">
                {t('cars.demoPeriodNote')}
              </span>
            </p>
          )}

          <section
            aria-label={t('cars.filterTitle')}
            className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6"
          >
            <div className="mb-5 flex items-center gap-2">
              <SlidersHorizontal
                size={18}
                className="text-gold"
                aria-hidden="true"
              />
              <h2 className="font-display text-lg font-semibold text-ink">
                {t('cars.filterTitle')}
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label
                  htmlFor="city-filter"
                  className="mb-2 block text-xs font-semibold text-ink"
                >
                  {t('cars.city')}
                </label>
                <input
                  id="city-filter"
                  type="search"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder={t('cars.placeholderCity')}
                  className={selectClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="brand-filter"
                  className="mb-2 block text-xs font-semibold text-ink"
                >
                  {t('cars.brand')}
                </label>
                <select
                  id="brand-filter"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                  className={selectClassName}
                >
                  <option value="all">{t('cars.allBrands')}</option>
                  {brands.map((brandName) => (
                    <option key={brandName} value={brandName}>
                      {brandName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="category-filter"
                  className="mb-2 block text-xs font-semibold text-ink"
                >
                  {t('cars.category')}
                </label>
                <select
                  id="category-filter"
                  value={category}
                  onChange={(event) =>
                    setCategory(parseCategory(event.target.value))
                  }
                  className={selectClassName}
                >
                  <option value="all">{t('cars.allCategories')}</option>
                  {vehicleCategories.map((vehicleCategory) => (
                    <option
                      key={vehicleCategory.id}
                      value={vehicleCategory.id}
                    >
                      {vehicleCategory.id}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="availability-filter"
                  className="mb-2 block text-xs font-semibold text-ink"
                >
                  {t('cars.availability')}
                </label>
                <select
                  id="availability-filter"
                  value={availability}
                  onChange={(event) =>
                    setAvailability(parseAvailability(event.target.value))
                  }
                  className={selectClassName}
                >
                  <option value="all">{t('cars.allVehicles')}</option>
                  <option value="available">{t('common.available')}</option>
                  <option value="unavailable">{t('common.unavailable')}</option>
                </select>
              </div>

              <div className="rounded-control border border-line bg-canvas px-4 py-3">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="price-filter"
                    className="text-xs font-semibold text-ink"
                  >
                    {t('cars.budget')}
                  </label>
                  <span className="text-xs font-medium text-muted">
                    {priceCeiling === maximumPrice
                      ? t('common.all')
                      : `${priceCeiling} €`}
                  </span>
                </div>
                <input
                  id="price-filter"
                  type="range"
                  min="0"
                  max={maximumPrice}
                  step="10"
                  value={priceCeiling}
                  onChange={(event) =>
                    setPriceCeiling(Number(event.target.value))
                  }
                  className="w-full accent-[#c8a96b]"
                />
              </div>

              <div>
                <label
                  htmlFor="sort-order"
                  className="mb-2 block text-xs font-semibold text-ink"
                >
                  {t('cars.sortBy')}
                </label>
                <select
                  id="sort-order"
                  value={sortOrder}
                  onChange={(event) =>
                    setSortOrder(parseSortOrder(event.target.value))
                  }
                  className={selectClassName}
                >
                  <option value="recommended">{t('cars.recommended')}</option>
                  <option value="price-asc">{t('cars.priceAsc')}</option>
                  <option value="price-desc">{t('cars.priceDesc')}</option>
                  <option value="newest">{t('cars.newest')}</option>
                  <option value="brand">{t('cars.brandSort')}</option>
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-5 flex justify-end">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={clearFilters}
                >
                  {t('common.resetFilters')}
                </Button>
              </div>
            )}
          </section>

          <div
            className="mt-8 flex flex-wrap items-baseline justify-between gap-3"
            aria-live="polite"
          >
            <SectionHeading
              eyebrow={t('home.featuredTitle')}
              title={t('cars.vehiclesCount', { count: sortedVehicles.length })}
            />
            <p className="text-xs text-muted">{t('cars.priceHint')}</p>
          </div>

          {sortedVehicles.length > 0 ? (
            <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {sortedVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="mt-7 rounded-2xl border border-line bg-surface px-6 py-14 text-center">
              <h2 className="font-display text-xl font-semibold text-ink">
                {t('cars.noResults')}
              </h2>
              <p className="mt-2 text-sm text-muted">
                {t('cars.noResultsDescription')}
              </p>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="mt-5"
                onClick={clearFilters}
              >
                {t('common.reinitializeFilters')}
              </Button>
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}

export default CarsPage
