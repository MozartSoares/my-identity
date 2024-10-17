"use client"
import { useEffect, useRef, useState } from "react"
import "./Profile.css"
import Header from "../components/Header"
import { userDto } from "../common/types"
import { useSession } from "next-auth/react"
import { API_URL } from "../common/Constants"

type Props = {
  params: {
    id: string
  }
}

const Profile = (props: Props) => {
  const { data: session } = useSession()
  const [user, setUser] = useState<Omit<userDto, "password">>({
    name: "",
    email: "",
  })

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (props.params.id) {
        const response = await fetch(`${API_URL}/user/${props.params.id}`, {
          headers: {
            Authorization: `Bearer ${session?.tokens.access}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUser({
            name: data.name,
            email: data.email,
          })
        }
      } else {
        setUser({
          name: session?.user?.name || "a",
          email: session?.user?.email || "a",
        })
      }
    }
    fetchUserProfile()
  }, [props.params.id, session])

  return (
    <>
      <Header />
      <div className="profile-container">
        <h2 className="title">{props.params.id ? "Perfil" : "Meu Perfil"}</h2>
        <div className="profile-form">
          <div className="profile-field">
            <label htmlFor="name">Nome</label>
            <p>{user.name}</p>
          </div>

          <div className="profile-field">
            <label htmlFor="email">Email</label>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
