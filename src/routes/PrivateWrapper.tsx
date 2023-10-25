
import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ContextApi } from '../contexts'

const PrivateWrapper: React.FC = () => {

  const {isAuthenticated}:any = useContext(ContextApi)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default PrivateWrapper
