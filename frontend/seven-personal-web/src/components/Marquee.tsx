const WORDS = ['Força', 'Disciplina', 'Resultado', 'Foco', 'Energia', 'Superação']

/** Faixa rolante com palavras de impacto — reforça a pegada motivacional. */
export default function Marquee() {
  const line = [...WORDS, ...WORDS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {line.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
    </div>
  )
}
