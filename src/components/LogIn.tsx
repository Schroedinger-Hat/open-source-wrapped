import { signIn, signOut } from "next-auth/react"

const LogIn = ({session}:{session: any}) => {
    return (
        <div className="login">
        {session && session.user ? (
          <button onClick={() => signOut()}>Sign out</button>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
      </div>
    )
}

export default LogIn;