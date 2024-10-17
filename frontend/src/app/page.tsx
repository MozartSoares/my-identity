"use client"
import { useSession } from "next-auth/react"
import Header from "./components/Header"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { User } from "./common/types"
import "./Home.css"
import { API_URL } from "./common/Constants"
import Link from "next/link"

export default function Home() {
  const [users, setUsers] = useState<User[]>()
  const { data: session } = useSession()
  const hasDisplayedToast = useRef(false)

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${session?.tokens?.access}`,
        },
      })
      const response = await res.json()
      if (response) {
        setUsers(response)
      }
    }
    fetchUsers()
    if (session && session.user && !hasDisplayedToast.current) {
      toast.success(`Seja Bem Vindo ${session.user.name}`)
      hasDisplayedToast.current = true
    }
  }, [session])

  const alertUser = () => {
    if (!session) {
      toast.error("Você precisa estar logado para acessar essa página")
      return
    }
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="title-container">
          <h2>Lista de Usuários</h2>
          {session ? (
            <Link className="register" href={`/register`}>
              Adicionar usuário
            </Link>
          ) : (
            <></>
          )}
        </div>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              {session && <th>Perfil</th>}
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                {session ? (
                  <>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Link href={`/profile/${user.id}`}>Visualizar</Link>
                    </td>
                  </>
                ) : (
                  <>
                    <td onClick={alertUser}>{user.name}</td>
                    <td onClick={alertUser}>{user.email}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
