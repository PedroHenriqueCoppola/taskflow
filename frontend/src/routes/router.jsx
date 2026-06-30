import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';

import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.jsx';
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
				element: (
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				)
			},
			{
				path: '/calendar',
				element: (
					<ProtectedRoute>
						<Calendar />
					</ProtectedRoute>
				)
			},
			{
				path: '/progress',
				element: (
					<ProtectedRoute>
						<Progress />
					</ProtectedRoute>
				)
			},
			{
				path: '/tasks',
				element: (
					<ProtectedRoute>
						<Tasks />
					</ProtectedRoute>
				)
			},
			{
				path: '/admin',
				element: (
					<ProtectedRoute role="admin">
						<Admin />
					</ProtectedRoute>
				)
			}
		]
	}
])
