import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Fuel,
  MapPin,
  Settings2,
  Users,
} from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { demoFleet, type DemoVehicle } from '../data/demoFleet'
import {
  addDaysToDate,
  formatDate,
  getLocalDateInputValue,
  rentalDays,
} from '../utils/dates'
import NotFoundPage from './NotFoundPage'

type DemoBookingRequest = {
  reference: string
  days: number
  total: number
  pickupDate: string
  returnDate: string
}

const descriptions: Record<DemoVehicle['category'], string> = {
  SUV: 'Alliant une position de conduite surélevée à un grand confort de route, ce SUV est prêt pour les escapades comme pour les trajets du quotidien.',
  Berline:
    'Cette berline privilégie le raffinement et le confort à bord, avec une conduite fluide pensée pour les longs trajets.',
  Sportive:
    'Une silhouette affirmée, des sensations précises et un caractère résolument tourné vers le plaisir de conduite.',
  Électrique:
    'Une conduite silencieuse et réactive, associée à un habitacle contemporain pour parcourir la ville autrement.',
}

function getGalleryImages(vehicle: DemoVehicle) {
  return [
    ...new Set([
      vehicle.image,
      ...demoFleet
        .filter(
          (otherVehicle) =>
            otherVehicle.category === vehicle.category &&
            otherVehicle.id !== vehicle.id,
        )
        .map((otherVehicle) => otherVehicle.image),
    ]),
  ]
}

