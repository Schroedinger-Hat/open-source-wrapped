// @ts-nocheck
import Link from 'next/link';
import { useSession } from "next-auth/react"
import LogIn from '../components/LogIn';

function Wrapped() {
  const { data: session } = useSession();

  return (
    <>
      <div className='body-wrap'>
        <div className='container'>
          <div className='content-wrap'>
            <div className='content-header'>
              <h1>Open Source Wrapped</h1>
            </div>
            <div className='content-footer'>
              <div className='content-footer__wrap'>
                <LogIn session={session} />
                {
                  session && session.user ? (
                    <div className='action'>
                      <Link className='button' href={`/wrapped/${session.user.login}`}>
                        Wrap me up
                      </Link>
                    </div>
                  ) : (
                    <></>
                  )
                }
                <div className='clearfix' />
                <small className='text-center'>
                  Read-only access to public information.
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
