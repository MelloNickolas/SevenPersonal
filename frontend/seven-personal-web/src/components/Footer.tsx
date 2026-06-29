import Logo from './Logo'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Logo size={34} withText mono />
        <nav className="footer__links">
          <a href="#planos">Planos</a>
          <a href="#programacao">Programação</a>
          <a href="#galeria">Galeria</a>
          <a href="#contato">Contato</a>
        </nav>
        <small>© {year} Seven Personal. Todos os direitos reservados.</small>
      </div>
    </footer>
  )
}
