import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  CarFront,
  Headset,
  Star,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import CarSearchForm, {
  type CarSearchCriteria,
} from '../components/CarSearchForm'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import VehicleCard from '../components/VehicleCard'
import {
  featuredFleet,
  vehicleCategories,
  type VehicleCategory,
} from '../data/demoFleet'

const benefitIcons = [BadgeCheck, Headset, CalendarCheck2]

function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] =
    useState<VehicleCategory | null>(null)

  const visibleVehicles = featuredFleet.filter(
    (vehicle) =>
      selectedCategory === null || vehicle.category === selectedCategory,
  )

  function handleSearch(criteria: CarSearchCriteria) {
    const searchParams = new URLSearchParams({
      pickup: criteria.pickupDate,
      return: criteria.returnDate,
    })
    if (criteria.city !== 'all') searchParams.set('city', criteria.city)
    navigate(`/cars?${searchParams.toString()}`)
  }

  function handleCategorySelect(category: VehicleCategory) {
    setSelectedCategory((current) =>
      current === category ? null : category,
    )
  }

  const resultDescription = selectedCategory
    ? `${t('home.featuredIntro')} · ${selectedCategory}`
    : t('home.featuredIntro')

  return (
    <>
      <main id="main-content">
        <section id="home" className="relative">
          <div className="relative min-h-[35rem] overflow-hidden bg-brand-black sm:min-h-[40rem] lg:min-h-[44rem]">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&h=1500&q=90"
              alt=""
              fetchPriority="high"
              className="absolute inset-0 size-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/65 to-brand-black/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/35 via-transparent to-brand-black/10" />

            <Container className="relative flex min-h-[35rem] items-center pb-24 pt-20 sm:min-h-[40rem] sm:pb-28 lg:min-h-[44rem]">
              <div className="max-w-3xl text-brand-paper">
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-gold sm:text-sm">
                  <span className="size-1.5 rounded-full bg-brand-gold" />
                  {t('home.eyebrow')}
                </p>
                <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                  {t('home.title')}
                  <br />
                  <span className="text-brand-gold">{t('home.titleAccent')}</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                  {t('home.description')}
                </p>
                <a
                  href="#featured-vehicles"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-paper transition-colors hover:text-brand-gold"
                >
                  {t('home.cta')}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </Container>
          </div>

          <Container className="relative z-10 -mt-20 pb-14 sm:-mt-24 sm:pb-20">
            <CarSearchForm onSearch={handleSearch} />
          </Container>
        </section>

        <section
          id="fleet"
          className="scroll-mt-24 py-10 sm:py-16"
          aria-labelledby="featured-title"
        >
          <Container>
            <div
              id="featured-vehicles"
              className="scroll-mt-28"
              aria-live="polite"
            >
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                    {t('home.featuredTitle')}
                  </p>
                  <h2
                    id="featured-title"
                    className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
                  >
                    {t('home.featuredTitle')}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
                    {resultDescription}
                  </p>
                </div>
                {selectedCategory && (
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => setSelectedCategory(null)}
                  >
                    {t('common.resetFilters')}
                  </Button>
                )}
              </div>

              {visibleVehicles.length > 0 ? (
                <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {visibleVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
              ) : (
                <div className="mt-8 rounded-2xl border border-line bg-surface px-6 py-12 text-center">
                  <p className="font-display text-xl font-semibold text-ink">
                    {t('common.emptyState')}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {t('cars.noResultsDescription')}
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    className="mt-5"
                    onClick={() => setSelectedCategory(null)}
                  >
                    {t('common.viewAllVehicles')}
                  </Button>
                </div>
              )}
            </div>
          </Container>
        </section>

        <section
          id="categories"
          className="scroll-mt-20 bg-surface py-16 sm:py-20"
          aria-labelledby="categories-title"
        >
          <Container>
            <SectionHeading
              id="categories-title"
              eyebrow={t('home.categories')}
              title={t('home.categoriesTitle')}
              description={t('home.categoriesDescription')}
            />
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {vehicleCategories.map((category) => {
                const count = featuredFleet.filter(
                  (vehicle) => vehicle.category === category.id,
                ).length
                const isSelected = selectedCategory === category.id

                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-label={`${category.id}, ${count} ${t('cars.vehiclesCount', {
                      count,
                    })}`}
                    aria-pressed={isSelected}
                    onClick={() => {
                      handleCategorySelect(category.id)
                      document.getElementById('featured-vehicles')?.scrollIntoView()
                    }}
                    className={`group relative flex min-h-48 items-end overflow-hidden rounded-2xl border-0 bg-brand-black p-4 text-left text-brand-paper sm:min-h-64 sm:p-6 ${
                      isSelected ? 'ring-2 ring-gold ring-offset-2' : ''
                    }`}
                  >
                    <img
                      src={category.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover opacity-65 transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-brand-black/85 via-brand-black/15 to-transparent" />
                    <span className="relative">
                      <span className="block font-display text-lg font-semibold sm:text-xl">
                        {category.id}
                      </span>
                      <span className="mt-1 block text-xs text-white/75 sm:text-sm">
                        {category.description}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </Container>
        </section>

        <section
          id="services"
          className="scroll-mt-20 py-16 sm:py-24"
          aria-labelledby="benefits-title"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div>
                <SectionHeading
                  id="benefits-title"
                  eyebrow={t('home.servicesEyebrow')}
                  title={t('home.servicesTitle')}
                  description={t('home.servicesDescription')}
                />
                <Button
                  href="#contact"
                  size="md"
                  variant="primary"
                  className="mt-7"
                >
                  {t('home.servicesCta')}
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:gap-4">
                {benefitIcons.map((Icon, index) => (
                  <article
                    key={index}
                    className={`rounded-2xl border border-line bg-surface p-5 sm:p-6 ${
                      index === 1 ? 'sm:translate-y-6' : ''
                    }`}
                  >
                    <span className="flex size-11 items-center justify-center rounded-full bg-subtle text-gold">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-base font-semibold text-ink">
                      {t(`benefits.${index}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {t(`benefits.${index}.description`)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-brand-black py-16 text-brand-paper sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                  {t('home.testimonialsNote')}
                </p>
                <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  {t('home.testimonialsTitle')}
                </h2>
                <p className="mt-3 text-xs text-white/45">
                  {t('home.testimonialsNote')}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {Array.from({ length: 3 }, (_, index) => (
                  <figure
                    key={index}
                    className="rounded-2xl border border-white/15 bg-white/[0.04] p-5"
                  >
                    <div
                      role="img"
                      className="flex gap-1 text-brand-gold"
                      aria-label="5 étoiles sur 5"
                    >
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <Star
                          key={starIndex}
                          size={14}
                          fill="currentColor"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <blockquote className="mt-4 text-sm leading-6 text-white/80">
                      “{t(`testimonials.${index}.quote`)}”
                    </blockquote>
                    <figcaption className="mt-5 border-t border-white/10 pt-4">
                      <p className="text-sm font-semibold">
                        {t(`testimonials.${index}.name`)}
                      </p>
                      <p className="mt-1 text-xs text-white/50">
                        {t(`testimonials.${index}.city`)}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-subtle p-7 sm:p-10 md:flex-row md:items-center lg:p-14">
              <div className="max-w-2xl">
                <div className="mb-4 flex items-center gap-2 text-gold">
                  <CarFront size={20} aria-hidden="true" />
                  <Zap size={16} aria-hidden="true" />
                </div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {t('home.ctaBannerTitle')}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
                  {t('home.ctaBannerDescription')}
                </p>
              </div>
              <Button href="#fleet" size="lg" variant="accent">
                {t('home.ctaBannerButton')}
                <ArrowRight size={17} aria-hidden="true" />
              </Button>
            </div>
          </Container>
        </section>
      </main>
    </>
  )
}

export default HomePage
