import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './ErrorPage.tsx';
import UserForm from './Form.tsx';
import View from './View.tsx';
import { NavItem } from './types.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App content={<UserForm/>}/>,
    loader: () => {
      return NavItem.Home
    },
    errorElement: <ErrorPage/>,
  },
  {
    path: '/view',
    element: <App content={<View/>}/>,
    loader: () => {
      return NavItem.View
    },
    errorElement: <ErrorPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
