import Link from "next/link"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex flex-1 items-center justify-center px-5 pt-16">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">404</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">Página não encontrada.</h1>
          <Link href="/" className="mt-6 inline-block rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-bg">
            Voltar ao início
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
