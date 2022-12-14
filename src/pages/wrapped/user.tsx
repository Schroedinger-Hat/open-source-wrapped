import WrappedCard from "@/components/WrappedCard";
import { useSession } from 'next-auth/react'


function Wrapped() {
  const { data: session } = useSession();

  return (
    <div className="Wrapped">
      <WrappedCard type="Hello SH!" score="10" img="/wrapped3.png"  session={session}/>
    </div>
  );
}

export default Wrapped;
