'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

// Floating card data
const floatingCards = [
  {
    id: 1,
    source: "Substack",
    title: "The future of remote teams",
    bgColor: "bg-[#ff9f9726]",
    position: "top-[20px] right-[-80px] xl:right-[-150px]",
    animation: "animate-float"
  },
  {
    id: 2,
    source: "Medium",
    title: "Come l'AI cambierà il lavoro",
    bgColor: "bg-[#c99fcd26]",
    position: "top-[-40px] left-[-80px] xl:left-[-150px]",
    animation: "animate-float-delayed"
  },
  {
    id: 3,
    source: "The Atlantic",
    title: "Why we can't stop scrolling",
    bgColor: "bg-[#ffcd001a]",
    position: "top-[280px] left-[-60px] xl:left-[-120px]",
    animation: "animate-float-slow"
  },
]

// Stats data
const statsData = [
  {
    image: "/images/UnionArticlesPileIllustration.svg",
    number: "47",
    description: 'Articoli salvati "per dopo"',
    highlight: false,
  },
  {
    image: "/images/UnionClockIllustration.svg",
    number: '"Dopo"',
    description: "Che non arriva mai",
    highlight: true,
  },
  {
    image: "/images/UnionBrainIllustration.svg",
    number: "0",
    description: "Articoli effettivamente letti",
    highlight: false,
  },
]

// Steps data
const steps = [
  {
    number: "1",
    title: "Salva l'articolo",
    description: "Clicca l'estensione mentre leggi. Funziona anche con Medium e Substack a pagamento.",
  },
  {
    number: "2",
    title: "Laterr riassume",
    description: "L'AI legge l'articolo e crea un summary con i 3-5 punti chiave. In 30 secondi.",
  },
  {
    number: "3",
    title: "Ricevi il digest",
    description: "Ogni sera, una email con i riassunti di tutto ciò che hai salvato oggi.",
  },
  {
    number: "4",
    title: "Leggi (davvero)",
    description: "Dopo il summary, decidi cosa vale la pena leggere per intero.",
  },
]

// Features data
const features = [
  {
    icon: "/images/lock-open-1.svg",
    title: "Funziona con articoli a pagamento",
    description: "Se tu puoi leggerlo, noi possiamo salvarlo. L'estensione cattura il contenuto mentre sei sulla pagina.",
  },
  {
    icon: "/images/sparkles-2.svg",
    title: "Summary AI in 30 secondi",
    description: "3-5 punti chiave per ogni articolo. Sai subito di cosa parla, senza leggere tutto.",
  },
  {
    icon: "/images/mailbox-1.svg",
    title: "Digest serale via email",
    description: "Non devi aprire un'altra app. Arriva tutto nella tua inbox, quando hai tempo.",
  },
  {
    icon: "/images/newspaper-1.svg",
    title: "Reader mode pulito",
    description: "Quando vuoi leggere l'articolo completo: zero ads, zero distrazioni, solo il testo.",
  },
  {
    icon: "/images/globe-lock-1.svg",
    title: "Privacy-first",
    description: "I tuoi articoli sono tuoi. Non tracciamo, non vendiamo, non condividiamo.",
  },
  {
    icon: "/images/earth-1.svg",
    title: "Funziona ovunque",
    description: "Medium, Substack, New York Times, blog, qualsiasi sito web. Se ha testo, lo salviamo.",
  },
]

