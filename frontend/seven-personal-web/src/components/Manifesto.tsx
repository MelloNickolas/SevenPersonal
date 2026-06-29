import Reveal from './Reveal'

export default function Manifesto() {
  return (
    <section className="section manifesto">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Mentalidade Seven</p>
          <h2 className="manifesto__text">
            O único treino ruim é o que <span className="text-gradient">você não fez.</span>
          </h2>
        </Reveal>
      </div>
    </section>
  )
}
