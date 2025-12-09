'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Auth } from '../components/Auth'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setUser(session.user)
          window.location.href = '/dashboard'
        }
      })
    }
  }, [])

  const daiteTypes = [
    { prefix: 'Play', color: 'from-emerald-400 to-teal-400', description: 'Playdates & family connections' },
    { prefix: 'Jam', color: 'from-amber-400 to-orange-400', description: 'Music sessions & collaborations' },
    { prefix: 'Mate', color: 'from-rose-400 to-pink-400', description: 'Friendships that last' },
    { prefix: 'Create', color: 'from-violet-400 to-purple-400', description: 'Creative collaborators' },
    { prefix: 'Sweat', color: 'from-red-400 to-orange-400', description: 'Fitness & adventure partners' },
    { prefix: 'Trail', color: 'from-green-400 to-emerald-400', description: 'Hiking & outdoor adventures' },
    { prefix: 'Taste', color: 'from-yellow-400 to-amber-400', description: 'Foodies & culinary explorers' },
    { prefix: 'Game', color: 'from-blue-400 to-indigo-400', description: 'Gaming & board game nights' },
    { prefix: 'Soul', color: 'from-pink-400 to-rose-400', description: 'Deeper connections' },
    { prefix: 'Read', color: 'from-cyan-400 to-blue-400', description: 'Book clubs & literary minds' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % daiteTypes.length)
        setIsAnimating(false)
      }, 200)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const currentType = daiteTypes[currentIndex]

  if (showAuth) {
    return (
      <div className="min-h-screen bg-stone-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAuth(false)}
              className="text-stone-400 hover:text-white mb-4"
            >
              ← Back
            </button>
            <div className="flex items-center justify-center mb-4">
              <Image 
                src="/cyraino.png" 
                alt="CYRAiNO" 
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover mr-4 ring-4 ring-rose-500/30"
              />
              <h1 className="text-5xl font-light tracking-tight">DAiTE</h1>
            </div>
            <p className="text-stone-400">Your Personal CYRAiNO</p>
          </div>
          <Auth />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-950/80 backdrop-blur-xl border-b border-stone-900">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌸</span>
            <span className="text-xl font-light tracking-tight">DAiTE</span>
          </Link>
          <button 
            onClick={() => setShowAuth(true)}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-all"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero with rotating DAiTE types */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className={`absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-1000 bg-gradient-to-r ${currentType.color} opacity-20`} 
          />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* CYRAiNO Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <Image 
                src="/cyraino.png" 
                alt="CYRAiNO" 
                width={100}
                height={100}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-rose-500/20 shadow-2xl shadow-rose-500/10"
              />
            </div>
          </div>

          {/* Rotating DAiTE type */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center h-24 overflow-hidden">
              <div 
                className={`
                  transition-all duration-200 ease-out
                  ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
                `}
              >
                <span className="text-6xl sm:text-7xl md:text-8xl font-light tracking-tight">
                  <span className={`bg-gradient-to-r ${currentType.color} bg-clip-text text-transparent`}>
                    {currentType.prefix}
                  </span>
                  <span className="text-white">DAiTE</span>
                </span>
              </div>
            </div>
            
            {/* Description that changes with type */}
            <p 
              className={`
                text-lg text-stone-400 mt-4 transition-all duration-200
                ${isAnimating ? 'opacity-0' : 'opacity-100'}
              `}
            >
              {currentType.description}
            </p>
          </div>

          {/* Main tagline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-stone-300 mb-6 leading-relaxed">
            Helping humans
            <span className="block text-white">embrace.</span>
          </h1>
          
          <p className="text-xl text-stone-500 font-light max-w-2xl mx-auto mb-12">
            Your CYRAiNO discovers meaningful connections through real conversation—not algorithms, not swipes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setShowAuth(true)}
              className="group px-8 py-4 bg-white text-stone-900 rounded-full font-medium 
                       hover:bg-rose-100 transition-all duration-300 flex items-center gap-3"
            >
              Create Your CYRAiNO
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <a 
              href="#how-it-works" 
              className="px-8 py-4 text-stone-400 hover:text-white transition-colors"
            >
              See how it works
            </a>
          </div>

          {/* Type indicator dots */}
          <div className="flex items-center justify-center gap-2 mt-16">
            {daiteTypes.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAnimating(true)
                  setTimeout(() => {
                    setCurrentIndex(i)
                    setIsAnimating(false)
                  }, 200)
                }}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${i === currentIndex 
                    ? 'bg-white w-6' 
                    : 'bg-stone-700 hover:bg-stone-500'}
                `}
                aria-label={`Switch to ${daiteTypes[i].prefix}DAiTE`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All DAiTE Types Grid */}
      <section className="py-24 px-6 border-t border-stone-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-widest text-rose-400">Find Your People</span>
            <h2 className="text-4xl font-light mt-4">Every Kind of DAiTE</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {daiteTypes.map((type, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAnimating(true)
                  setTimeout(() => {
                    setCurrentIndex(i)
                    setIsAnimating(false)
                  }, 200)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="group p-6 rounded-2xl bg-stone-900/50 border border-stone-800 
                         hover:border-stone-600 transition-all duration-300 text-left
                         hover:transform hover:-translate-y-1"
              >
                <span className={`text-2xl font-light bg-gradient-to-r ${type.color} bg-clip-text text-transparent`}>
                  {type.prefix}
                </span>
                <span className="text-2xl font-light text-stone-600">DAiTE</span>
                <p className="text-xs text-stone-500 mt-2">{type.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-stone-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-widest text-rose-400">The Process</span>
            <h2 className="text-4xl font-light mt-4">How DAiTE Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Create Your CYRAiNO',
                description: 'Share who you are—values, quirks, what you\'re looking for. Your CYRAiNO becomes your advocate.'
              },
              {
                number: '02',
                title: 'Agents Converse',
                description: 'Your CYRAiNO talks with others, finding compatibility through genuine dialogue.'
              },
              {
                number: '03',
                title: 'Discover & Embrace',
                description: 'When something resonates, you get a story—not a percentage—about why this person matters.'
              }
            ].map((step, i) => (
              <div key={i} className="p-8 rounded-3xl bg-stone-900/50 border border-stone-800">
                <span className="text-4xl font-light text-stone-700">{step.number}</span>
                <h3 className="text-xl font-light mt-4 mb-3">{step.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-4xl sm:text-5xl font-light leading-relaxed">
            <span className="text-white">AI facilitates.</span>
            <br />
            <span className="text-rose-400">Humans connect.</span>
          </p>
          <p className="mt-8 text-lg text-stone-500 max-w-2xl mx-auto">
            CYRAiNO discovers compatibility—but real connections happen between you and other people.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-b from-stone-950 to-stone-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-light mb-6">
            Ready for your first
            <span className={`block bg-gradient-to-r ${daiteTypes[currentIndex].color} bg-clip-text text-transparent`}>
              {daiteTypes[currentIndex].prefix}DAiTE?
            </span>
          </h2>
          <button 
            onClick={() => setShowAuth(true)}
            className="mt-8 px-10 py-5 bg-gradient-to-r from-rose-500 to-amber-500 
                     text-white rounded-full text-lg font-medium 
                     hover:from-rose-400 hover:to-amber-400 transition-all 
                     shadow-xl shadow-rose-500/25"
          >
            Create Your CYRAiNO →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-stone-900">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500">
          <div className="flex items-center gap-2">
            <span>🌸</span>
            <span className="font-light">DAiTE</span>
            <span className="text-stone-600">· Helping humans embrace.</span>
          </div>
          <p>© 2025 DAiTE</p>
        </div>
      </footer>
    </div>
  )
}
