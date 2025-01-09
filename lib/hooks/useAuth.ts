import { createClient } from '@/lib/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useAuthStore } from '@/stores/auth';

export function useAuth() {
  const router = useRouter();
  const supabase = createClient();
  const { setUser } = useAuthStore();

  const signIn = useCallback(
    async (provider: 'google' | 'github') => {
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
    },
    [supabase]
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/auth/login');
  }, [supabase, router, setUser]);

  return { signIn, signOut };
}
