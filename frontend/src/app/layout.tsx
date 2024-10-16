import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Providers from "./api/auth/Providers"
import { Props } from "./common/types"
import { ToastContainer } from "react-toastify"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export default function RootLayout(props: Props) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          {props.children}
          <ToastContainer position="top-center" autoClose={5000} />
        </Providers>
      </body>
    </html>
  )
}
