import WrappedCards from '@/components/WrappedCards';
import html2canvas from 'html2canvas';
import { useSession } from 'next-auth/react';
import dataURLtoBlob from 'src/utils/dataUrlToBlob';

function Wrapped() {
  const { data: session } = useSession();

  function download(canvas: HTMLCanvasElement, filename: string) {
    const data = canvas.toDataURL("image/png;base64");
    window.open(URL.createObjectURL(dataURLtoBlob(data)));
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

  return (
    <div className="Wrapped">
      <span style={{ display: 'table', margin: 'auto', padding: '0.8em 1.5em' }} className="button" onClick={() => share()}>
          Download & Share
      </span>
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
