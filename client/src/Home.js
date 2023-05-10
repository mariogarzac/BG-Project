import React from "react";
import "./App.css";

class Home extends React.Component {
	render() {
		return (
			<div className="content">
				<div className="home">
					<div className="large__img__container">
						<img
							className="large__img"
							src="https://images.creativemarket.com/0.1.0/ps/4349726/910/606/m2/fpnw/wm1/bldjhfsdubq4uvsdw1vlj7ribymvoobmnriu2uhqjnrsmlnze1qtwgm0vrcznypv-.jpg?1524569830&s=de860fe12fd339fbde7747445a401bdc"
							alt="Barbershop Img"
						/>
					</div>
					<h1>Bienvenido a BG Project</h1>
					<p>
						<p>
							<strong>¡Hola!</strong> Nosotros somos BG Project,
							una barberia especializada.
						</p>
						Aquí podrás ver los servicios que ofrecemos y realizar
						una cita con algun miembro de nuestro equipo.
					</p>
					<ul className="link__list">
						<li>
							<a href="/services">Nuestros Servicios</a>
						</li>
						<li>
							<a href="/calendar">Realiza Una Cita</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default Home;
