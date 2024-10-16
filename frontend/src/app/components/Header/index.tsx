"use client"
import Link from "next/link"
import LoginButton from "../LoginButton"
import "./Header.css"
import { useSession } from "next-auth/react"
import { useEffect, useRef } from "react"
import { toast } from "react-toastify"

const Header = () => {
  const { data: session } = useSession()
  const hasDisplayedToast = useRef(false)

  useEffect(() => {
    if (session && session.user && !hasDisplayedToast.current) {
      toast.success(`Seja Bem Vindo ${session.user.name}`)
      hasDisplayedToast.current = true
    }
  })

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
