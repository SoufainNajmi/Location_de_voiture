import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SiteLayout from './layouts/SiteLayout'
import CarsPage from './pages/CarsPage'
import CarDetailsPage from './pages/CarDetailsPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <SiteLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/:carId" element={<CarDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  )
}

export default App
