'use client';
import { useRouter } from '@/app/(RSAdmin)/admin/routes/hook';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/home');
    
  }, [router]);
  return null;
}
