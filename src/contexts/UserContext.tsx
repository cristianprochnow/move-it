import { createContext, ReactNode, useState } from "react";

interface UserContextData {
  githubUsername: string
}

interface UserProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({ children }: UserProviderProps) {
  const [githubUsername, setGithubUsername] = useState('')

  return (
    <UserContext.Provider value={{githubUsername}}>
      {children}
    </UserContext.Provider>
  )
}
