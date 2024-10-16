"use client"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { AUTH_ROUTE } from "../../common/Constants"
import "./LoginButton.css"

const SignInButton = () => {
  const { data: session } = useSession()

  if (session && session.user) {
    return (
      <div className="container">
        <p>
          Olá <span>{session.user.name}</span>
        </p>
        <Link className="logout" href={`${AUTH_ROUTE}/signout`}>
          Logout
        </Link>
      </div>
    )
  }

  return (
    <div className="container">
      <Link className="register" href={`/register`}>
        Cadastre-se
      </Link>
      <Link className="login" href={`${AUTH_ROUTE}/signin`}>
        Login
      </Link>
    </div>
  )
}

export default SignInButton
