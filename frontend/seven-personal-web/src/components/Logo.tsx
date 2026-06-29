// O arquivo fica em public/logo.png (referenciado pela raiz do site).
const logoUrl = '/logo.png'

interface LogoProps {
  size?: number
  /** Mantido por compatibilidade; o PNG é o mesmo em fundo claro/escuro. */
  mono?: boolean
  withText?: boolean
}

/** Marca Seven Personal a partir do PNG oficial. */
export default function Logo({ size = 40, mono = false, withText = false }: LogoProps) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <img
        src={logoUrl}
        alt="Seven Personal"
        style={{ height: size, width: 'auto', objectFit: 'contain', display: 'block' }}
      />
      {withText && (
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
          <strong
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: size * 0.46,
              fontWeight: 800,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              color: mono ? '#fff' : 'var(--ink)',
            }}
          >
            SEVEN
          </strong>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: size * 0.26,
              fontWeight: 600,
              letterSpacing: '0.34em',
              textTransform: 'uppercase',
              color: mono ? 'rgba(255,255,255,.8)' : 'var(--blue-3)',
            }}
          >
            PERSONAL
          </span>
        </span>
      )}
    </span>
  )
}
