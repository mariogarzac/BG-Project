import React from "react";
import "./App.css";

function ServiceCard({ title, desc, precio, nombres }) {
	return (
		<div className="card">
			<p className="card__title">{title}</p>
			<p className="card_description">{desc}</p>
			<p>Tiene un costo de: ${precio}</p>
			<p>Este servicio es realizado por:</p>
			<ul className="card__list">
				{nombres.map((nombre) => (
					<li>{nombre}</li>
				))}
			</ul>
			<div className="card__button__container">
				<button className="card__button">Reservar</button>
			</div>
		</div>
	);
}

export default ServiceCard;
