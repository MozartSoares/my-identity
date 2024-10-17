"use client"
import { useSession } from "next-auth/react"
import Header from "./components/Header"
import { useEffect, useRef } from "react"
import { toast } from "react-toastify"

export default function Home() {
  const { data: session } = useSession()
  const hasDisplayedToast = useRef(false)

  useEffect(() => {
    if (session && session.user && !hasDisplayedToast.current) {
      toast.success(`Seja Bem Vindo ${session.user.name}`)
      hasDisplayedToast.current = true
    }
  })

  return <Header />
}
