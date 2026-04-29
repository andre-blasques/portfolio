import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Home } from './pages/Home'
import { ProjectPage } from './pages/ProjectPage'
import { GridSpotlight } from './components/ui/GridSpotlight'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GridSpotlight />
      <div className="grain" aria-hidden="true" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
