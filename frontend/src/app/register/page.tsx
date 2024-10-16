"use client"
import { useRef } from "react"
import "./Register.css"
import Link from "next/link"
import { API_URL } from "@/app/common/Constants"
import { toast } from "react-toastify"
import Header from "../components/Header"
import { useRouter } from "next/navigation"

type userDto = {
  name: string
  email: string
  password: string
}

const Register = () => {
  const payload = useRef<userDto>({
    name: "",
    email: "",
    password: "",
  })

  const router = useRouter()

  const register = async (e) => {
    e.preventDefault()
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload.current),
    })
    if (!response.ok) {
      if (response.status === 409) {
        toast.error("Um usuário com esse email já está cadastrado")
        return
      }
      toast.error("Ocorreu um erro ao cadastrar usuário")
      return
    }

    const user = await response.json()
    toast.success(`Usuário ${user.name} cadastrado com sucesso`)
    router.push("/")
  }

  return (
    <>
      <Header />
      <div className="register-container">
        <h2>Cadastro</h2>
        <form onSubmit={register}>
          <div className="input-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="ex: João Silva"
              onChange={(e) => (payload.current.name = e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="ex: joao.silva@gmail.com"
              onChange={(e) => (payload.current.email = e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="ex: 123"
              onChange={(e) => (payload.current.password = e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <Link id="link" href="/">
              Cancelar
            </Link>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
