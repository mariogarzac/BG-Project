import React from 'react';
import './style/Square.css';

function Square() {
  return (       
      <div className="container">
        <div className="square">AQUI SI SE VE BONITO EL TEXTO</div>
        <div className="left-square">
        <img src={process.env.PUBLIC_URL + 'fondo.png'} alt="fondo"/>
          <div className="buttons">
          <button>Agendar Cita</button>
          <button>Personal</button>
          <button>Servicios</button>
          <button>Sobre Nosotros</button>
          </div>
          </div>
        <div className="right-square"></div>
      </div>
  );
}

export default Square;

