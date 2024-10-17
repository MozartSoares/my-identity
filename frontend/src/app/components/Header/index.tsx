"use client"
import Link from "next/link"
import LoginButton from "../LoginButton"
import "./Header.css"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

const Header = () => {
  const { data: session } = useSession()
  const alertUser = () => {
    toast.error("Você precisa estar logado para acessar essa página")
    return
  }

  return (
    <header>
      <div className="links-wrapper">
        <Link href={"/"}>Página Inicial</Link>
        {session ? (
          <Link href={"/profile"}>Meu Perfil</Link>
        ) : (
          <div role="link" className="profile-link" onClick={() => alertUser()}>
            Meu Perfil
          </div>
        )}
      </div>
      <LoginButton />
    </header>
  )
}

export default Header
