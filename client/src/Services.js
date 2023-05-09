import React from "react";
import "./App.css";
import ServiceCard from "./Service-Card";

class Services extends React.Component {
	render() {
		return (
			<div className="content">
				<div className="services">
					<h1>Servicios</h1>
					<p>Aqui encontraras los servicios que ofrecemos:</p>
					<ServiceCard
						title="Corte de cabello (Caballero)"
						desc="Corte de cabello para caballero."
						precio="100"
						nombres={[
							"Juan Gonzalez",
							"Pedro Infante",
							"Pablo Ortiz",
						]}
					/>
					<ServiceCard
						title="Corte de cabello (Dama)"
						desc="Corte de cabello para dama."
						precio="200"
						nombres={["Mario Garza", "Juan Rulfo", "John Lennon"]}
					/>
					<ServiceCard
						title="Afeitado"
						desc="Afeitado de barba."
						precio="200"
						nombres={["Mario Garza"]}
					/>
				</div>
			</div>
		);
	}
}

export default Services;
