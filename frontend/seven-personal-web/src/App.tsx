import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './lib/auth'
import Home from './pages/Home'
import Login from './pages/admin/Login'
import AdminLayout from './pages/admin/AdminLayout'
import PlansAdmin from './pages/admin/PlansAdmin'
import CarouselAdmin from './pages/admin/CarouselAdmin'
import GalleryAdmin from './pages/admin/GalleryAdmin'
import SettingsAdmin from './pages/admin/SettingsAdmin'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="plans" replace />} />
        <Route path="plans" element={<PlansAdmin />} />
        <Route path="carousel" element={<CarouselAdmin />} />
        <Route path="gallery" element={<GalleryAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
