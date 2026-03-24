import { GlobalStyle, Title } from "./styles/globalStyles.js";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";

function App()
{
	return (
		<>
			<GlobalStyle />
			<Sidebar />
			{/* <Header /> */}
			<Title>Hello World</Title>
			<Title>App</Title>
			<Outlet />
		</>
	);
}

export default App;