function CarDetailsPage() {
  const { t, i18n } = useTranslation()
  const { carId } = useParams()
  const vehicle = demoFleet.find((item) => item.id === carId)
  const [activeImage, setActiveImage] = useState(0)
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [dateError, setDateError] = useState('')
  const [bookingRequest, setBookingRequest] =
    useState<DemoBookingRequest | null>(null)

  useEffect(() => {
    setActiveImage(0)
    setPickupDate('')
    setReturnDate('')
    setDateError('')
    setBookingRequest(null)
  }, [carId])

  if (!vehicle) return <NotFoundPage />

  const galleryImages = getGalleryImages(vehicle)
  const days = rentalDays(pickupDate, returnDate)
  const total = days * vehicle.pricePerDay
  const today = getLocalDateInputValue()
  const priceFormatter = new Intl.NumberFormat(
    i18n.resolvedLanguage === 'ar'
      ? 'ar-EG'
      : i18n.resolvedLanguage === 'en'
        ? 'en-US'
        : 'fr-FR',
    {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    },
  )

  function updatePickupDate(value: string) {
    setPickupDate(value)
    setDateError('')
    setBookingRequest(null)
    if (returnDate && value && returnDate <= value) setReturnDate('')
  }

  function updateReturnDate(value: string) {
    setReturnDate(value)
    setDateError('')
    setBookingRequest(null)
  }

  function handleBookingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!vehicle || !vehicle.isAvailable) {
      setDateError(
        vehicle ? t('carDetail.bookingUnavailableError') : t('carDetail.vehicleUnavailable'),
      )
      return
    }

    if (days < 1) {
      setDateError(t('carDetail.bookingError'))
      return
    }

    setBookingRequest({
      reference: `DEMO-${vehicle.id.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`,
      days,
      total,
      pickupDate,
      returnDate,
    })
  }

  return (
    <main id="main-content">
      <section className="py-8 sm:py-12">
        <Container>
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {t('carDetail.backToFleet')}
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:gap-10">
            <div>
              <div className="overflow-hidden rounded-3xl bg-subtle">
                <img
                  src={galleryImages[activeImage]}
                  alt={`${vehicle.brand} ${vehicle.model} — ${t('common.seeVehicle')}`}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
              {galleryImages.length > 1 && (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {galleryImages.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      aria-label={`${t('common.seeVehicle')} ${index + 1}`}
                      aria-pressed={activeImage === index}
                      onClick={() => setActiveImage(index)}
                      className={`overflow-hidden rounded-xl border-2 ${
                        activeImage === index
                          ? 'border-gold'
                          : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt=""
                        loading="lazy"
                        className="aspect-[16/9] w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
              <p className="mt-3 text-xs text-muted">{t('carDetail.demoNote')}</p>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                      {vehicle.category} · {vehicle.year}
                    </p>
                    <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink">
                      {vehicle.brand} {vehicle.model}
                    </h1>
                  </div>
                  <span
                    className={`mt-1 shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                      vehicle.isAvailable
                        ? 'bg-subtle text-ink'
                        : 'bg-brand-black text-brand-paper'
                    }`}
                  >
                    {vehicle.isAvailable
                      ? t('carDetail.available')
                      : t('carDetail.unavailable')}
                  </span>
                </div>

                <div className="mt-5 flex items-baseline gap-2 border-b border-line pb-5">
                  <span className="font-display text-3xl font-bold text-ink">
                    {priceFormatter.format(vehicle.pricePerDay)}
                  </span>
                  <span className="text-sm text-muted">{t('common.perDay')}</span>
                </div>

                <p className="mt-5 text-sm leading-7 text-muted">
                  {descriptions[vehicle.category]}
                </p>

                <ul className="mt-6 grid grid-cols-2 gap-3">
                  <li className="flex items-center gap-2 rounded-xl bg-canvas p-3 text-sm text-ink">
                    <MapPin size={16} className="text-gold" aria-hidden="true" />
                    {vehicle.city}
                  </li>
                  <li className="flex items-center gap-2 rounded-xl bg-canvas p-3 text-sm text-ink">
                    <Settings2
                      size={16}
                      className="text-gold"
                      aria-hidden="true"
                    />
                    {vehicle.transmission}
                  </li>
                  <li className="flex items-center gap-2 rounded-xl bg-canvas p-3 text-sm text-ink">
                    <Fuel size={16} className="text-gold" aria-hidden="true" />
                    {vehicle.fuelType}
                  </li>
                  <li className="flex items-center gap-2 rounded-xl bg-canvas p-3 text-sm text-ink">
                    <Users size={16} className="text-gold" aria-hidden="true" />
                    {vehicle.seats} {t('common.seats')}
                  </li>
                </ul>

                <a
                  href="#booking"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-gold"
                >
                  {t('carDetail.estimate')}
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section
        id="booking"
        className="scroll-mt-24 bg-subtle py-12 sm:py-16"
        aria-labelledby="booking-title"
      >
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionHeading
              id="booking-title"
              eyebrow={t('common.for')}
              title={t('carDetail.estimate')}
              description={t('carDetail.estimateDescription')}
            />
            <p className="mt-4 text-xs leading-5 text-muted">
              {t('carDetail.estimateHint')}
            </p>
          </div>

          <form
            onSubmit={handleBookingSubmit}
            className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-7"
          >
            <h2 className="font-display text-lg font-semibold text-ink">
              {t('carDetail.bookingTitle')}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="booking-pickup"
                  className="mb-2 block text-xs font-semibold text-ink"
                >
                  {t('carDetail.pickupDate')}
                </label>
                <div className="relative">
                  <CalendarDays
                    size={17}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    id="booking-pickup"
                    type="date"
                    min={today}
                    required
                    value={pickupDate}
                    onChange={(event) => updatePickupDate(event.target.value)}
                    className="min-h-12 w-full rounded-control border border-line bg-canvas pl-11 pr-3 text-sm text-ink outline-none transition focus:border-gold"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="booking-return"
                  className="mb-2 block text-xs font-semibold text-ink"
                >
                  {t('carDetail.returnDate')}
                </label>
                <div className="relative">
                  <CalendarDays
                    size={17}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    id="booking-return"
                    type="date"
                    min={
                      pickupDate
                        ? addDaysToDate(pickupDate, 1)
                        : addDaysToDate(today, 1)
                    }
                    required
                    value={returnDate}
                    onChange={(event) => updateReturnDate(event.target.value)}
                    className="min-h-12 w-full rounded-control border border-line bg-canvas pl-11 pr-3 text-sm text-ink outline-none transition focus:border-gold"
                  />
                </div>
              </div>
            </div>

            {dateError && (
              <p role="alert" className="mt-4 text-sm font-medium text-red-700">
                {dateError}
              </p>
            )}

            <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
              <div>
                <p className="text-xs text-muted">
                  {days > 0
                    ? t('carDetail.daysLabel', { count: days })
                    : t('carDetail.selectDates')}
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-ink">
                  {days > 0 ? priceFormatter.format(total) : '—'}
                </p>
              </div>
              <Button
                type="submit"
                size="md"
                variant="accent"
                disabled={!vehicle.isAvailable}
              >
                {vehicle.isAvailable
                  ? t('carDetail.simulate')
                  : t('carDetail.vehicleUnavailable')}
              </Button>
            </div>

            {bookingRequest && (
              <div
                role="status"
                className="mt-5 rounded-xl border border-gold/40 bg-canvas p-4"
              >
                <p className="font-semibold text-ink">
                  {t('carDetail.bookingReady')} · {bookingRequest.reference}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {t('carDetail.daysLabel', { count: bookingRequest.days })} ·{' '}
                  {priceFormatter.format(bookingRequest.total)}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {t('common.from')} {formatDate(bookingRequest.pickupDate)} {t('common.to')}{' '}
                  {formatDate(bookingRequest.returnDate)}
                </p>
                <p className="mt-2 text-xs leading-5 text-muted">
                  {t('carDetail.bookingDemoText')}
                </p>
              </div>
            )}
          </form>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="font-display text-lg font-semibold text-ink">
              {t('carDetail.compareTitle')}
            </p>
            <p className="mt-2 text-sm text-muted">
              {t('carDetail.compareDescription')}
            </p>
          </div>
          <Button href="/cars" size="md" variant="secondary">
            {t('carDetail.compareButton')}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </Container>
      </section>
    </main>
  )
}

export default CarDetailsPage
