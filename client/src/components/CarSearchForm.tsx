import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { demoFleet } from '../data/demoFleet'
import { addDaysToDate, getLocalDateInputValue } from '../utils/dates'
import Button from './Button'

export type CarSearchCriteria = {
  city: string
  pickupDate: string
  returnDate: string
}

type CarSearchFormProps = {
  onSearch: (criteria: CarSearchCriteria) => void
}

function CarSearchForm({ onSearch }: CarSearchFormProps) {
  const { t } = useTranslation()
  const today = getLocalDateInputValue()
  const [city, setCity] = useState('all')
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [dateError, setDateError] = useState('')
  const cities = [...new Set(demoFleet.map((vehicle) => vehicle.city))]

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (returnDate <= pickupDate) {
      setDateError(t('home.searchError'))
      return
    }

    setDateError('')
    onSearch({ city, pickupDate, returnDate })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/60 bg-surface p-4 shadow-card sm:p-6 lg:rounded-3xl lg:p-7"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="font-display text-lg font-semibold text-ink">
          {t('home.searchHeading')}
        </h2>
        <span className="hidden text-xs text-muted sm:inline">
          {t('home.searchSubtitle')}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.2fr_1fr_1fr_auto] md:items-end">
        <div>
          <label
            htmlFor="search-city"
            className="mb-2 block text-xs font-semibold text-ink"
          >
            {t('home.searchCityLabel')}
          </label>
          <div className="relative">
            <MapPin
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <select
              id="search-city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="min-h-12 w-full appearance-none rounded-control border border-line bg-canvas pl-11 pr-4 text-sm text-ink outline-none transition focus:border-gold"
            >
              <option value="all">{t('common.allCities')}</option>
              {cities.map((cityName) => (
                <option key={cityName} value={cityName}>
                  {cityName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="pickup-date"
            className="mb-2 block text-xs font-semibold text-ink"
          >
            {t('home.searchPickupLabel')}
          </label>
          <div className="relative">
            <CalendarDays
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              id="pickup-date"
              type="date"
              min={today}
              required
              value={pickupDate}
              onChange={(event) => {
                setPickupDate(event.target.value)
                setDateError('')
              }}
              className="min-h-12 w-full rounded-control border border-line bg-canvas pl-11 pr-3 text-sm text-ink outline-none transition focus:border-gold"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="return-date"
            className="mb-2 block text-xs font-semibold text-ink"
          >
            {t('home.searchReturnLabel')}
          </label>
          <div className="relative">
            <CalendarDays
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              id="return-date"
              type="date"
              min={
                pickupDate
                  ? addDaysToDate(pickupDate, 1)
                  : addDaysToDate(today, 1)
              }
              required
              value={returnDate}
              onChange={(event) => {
                setReturnDate(event.target.value)
                setDateError('')
              }}
              className="min-h-12 w-full rounded-control border border-line bg-canvas pl-11 pr-3 text-sm text-ink outline-none transition focus:border-gold"
            />
          </div>
        </div>

        <Button
          type="submit"
          size="md"
          variant="primary"
          className="w-full md:w-auto"
        >
          {t('home.searchButton')}
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
      </div>

      {dateError && (
        <p role="alert" className="mt-4 text-sm font-medium text-red-700">
          {dateError}
        </p>
      )}
    </form>
  )
}

export default CarSearchForm
