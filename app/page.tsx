'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'

export default function HomePage() {
  const { user, checkAuth } = useAuthStore()
  const { isLoading } = useUIStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <main className="flex min-h-screen bg-blue-300 flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        {user ? (
          <h1>Welcome {user.name}</h1>
        ) : (
          <h1>Please login to continue</h1>
        )}
      </div>
    </main>
  )
}
