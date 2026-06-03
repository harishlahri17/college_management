import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StudentHome from './screens/Sudent/Home';
import FacultyHome from './screens/Faculty/Home';
import AdminHome from './screens/Admin/Home';
import Login from './components/Login';
import { AuthProvider } from './store/auth';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';



// import EditAdmin from './screens/Admin/Admin/EditAdmin';// edit admin from admin side

const root = ReactDOM.createRoot(document.getElementById('root'));

let allRoutes = createBrowserRouter(
  [
    {
      path: '/',
      element: <Login />
    },
    // {
    //   path: '/student',
    //   element: <StudentHome />
    // },
    {
      path: '/student',
      element: (
        <ProtectedRoute>
          <StudentHome />
        </ProtectedRoute>
      )
    },
    {
      path: 'faculty',
      element: (
        <ProtectedRoute>
          <FacultyHome />
        </ProtectedRoute>
      )
    },
    {
      path: 'admin',
      element: (
        <ProtectedRoute>
          <AdminHome />
        </ProtectedRoute>
      )
    },

  ]
)

root.render(
  // <React.StrictMode>
  //   <RouterProvider router={allRoutes} />
  // </React.StrictMode>
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={allRoutes} />
      <ToastContainer
        position="top-center"
        hideProgressBar="true"
        theme="colored"
      />
    </React.StrictMode>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
