import './Inicio.css';

function Inicio() {
  return (
    <div className="inicio-container">
      <div className="hero-section">
        <h1>🔥⚔️ Soul Society</h1>
        <p className="subtitle">Donde los cazadores de almas se reúnen</p>
        <p className="description">
          Conecta con otros guerreros, comparte tus conquistas en los reinos oscuros, 
          descubre nuevos desafíos y forma parte de la hermandad de cazadores de almas.
        </p>
        <div className="features">
          <div className="feature-card">
            <span className="icon">⚔️</span>
            <h3>Guerreros</h3>
            <p>Únete a cazadores de almas élite</p>
          </div>
          <div className="feature-card">
            <span className="icon">📜</span>
            <h3>Crónicas</h3>
            <p>Documenta tus batallas épicas</p>
          </div>
          <div className="feature-card">
            <span className="icon">🗡️</span>
            <h3>Consejos</h3>
            <p>Comparte estrategias de combate</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
