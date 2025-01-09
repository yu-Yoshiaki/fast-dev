'use client'
import { useAuth } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/button'

export function LoginForm() {
  const { signIn } = useAuth()

  return (
    <div className="space-y-4">
      <Button onClick={() => signIn('google')}>
        Googleでログイン
      </Button>
      <Button onClick={() => signIn('github')}>
        GitHubでログイン
      </Button>
    </div>
  )
} 