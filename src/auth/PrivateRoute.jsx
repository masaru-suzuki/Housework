import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { AuthContext } from './AuthProvider'
import Login from '../components/Login'

const PrivateRoute = ({ component: RouteComponent, ...options }) => {
  console.log('priveteRouter')
  const { currentUser } = useContext(AuthContext)
  const Component = currentUser ? RouteComponent : Login

  return <Route {...options} component={Component} />
}

export default PrivateRoute
