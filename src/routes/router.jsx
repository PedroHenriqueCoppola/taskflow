import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';

import PublicLayout from "../layouts/PublicLayout/PublicLayout.jsx";
import NotFound from '../pages/NotFound/NotFound.jsx';
import Login from '../pages/Login/Login.jsx';
import SignUp from '../pages/SignUp/SignUp.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import Calendar from '../pages/Calendar/Calendar.jsx';
import Progress from '../pages/Progress/Progress.jsx';
import Tasks from '../pages/Tasks/Tasks.jsx';
import Admin from '../pages/Admin/Admin.jsx';

export const router = createBrowserRouter([
	// Rotas públicas (sem Sidebar)
	{
		element: <PublicLayout />,
		errorElement: <NotFound />,
		children: [
			{
				path: "/login",
				element: <Login />
			},
            {
                path: "/signup",
                element: <SignUp />
            }
		]
	},

	// Rotas privadas (com Sidebar e layout App)
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/',
				element: <Dashboard />
			},
			{
				path: '/calendar',
				element: <Calendar />
			},
			{
				path: '/progress',
				element: <Progress />
			},
			{
				path: '/tasks',
				element: <Tasks />
			},
			{
				path: '/admin',
				element: <Admin />
			}
		]
	}
])
