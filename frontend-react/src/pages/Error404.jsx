import { Link } from 'react-router-dom';
import './Error404.css';

function Error404() {
  return (
    <div className="error404-container">
      <div className="bonfire-scene">
        <div className="bonfire">
          <div className="flame flame1"></div>
          <div className="flame flame2"></div>
          <div className="flame flame3"></div>
          <div className="logs"></div>
        </div>
        
        <div className="error-content">
          <h1 className="souls-title">YOU DIED</h1>
          <p className="error-code">Error 404</p>
          <p className="error-message">
            Esta alma no existe en la sociedad...
          </p>
          <p className="souls-message">
            Te has perdido en las tinieblas de Soul Society.
          </p>
          
          <div className="actions">
            <Link to="/" className="btn-respawn">
              🔥 Retornar a la Hoguera Principal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error404;
