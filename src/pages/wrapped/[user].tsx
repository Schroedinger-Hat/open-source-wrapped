import WrappedCards from "@/components/WrappedCards";
import { useSession } from 'next-auth/react'

function Wrapped() {
  const { data: session } = useSession();

  return (
    <div className="Wrapped">
      <div className="wrapped__wrap">
        <WrappedCards
          img=""
          phrase=""
          type="Hello SH!"
          score="10"
          session={session}
        />
      </div>
    </div>
  );
}

export default Wrapped;
