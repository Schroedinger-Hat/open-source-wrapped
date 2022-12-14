import WrappedCard from '@/components/WrappedCardHookBased';
import { useSession } from 'next-auth/react';

function WrappedHookBased() {
  const { data: session } = useSession();

  return (
    <div className="Wrapped">
      <div className="wrapped__wrap">
        <WrappedCard img="" type="Hello SH!" score="10" session={session} />
      </div>
    </div>
  );
}

export default Wrapped;
