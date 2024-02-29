import { createClient } from '@/libs/supabase/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Header from '@/components/share/Header';

export default async function Admin() {
  const supabase = createClient(cookies());
  const userResponse = await supabase.auth.getUser();

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center">
      <Header />
      <Image
        src="/banner3.png"
        alt="배경"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/10 dark:bg-black/60" />
      {!!userResponse?.data.user ? <Dashboard /> : <Login />}
    </div>
  );
}
