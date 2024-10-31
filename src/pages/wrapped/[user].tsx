import WrappedCards from '@/components/WrappedCards';
import html2canvas from 'html2canvas';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import dataURLtoBlob from 'src/utils/dataUrlToBlob';

export async function getServerSideProps() {
  return { props: {  } }
}

function Wrapped() {
  const { data: session } = useSession();

  const router = useRouter();
  const { user = null } = router.query;
  // @ts-ignore
  const username = session && session.user ? session.user?.login : user;

  function download(canvas: HTMLCanvasElement, filename: string) {
    const data = canvas.toDataURL("image/png;base64");
    const url = URL.createObjectURL(dataURLtoBlob(data));
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', `${username}-wrapped-2023.png`);
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const share = () => {
    if (document.querySelector('.wrapped__wrap')) {
      // @ts-ignore
      html2canvas(document.querySelector('.wrapped__wrap'), {
        scale: 3,
        windowWidth: 3000,
      }).then(function(canvas) {
        download(canvas, 'wrapped.png');
    });
    }
  }

  const wrappedURL = 'https://wrapped.schroedinger-hat.org';
  const sharerURL = `${wrappedURL}/.netlify/functions/generator?user=${username}&social=true`;

  return (
    <div className="Wrapped">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2em'
      }}>
        <span style={{ padding: '0.8em 1.5em' }} className="button" onClick={() => share()}>
            Download & Share
        </span>
        {/*<a
          type='button'
          target='_blank'
          rel='noreferrer'
          href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent('Just got my Github Wrapped by @schrodinger_hat #githubwrapped2023 — claim yours!\n\n' + sharerURL)}
          className='ticket-share social-button'
        >
          <Image width={30} height={30} src="/icons/twitter.svg" alt="Twitter" />
        </a>
        <a
          type='button'
          target='_blank'
          rel='noreferrer'
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${sharerURL}?utm_source=linkedin&utm_medium=sharer&utm_campaign=wrapped23_ticket`}
          className='ticket-share social-button'
        >
          <Image width={28} height={28} src="/icons/linkedin.svg" alt="Linkedin" />
        </a>*/}
      </div>
      <div className="wrapped__wrap">
        <WrappedCards
          img=""
          phrase=""
          type="Hello SH!"
          score="10"
          session={session}
          pathUser={user}
        />
      </div>
    </div>
  );
}

export default Wrapped;
