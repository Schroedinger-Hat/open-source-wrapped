import WrappedCard from '@/components/WrappedCard';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Wrapped() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    // @ts-ignore
    if (!session || !router.asPath.includes(session?.user.login)) {
      router.push('/');
    }
  }, []);

  return (
    <div className="Wrapped">
      <WrappedCard
        type="Hello SH!"
        score="10"
        img="/wrapped3.png"
        session={session}
      />
    </div>
  );
}

export default Wrapped;
