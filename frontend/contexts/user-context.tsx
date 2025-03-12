"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface UserProfile {
  id?: string | number
  name: string
  email: string
  role: "student" | "faculty" | "admin"
  avatar?: string
  rollNumber?: string
  employeeId?: string
  adminId?: string
  department?: string
  semester?: number
  division?: string
  lastLogin?: Date
}

interface UserContextType {
  user: UserProfile | null
  setUser: (user: UserProfile | null) => void
  isLoading: boolean
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        // Convert lastLogin string back to Date object if it exists
        if (parsedUser.lastLogin) {
          parsedUser.lastLogin = new Date(parsedUser.lastLogin)
        }
        setUser(parsedUser)
      } catch (error) {
        console.error("Failed to parse saved user:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    }
  }, [user])

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return <UserContext.Provider value={{ user, setUser, isLoading, logout }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

