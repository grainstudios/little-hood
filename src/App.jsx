import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CatalogProvider } from './context/CatalogContext'
import LandingPage from './pages/LandingPage'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <CatalogProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </CatalogProvider>
  )
}

export default App
