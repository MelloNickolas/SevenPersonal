import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Logo from '@/components/Logo'
import { useAuth } from '@/lib/auth'
import '@/styles/admin.css'

const nav = [
  { to: '/admin/plans', label: 'Planos', icon: '💳' },
  { to: '/admin/carousel', label: 'Programação', icon: '🗓️' },
  { to: '/admin/gallery', label: 'Galeria', icon: '🖼️' },
  { to: '/admin/settings', label: 'Configurações', icon: '⚙️' },
]

export default function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function onLogout() {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <div className="admin__brand">
          <Logo size={34} withText mono />
        </div>

        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `admin__nav-link ${isActive ? 'admin__nav-link--active' : ''}`
            }
          >
            <span>{item.icon}</span> {item.label}
          </NavLink>
        ))}

        <a
          className="admin__nav-link"
          href="/"
          target="_blank"
          rel="noreferrer"
          style={{ marginTop: 8 }}
        >
          <span>🌐</span> Ver site
        </a>

        <button className="admin__logout" onClick={onLogout}>
          ↪ Sair
        </button>
      </aside>

      <main className="admin__main">
        <Outlet />
      </main>
    </div>
  )
}
