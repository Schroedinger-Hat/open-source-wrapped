import WrappedCards from "@/components/WrappedCards";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { useEffect } from "react";

function Wrapped() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    // @ts-ignore
    if (!session || !router.asPath.includes(session?.user.login)) {
      router.push('/')
    }
  }, []) 

  return (
    <div className="Wrapped">
      <div className="wrapped__wrap">
        <WrappedCards img='' type="Hello SH!" score="10" session={session}/>
      </div>
    </div>
  );
}

export default Wrapped;
