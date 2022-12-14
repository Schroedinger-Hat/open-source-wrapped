import { signIn, signOut } from 'next-auth/react';

const LogIn = ({ session }: { session: any }) => {
  return (
    <>
      {session && session.user ? null : (
        <div className="action">
          <button className="button" onClick={() => signIn()}>
            Sign in
          </button>
        </div>
      )}
    </>
  );
};

export default LogIn;
