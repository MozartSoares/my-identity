"use client"
import Link from "next/link"
import LoginButton from "../LoginButton"
import "./Header.css"

const Header = () => {
  return (
    <header>
      <div className="links-wrapper">
        <Link href={"/"}>Página Inicial</Link>
        <Link href={"/profile"}>Meu Perfil</Link>
      </div>
      <LoginButton />
    </header>
  )
}

export default Header
