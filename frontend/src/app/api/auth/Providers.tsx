"use client"

import { SessionProvider } from "next-auth/react"
import { Props } from "../../common/types"

const providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default providers
