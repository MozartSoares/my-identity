"use client"
import { useRef, useState } from "react"
import "./Profile.css"
import Header from "../components/Header"
import { userDto } from "../common/types"
import { useSession } from "next-auth/react"

type Props = {
  params: {
    id: string
  }
}

const Profile = (props: Props) => {
  const { data: session } = useSession()

  const payload = useRef<Omit<userDto, "password">>({
    name: "",
    email: "",
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    payload.current = {
      ...payload.current,
      [e.target.name]: e.target.value,
    }
  }

  const handleSave = () => {
    // Aqui você pode integrar a lógica de salvar as alterações
    setIsEditing(false)
    alert("Informações salvas com sucesso!")
  }

  return (
    <>
      <Header />
      <div className="profile-container">
        <h2 className="title">Meu Perfil</h2>
        <div className="profile-form">
          <div className="profile-field">
            <label htmlFor="name">Nome</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                id="name"
                maxLength={50}
                value={session?.user.name}
                onChange={handleChange}
                placeholder="ex: João Silva"
              />
            ) : (
              <p>{session?.user.name}</p>
            )}
          </div>

          <div className="profile-field">
            <label htmlFor="email">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                id="email"
                value={session?.user.email}
                onChange={handleChange}
                placeholder="ex: joao.silva@gmail.com"
              />
            ) : (
              <p>{session?.user.email}</p>
            )}
          </div>

          {isEditing ? (
            <div className="profile-buttons">
              <button className="cancel-btn" onClick={handleEditToggle}>
                Cancelar
              </button>
              <button className="save-btn" onClick={handleSave}>
                Salvar
              </button>
            </div>
          ) : (
            <button className="edit-btn" onClick={handleEditToggle}>
              Editar Informações
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Profile
