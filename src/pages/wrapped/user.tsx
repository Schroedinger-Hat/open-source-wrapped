import WrappedCard from '@/components/WrappedCard';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

function Wrapped() {
  const { data: session } = useSession();

  return (
    <div className="Wrapped">
      <WrappedCard
        type="Hello SH!"
        score="10"
        img="/wrapped3.png"
        session={session}
      />
      <div className="wrapped__wrap">
        <Image alt="test" width={400} height={800} src={'/svg/panel-1.svg'} />
        <Image alt="test" width={400} height={800} src={'/svg/panel-2.svg'} />
        <Image alt="test" width={400} height={800} src={'/svg/panel-4.svg'} />
        <Image alt="test" width={400} height={800} src={'/svg/panel-5.svg'} />
        <Image alt="test" width={400} height={800} src={'/svg/panel-6.svg'} />
      </div>
    </div>
  );
}

export default Wrapped;
