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
              <input type={'text'} className='username' placeholder='Your username' onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className='content-footer'>
              <Link href={`/wrapped/${username}`}>
                <button disabled={username.length < 1} className='button'>Wrap me up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wrapped;
