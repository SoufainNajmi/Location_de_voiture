import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function ScrollToLocation() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
      return
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

type SiteLayoutProps = {
  children: ReactNode
}

function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <ScrollToLocation />
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:not-sr-only focus:rounded-full focus:bg-brand-gold focus:px-5 focus:py-3 focus:font-semibold focus:text-brand-black"
      >
        Passer au contenu
      </a>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default SiteLayout
