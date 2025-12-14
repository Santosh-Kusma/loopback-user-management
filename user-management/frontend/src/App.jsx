import {Navigate, createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import ChangePassword from './pages/ChangePassword';
import {isLoggedIn} from './auth/auth';

function PrivateRoute({children}) {
  return isLoggedIn() ? children : <Navigate to="/" replace/>;
}

export default function App() {
  const router = createBrowserRouter([
    {path: '/', element: <Login />},
    {path: '/register', element: <Register />},
    {
      path: '/profile',
      element: (
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      ),
    },
    {
      path: '/update-profile',
      element: (
        <PrivateRoute>
          <UpdateProfile />
        </PrivateRoute>
      ),
    },
    {
      path: '/change-password',
      element: (
        <PrivateRoute>
          <ChangePassword />
        </PrivateRoute>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}
