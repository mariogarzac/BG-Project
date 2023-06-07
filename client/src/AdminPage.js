import React from "react";
import "./App.css";

function AdminPage() {
	return (
		<div className="content">
			<div className="admin_page">
				<h1>Admin Page</h1>
				<ul className="link__list">
					<li>
						<a href="/hours">Administrar horarios</a>
					</li>
					<li>
						<a href="/new-barber">Agregar barbero</a>
					</li>
				</ul>
			</div>
		</div>
	)

}

export default AdminPage;