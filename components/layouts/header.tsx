import { FC } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/button'

export const Header: FC = () => {
  const { user, signOut } = useAuth()

  return (
    <header className="w-full px-4 py-2 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Logo
        </Link>
        
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <span>{user.email}</span>
              <Button onClick={() => signOut()}>ログアウト</Button>
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="ghost">ログイン</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>新規登録</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}