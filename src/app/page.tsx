'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslation } from '@/i18n'
import { LanguageSelector } from '@/components/LanguageSelector'

// Floating card data (decorative, not translated)
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

// Feature icons (same for all languages)
const featureIcons = [
  "/images/lock-open-1.svg",
  "/images/sparkles-2.svg",
  "/images/mailbox-1.svg",
  "/images/newspaper-1.svg",
  "/images/globe-lock-1.svg",
  "/images/earth-1.svg",
]

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const { t, tArray } = useTranslation()

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

  const statsData = [
    {
      image: "/images/UnionArticlesPileIllustration.svg",
      number: t('stats.articles.number'),
      description: t('stats.articles.description'),
      highlight: false,
    },
    {
      image: "/images/UnionClockIllustration.svg",
      number: t('stats.after.number'),
      description: t('stats.after.description'),
      highlight: true,
    },
    {
      image: "/images/UnionBrainIllustration.svg",
      number: t('stats.summaries.number'),
      description: t('stats.summaries.description'),
      highlight: false,
    },
  ]

  const steps = tArray('howItWorks.steps')
  const featureItems = tArray('features.items')
  const pricingFeatures = tArray('pricing.features')

  return (
    <div className="bg-background min-h-screen relative overflow-x-hidden">
      {/* Header - Fixed, transforms on scroll */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'top-0 md:top-4 left-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-[600px] md:max-w-[calc(100%-32px)] bg-white md:rounded-full shadow-lg px-4 md:pl-6 md:pr-4 py-3 md:py-4'
            : 'top-0 w-full px-4 md:px-8 lg:px-16 py-4 md:py-6 bg-background'
        }`}
      >
        <div className={`flex items-center justify-between ${scrolled ? '' : 'max-w-7xl mx-auto'}`}>
          <img
            src="/images/LaterrLogo.svg"
            alt="Laterr"
            className={`transition-all duration-300 ${scrolled ? 'h-6 md:h-7' : 'h-7 md:h-9'}`}
          />
          <nav className="flex items-center gap-4 md:gap-6">
            <a
              href="https://app.laterr.news/auth/login"
              className="hidden md:block font-inter text-black text-base hover:opacity-70 transition-opacity"
            >
              {t('header.login')}
            </a>
            <a
              href="https://app.laterr.news/auth/login"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 md:py-3 bg-primary hover:bg-primary-hover rounded-full text-white text-sm md:text-base transition-colors"
            >
              {t('header.cta')}
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-32 lg:pt-40 pb-16 md:pb-20 px-4">
        <div className="max-w-[66rem] mx-auto text-center relative">
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
            {t('hero.title1')}
          </h1>
          <h2 className="font-bricolage font-bold text-5xl md:text-7xl lg:text-[116px] text-primary tracking-tight leading-none mb-8">
            {t('hero.title2')}
          </h2>
          <p className="font-inter text-lg md:text-2xl text-black max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('hero.description')}
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-2">
            <a
              href="https://app.laterr.news/auth/login"
              className="inline-flex items-center gap-2.5 px-6 py-5 bg-primary hover:bg-primary-hover rounded-full text-white font-semibold text-base transition-colors"
            >
              {t('hero.cta')}
              <img src="/images/Arrow-1.svg" alt="" className="w-8 h-3" />
            </a>
            <p className="text-muted text-xs">{t('hero.trial')}</p>
          </div>

        </div>
      </section>

      {/* Product Preview Section */}
      <section className="py-6 md:py-10 px-0 md:px-4">
        <div className="max-w-[1300px] mx-auto">
          {/* Desktop */}
          <img
            src="/images/ProductPreview_D.png"
            alt="Laterr product preview"
            className="hidden md:block w-full scroll-animate"
          />
          {/* Mobile */}
          <img
            src="/images/ProductPreview_M.png"
            alt="Laterr product preview"
            className="block md:hidden w-[110%] max-w-none -ml-[5%] scroll-animate"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="scroll-animate font-instrument text-4xl md:text-5xl lg:text-6xl text-black text-center mb-16">
            {t('stats.sectionTitle')}
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
            {t('howItWorks.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step: any, index: number) => (
              <div key={index} className={`scroll-animate stagger-${index + 1} flex flex-col items-center gap-2 text-center`}>
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary">
                  <span className="font-inter font-bold text-primary">{index + 1}</span>
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
            {t('features.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featureItems.map((feature: any, index: number) => (
              <div key={index} className={`scroll-animate stagger-${(index % 3) + 1} flex flex-col items-start gap-2`}>
                <img src={featureIcons[index]} alt="" className="w-6 h-6" />
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
            <p className="font-inter font-bold text-xs tracking-[4px] text-black mb-2">{t('pricing.label')}</p>
            <h2 className="font-instrument text-4xl md:text-5xl lg:text-6xl text-black mb-2">
              {t('pricing.title')}
            </h2>
            <p className="font-inter text-base text-black">
              {t('pricing.subtitle')}
            </p>
          </div>

          <div className="scroll-animate stagger-1 bg-white rounded-2xl border-[5px] border-primary p-8 shadow-lg max-w-[400px] mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="font-bricolage font-bold text-6xl md:text-7xl text-black">{t('pricing.price')}</span>
              <span className="font-bricolage font-bold text-sm text-black">{t('pricing.period')}</span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-8">
              <span className="font-inter text-xs text-black">{t('pricing.tagline')}</span>
              <img src="/images/coffee-1.svg" alt="" className="w-3 h-3" />
            </div>

            <ul className="space-y-3 mb-8">
              {pricingFeatures.map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-4 pb-3 border-b border-muted last:border-0">
                  <img src="/images/circle-check-1-2.svg" alt="" className="w-6 h-6" />
                  <span className="font-inter text-xs text-black">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center gap-3">
              <a
                href="https://app.laterr.news/auth/login"
                className="w-full flex items-center justify-center gap-2.5 px-6 py-5 bg-primary hover:bg-primary-hover rounded-full text-white font-semibold text-base transition-colors"
              >
                {t('pricing.cta')}
                <img src="/images/Arrow-1.svg" alt="" className="w-8 h-3" />
              </a>
              <p className="font-inter text-xs text-muted text-center">
                {t('pricing.noCreditCard')}
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
            <a href="https://app.laterr.news/privacy" className="hover:text-black transition-colors">{t('footer.privacy')}</a>
            <span className="w-1 h-1 bg-muted rounded-full"></span>
            <a href="https://app.laterr.news/terms" className="hover:text-black transition-colors">{t('footer.terms')}</a>
            <span className="w-1 h-1 bg-muted rounded-full"></span>
            <LanguageSelector />
          </nav>
        </div>
      </footer>
    </div>
  )
}
