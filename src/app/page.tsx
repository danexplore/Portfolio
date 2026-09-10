import { About } from "@/components/About"
import { Contact } from "@/components/Contact"
import { ExperienceTimeline } from "@/components/ExperienceTimeline"
import { Featured } from "@/components/Featured"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Projects } from "@/components/Projects"
import { Skills } from "@/components/Skills"

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <Featured />
        <About />
        <Projects />
        <ExperienceTimeline />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
