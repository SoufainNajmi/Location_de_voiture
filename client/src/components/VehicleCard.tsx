import { ArrowRight, Fuel, MapPin, Settings2, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import type { DemoVehicle } from '../data/demoFleet'

type VehicleCardProps = {
  vehicle: DemoVehicle
}

function VehicleCard({ vehicle }: VehicleCardProps) {
  const { t, i18n } = useTranslation()
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

  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-surface transition-shadow duration-300 hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-subtle">
        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-canvas/95 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur">
          {vehicle.category}
        </span>
        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur ${
            vehicle.isAvailable
              ? 'bg-canvas/95 text-ink'
              : 'bg-brand-black/85 text-brand-paper'
          }`}
        >
          {vehicle.isAvailable ? t('common.available') : t('common.unavailable')}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              {vehicle.brand}
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold text-ink">
              {vehicle.model}
            </h3>
          </div>
          <p className="shrink-0 text-right">
            <span className="font-display text-lg font-bold text-ink">
              {priceFormatter.format(vehicle.pricePerDay)}
            </span>
            <span className="block text-xs text-muted">{t('common.perDay')}</span>
          </p>
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-xs text-muted">
          <MapPin size={14} aria-hidden="true" />
          <span>{vehicle.city}</span>
          <span aria-hidden="true">·</span>
          <span>{vehicle.year}</span>
        </div>

        <ul className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4 text-xs text-muted">
          <li className="flex items-center gap-1.5">
            <Settings2 size={15} aria-hidden="true" />
            <span>{vehicle.transmission}</span>
          </li>
          <li className="flex items-center gap-1.5">
            <Fuel size={15} aria-hidden="true" />
            <span>{vehicle.fuelType}</span>
          </li>
          <li className="flex items-center gap-1.5">
            <Users size={15} aria-hidden="true" />
            <span>
              {vehicle.seats} {t('common.seats')}
            </span>
          </li>
        </ul>

        <Link
          to={`/cars/${vehicle.id}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-gold"
          aria-label={`${t('common.seeVehicle')} ${vehicle.brand} ${vehicle.model}`}
        >
          {t('common.seeVehicle')}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

export default VehicleCard
