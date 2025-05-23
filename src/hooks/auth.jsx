import { createContext, useContext, useState, useEffect } from "react";

import { api } from '../services/api'

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [data, setData] = useState({})

  async function signIn({ email, senha }) {

    try {
      const response = await api.post("/login", { email, senha })
      const { user, token } = response.data

      localStorage.setItem('@web-market:user', JSON.stringify(user))
      localStorage.setItem('@web-market:token', token)

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setData({ user, token})

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi posível realizar o login.")
      }
    }
  }

  function signOut() {
    localStorage.removeItem('@rocketnotes:token')
    localStorage.removeItem('@rocketnotes:user')

    setData({})
  }

  useEffect(() => {
    const token = localStorage.getItem('@web-market:token')
    const user = localStorage.getItem('@web-market:user')

    if (token && user ) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setData({
        token,
        user: JSON.parse(user)
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      user: data.user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }