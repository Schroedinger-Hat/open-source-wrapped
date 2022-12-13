import Link from 'next/link';
import { useState } from 'react';

function Wrapped() {
  const [username, setUsername] = useState('');

  return (
    <>
      <div className='body-wrap'>
        <div className='container'>
          <div className='content-wrap'>
            <div className='content-header'>
              <h1>Open Source Wrapped</h1>
            </div>
            <div className='content-body'>
              <div className='content-body__wrap'>
                <input type={'text'} className='username my-1' placeholder='Your username' onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>
            <div className='content-footer'>
              <div className='content-footer__wrap'>
                <Link className='button' href={`/wrapped/${username}`}>
                  Wrap me up
                </Link>
                <div className='clearfix' />
                <small className='text-center'>
                  Ready only access to profile and commits.
                  <br/>
                  No code access, no data persistance.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className='footer__wrap'>
          Made with ❤️ by <a href='https://www.schrodinger-hat.it' target='_blank'>Schrodinger Hat</a> | <a href='https://github.com/Schrodinger-Hat/open-source-wrapped' target='_blank'>Github</a>
        </div>
      </footer>
    </>
  );
}

export default Wrapped;
