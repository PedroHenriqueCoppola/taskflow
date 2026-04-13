import './App.css';

import { useState } from "react";
import { GlobalStyle } from "./styles/globalStyles.js";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Header from "./components/Header/Header.jsx";

function App() {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<>
			<GlobalStyle />
			<div className="appLayout">
				<Sidebar isOpen={isOpen} />

				<div className="appMain">
					<Header toggleSidebar={() => setIsOpen(prev => !prev)} />
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default App;
