<<<<<<< HEAD
import WrappedCard from '@/components/WrappedCardHookBased';
import { useSession } from 'next-auth/react';
=======
import WrappedCards from "@/components/WrappedCards";
import { useSession } from 'next-auth/react'
>>>>>>> 41ee0a2 (feat: svg as react component)

function Wrapped() {
  const { data: session } = useSession();

  return (
    <div className="Wrapped">
<<<<<<< HEAD
      <WrappedCard
        type="Hello SH!"
        score="10"
        img="/wrapped3.png"
        session={session}
      />
=======
      <div className="wrapped__wrap">
        <WrappedCards img='' type="Hello SH!" score="10" session={session}/>
      </div>
>>>>>>> 41ee0a2 (feat: svg as react component)
    </div>
  );
}

export default Wrapped;
