import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { setLanguage } from '../i18n'
import Button from './Button'
import Container from './Container'

const navigation = [
  { key: 'home', href: '/' },
  { key: 'fleet', href: '/cars' },
  { key: 'approach', href: '/#services' },
  { key: 'contact', href: '/#contact' },
]

function Navbar() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  const languageOptions = ['fr', 'en', 'ar']

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-canvas/95 backdrop-blur-md">
      <Container className="flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center gap-2.5"
          aria-label={'CarRental — ' + t('nav.home')}
          onClick={closeMenu}
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-brand-black font-display text-sm font-bold text-brand-gold">
            C
          </span>
          <span className="font-display text-sm font-bold tracking-[0.16em] text-ink">
            CAR<span className="font-medium text-muted">RENTAL</span>
          </span>
        </Link>

        <nav
          aria-label={t('nav.home')}
          className="hidden items-center gap-8 md:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center rounded-full border border-line bg-surface p-1">
            {languageOptions.map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => setLanguage(language)}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                  i18n.resolvedLanguage === language
                    ? 'bg-brand-black text-brand-paper'
                    : 'text-muted hover:text-ink'
                }`}
                aria-label={`Switch language to ${language.toUpperCase()}`}
              >
                {language.toUpperCase()}
              </button>
            ))}
          </div>
          <Button href="/cars" size="sm" variant="accent">
            {t('nav.discover')}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <div className="flex items-center rounded-full border border-line bg-surface p-1">
            {languageOptions.map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => setLanguage(language)}
                className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                  i18n.resolvedLanguage === language
                    ? 'bg-brand-black text-brand-paper'
                    : 'text-muted'
                }`}
              >
                {language.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-subtle"
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-navigation"
        className={`border-t border-line bg-canvas md:hidden ${menuOpen ? 'block' : 'hidden'}`}
      >
        <Container className="flex flex-col gap-1 py-4">
          <nav aria-label="Navigation mobile" className="flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-ink transition-colors hover:bg-subtle"
                onClick={closeMenu}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>
          <Button
            href="/cars"
            size="md"
            variant="accent"
            className="mt-2 w-full"
            onClick={closeMenu}
          >
            {t('nav.discover')}
          </Button>
        </Container>
      </div>
    </header>
  )
}

export default Navbar
