import { useTranslation } from 'react-i18next'
import Button from '../components/Button'
import Container from '../components/Container'

function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <main id="main-content" className="py-24 sm:py-32">
      <Container className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">
          {t('notFound.error')}
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
          {t('notFound.title')}
        </h1>
        <p className="mt-3 text-muted">{t('notFound.description')}</p>
        <Button href="/" size="md" variant="accent" className="mt-7">
          {t('notFound.button')}
        </Button>
      </Container>
    </main>
  )
}

export default NotFoundPage
