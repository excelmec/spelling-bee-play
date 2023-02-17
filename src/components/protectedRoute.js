import { Router, useRouter } from 'next/router'
import React from 'react'
import {UserContext} from '../contexts/UserContext'

function protectedRoute({children}) {
  const router = useRouter()
  const {profile} = React.useContext(UserContext)

  if(profile && profile.email)
  return (
    <div>
      {children}
    </div>
  )
    else{
    router.push('/')
    return (
      <div>
        <h1>You are not logged in</h1>
      </div>
    )
    }
}

export default protectedRoute