// Pricing features
const pricingFeatures = [
  "Salvataggi illimitati",
  "Summary AI per ogni articolo",
  "Digest giornaliero via email",
  "Reader mode senza distrazioni",
  "Estensione Chrome",
  "Supporto prioritario",
]

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-background min-h-screen relative overflow-x-hidden">
      {/* Header - Fixed, transforms on scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'top-4 left-1/2 -translate-x-1/2 w-[600px] max-w-[calc(100%-32px)] bg-white rounded-full shadow-lg pl-6 pr-4 py-4'
            : 'w-full px-8 lg:px-16 py-6 bg-transparent'
        }`}
      >
        <div className={`flex items-center justify-between ${scrolled ? '' : 'max-w-7xl mx-auto'}`}>
          <img
            src="/images/LaterrLogo.svg"
            alt="Laterr"
            className={`transition-all duration-300 ${scrolled ? 'h-7' : 'h-9'}`}
          />
          <nav className="flex items-center gap-6">
            <a
              href="https://app.laterr.news/auth/login"
              className="font-inter text-black text-base hover:opacity-70 transition-opacity"
            >
              Log in
            </a>
            <a
              href="https://app.laterr.news/auth/signup"
              className="inline-flex items-center gap-2.5 px-4 py-3 bg-primary hover:bg-primary-hover rounded-full text-white text-base transition-colors"
            >
              Inizia gratis
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-40 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Floating Cards */}
          {floatingCards.map((card) => (
            <div
              key={card.id}
              className={`hidden lg:flex flex-col w-52 items-center gap-2 p-3 absolute ${card.bgColor} rounded-lg shadow-md ${card.position} ${card.animation}`}
            >
              <div className="text-muted text-xs">{card.source}</div>
              <p className="text-black text-sm text-center">{card.title}</p>
            </div>
          ))}

          {/* Hero Text */}
          <h1 className="font-instrument text-5xl md:text-7xl lg:text-[116px] text-black leading-none mb-2">
            Salva articoli.
          </h1>
          <h2 className="font-bricolage font-bold text-5xl md:text-7xl lg:text-[116px] text-primary tracking-tight leading-none mb-8">
            Leggi i riassunti.
          </h2>
          <p className="font-inter text-lg md:text-2xl text-black max-w-2xl mx-auto mb-10 leading-relaxed">
            L'app read-it-later che ti manda ogni sera un digest con i summary AI degli articoli che hai salvato. Così sai cosa c'è dentro - senza leggere tutto.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-2">
            <a
              href="https://app.laterr.news/auth/signup"
              className="inline-flex items-center gap-2.5 px-6 py-5 bg-primary hover:bg-primary-hover rounded-full text-white font-semibold text-base transition-colors"
            >
              Inizia subito gratis
              <img src="/images/Arrow-1.svg" alt="" className="w-8 h-3" />
            </a>
            <p className="text-muted text-xs">14 giorni free trial. Poi €12,99/anno</p>
          </div>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          {/* Desktop */}
          <img
            src="/images/ProductPreview_D.png"
            alt="Laterr - Salva articoli con l'estensione, leggi i riassunti nell'app, ricevi il digest via email"
            className="hidden md:block w-full scroll-animate"
          />
          {/* Mobile */}
          <img
            src="/images/ProductPreview_M.png"
            alt="Laterr - Salva articoli con l'estensione, leggi i riassunti nell'app, ricevi il digest via email"
            className="block md:hidden w-full scroll-animate"
          />
        </div>
      </section>

      {/* Stats Section - "Salvi articoli che poi non leggi mai?" */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="scroll-animate font-instrument text-4xl md:text-5xl lg:text-6xl text-black text-center mb-16">
            Salvi articoli che poi non leggi mai?
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className={`scroll-animate stagger-${index + 1} flex flex-col items-center gap-2 p-6 rounded-2xl w-[250px] ${
                  stat.highlight ? 'bg-primary' : ''
                }`}
              >
                <img
                  src={stat.image}
                  alt=""
                  className="w-32 h-32 object-contain"
                />
                <div
                  className={`font-bricolage font-bold text-6xl tracking-tight ${
                    stat.highlight ? 'text-white' : 'text-primary'
                  }`}
                >
                  {stat.number}
                </div>
                <p
                  className={`font-inter text-base text-center ${
                    stat.highlight ? 'text-white' : 'text-black'
                  }`}
                >
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="scroll-animate font-instrument text-4xl md:text-5xl lg:text-6xl text-black text-center mb-16">
            Come funziona
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <div key={index} className={`scroll-animate stagger-${index + 1} flex flex-col items-center gap-2 text-center`}>
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary">
                  <span className="font-inter font-bold text-primary">{step.number}</span>
                </div>
                <h3 className="font-bricolage font-bold text-3xl md:text-4xl text-primary leading-tight">
                  {step.title}
                </h3>
                <p className="font-inter text-base text-black leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="scroll-animate font-instrument text-4xl md:text-5xl lg:text-6xl text-black text-center mb-16">
            Non è l'ennesima app di bookmark
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className={`scroll-animate stagger-${(index % 3) + 1} flex flex-col items-start gap-2`}>
                <img src={feature.icon} alt="" className="w-6 h-6" />
                <h3 className="font-bricolage font-bold text-2xl text-black tracking-tight leading-tight">
                  {feature.title}
                </h3>
                <p className="font-inter text-base text-black leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-xl mx-auto">
          <div className="scroll-animate text-center mb-16">
            <p className="font-inter font-bold text-xs tracking-[4px] text-black mb-2">PREZZO</p>
            <h2 className="font-instrument text-4xl md:text-5xl lg:text-6xl text-black mb-2">
              Semplice come deve essere
            </h2>
            <p className="font-inter text-base text-black">
              Un prezzo solo. Tutto incluso. Per sempre.
            </p>
          </div>

          <div className="scroll-animate stagger-1 bg-white rounded-2xl border-[5px] border-primary p-8 shadow-lg max-w-[400px] mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="font-bricolage font-bold text-6xl md:text-7xl text-black">€ 12,99</span>
              <span className="font-bricolage font-bold text-sm text-black">/ anno</span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-8">
              <span className="font-inter text-xs text-black">1 caffè al mese</span>
              <img src="/images/coffee-1.svg" alt="" className="w-3 h-3" />
            </div>

            <ul className="space-y-3 mb-8">
              {pricingFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-4 pb-3 border-b border-muted last:border-0">
                  <img src="/images/circle-check-1-2.svg" alt="" className="w-6 h-6" />
                  <span className="font-inter text-xs text-black">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center gap-3">
              <a
                href="https://app.laterr.news/auth/signup"
                className="w-full flex items-center justify-center gap-2.5 px-6 py-5 bg-primary hover:bg-primary-hover rounded-full text-white font-semibold text-base transition-colors"
              >
                Prova gratis 14 giorni
                <img src="/images/Arrow-1.svg" alt="" className="w-8 h-3" />
              </a>
              <p className="font-inter text-xs text-muted text-center">
                Nessuna carta di credito richiesta per iniziare
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 md:px-16 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted text-base">
            <span>© 2026 Laterr, a brand of Roolees Srls</span>
            <span className="w-1 h-1 bg-muted rounded-full"></span>
            <span>P.I IT14131360969</span>
          </div>
          <nav className="flex items-center gap-2 text-muted text-base">
            <a href="https://app.laterr.news/privacy" className="hover:text-black transition-colors">Privacy</a>
            <span className="w-1 h-1 bg-muted rounded-full"></span>
            <a href="https://app.laterr.news/terms" className="hover:text-black transition-colors">Terms</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
