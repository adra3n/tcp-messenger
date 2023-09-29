import React from 'react'

interface IContext {
  loggedIn: boolean
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const Context = React.createContext<IContext | undefined>(undefined)
