import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Container from './Container'

const footerLinks = [
  { key: 'home', href: '/' },
  { key: 'fleet', href: '/cars' },
  { key: 'approach', href: '/#services' },
  { key: 'contact', href: '/#contact' },
]

function Footer() {
  const { t } = useTranslation()

  return (
    <footer id="contact" className="bg-brand-black text-brand-paper">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col justify-between gap-10 border-b border-white/15 pb-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5"
              aria-label={`CarRental — ${t('common.backToHome')}`}
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-gold font-display text-sm font-bold text-brand-black">
                C
              </span>
              <span className="font-display text-sm font-bold tracking-[0.16em]">
                CAR<span className="font-medium text-white/55">RENTAL</span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-6 text-white/60">
              {t('home.servicesDescription')}
            </p>
          </div>

          <nav aria-label="Navigation de pied de page">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
              {t('nav.contact')}
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="inline-flex items-center gap-1 text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {t(`nav.${item.key}`)}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} CarRental. {t('common.allRights')}
          </p>
          <Link to="/#home" className="w-fit transition-colors hover:text-white">
            {t('common.backToTop')}
          </Link>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
