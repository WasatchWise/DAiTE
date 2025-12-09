'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Auth } from '../components/Auth'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [activeConnection, setActiveConnection] = useState(0)
  const [scrollY, setScrollY] = useState(0)

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

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const connectionTypes = [
    {
      id: 'musicians',
      icon: '🎵',
      title: 'Musicians',
      subtitle: 'Find your sound',
      description: 'Discover collaborators who hear music the way you do. From jam sessions to studio projects, find people who understand that the best music happens when egos leave the room.',
      gradient: 'from-amber-600 to-rose-600'
    },
    {
      id: 'parents',
      icon: '🌱',
      title: 'Parents',
      subtitle: 'Build your village',
      description: 'Connect with families who share your values and chaos. Playdates that actually work, friendships that understand why you cancelled, community that gets it.',
      gradient: 'from-emerald-600 to-teal-600'
    },
    {
      id: 'community',
      icon: '✨',
      title: 'Community',
      subtitle: 'Find your people',
      description: 'Whether it\'s a book club, hiking group, or creative collective—find gatherings where you belong and people who are genuinely glad you showed up.',
      gradient: 'from-violet-600 to-purple-600'
    },
    {
      id: 'connection',
      icon: '🌸',
      title: 'Connection',
      subtitle: 'Something more',
      description: 'When you\'re ready for deeper connection—friendship, romance, or something you can\'t quite name yet—let your CYRAiNO find the people worth embracing.',
      gradient: 'from-rose-600 to-pink-600'
    }
  ]

  const steps = [
    {
      number: '01',
      title: 'Create Your CYRAiNO',
      description: 'Share who you are—your values, quirks, what makes you laugh, what you\'re looking for. Your CYRAiNO becomes your advocate in the search for connection.'
    },
    {
      number: '02',
      title: 'Agents Converse',
      description: 'Your CYRAiNO talks with others, discovering compatibility through real dialogue. No algorithms. No swipes. Just genuine conversation about what matters.'
    },
    {
      number: '03',
      title: 'Discover & Embrace',
      description: 'When something resonates, you receive a narrative—not a match percentage, but a story about why this person might matter to you.'
    }
  ]

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
    <div className="min-h-screen bg-stone-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ 
          backgroundColor: scrollY > 50 ? 'rgba(12, 10, 9, 0.9)' : 'transparent',
          backdropFilter: scrollY > 50 ? 'blur(12px)' : 'none'
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌸</span>
            <span className="text-xl font-light tracking-tight">DAiTE</span>
          </Link>
          <div className="flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-stone-400 hover:text-white transition-colors hidden sm:block">
              How It Works
            </a>
            <a href="#connections" className="text-sm text-stone-400 hover:text-white transition-colors hidden sm:block">
              Connections
            </a>
            <button 
              onClick={() => setShowAuth(true)}
              className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-all"
            >
              Create CYRAiNO
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[128px] animate-pulse" 
            style={{ animationDuration: '8s' }} 
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[128px] animate-pulse"
            style={{ animationDuration: '10s', animationDelay: '1s' }} 
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] animate-pulse"
            style={{ animationDuration: '12s', animationDelay: '2s' }} 
          />
        </div>

        {/* Floating blossoms */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl opacity-20 animate-float-petal"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${6 + i}s`
              }}
            >
              🌸
            </div>
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-stone-400">AI-facilitated human connection</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight mb-6">
            Helping humans
            <span className="block bg-gradient-to-r from-rose-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
              embrace.
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-stone-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Create CYRAiNO—your personal AI companion that discovers meaningful connections through real conversation, not algorithms.
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
              className="px-8 py-4 text-stone-400 hover:text-white transition-colors flex items-center gap-2"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-600">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-stone-600 to-transparent" />
        </div>
      </section>

      {/* Philosophy Statement */}
      <section className="py-32 px-6 border-t border-stone-900">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-3xl sm:text-4xl md:text-5xl font-light text-stone-300 leading-relaxed">
            <span className="text-white">AI facilitates.</span>
            <br />
            <span className="text-rose-400">Humans connect.</span>
          </p>
          <p className="mt-8 text-lg text-stone-500 max-w-2xl mx-auto">
            CYRAiNO discovers compatibility through genuine dialogue—but real connections happen between you and other people, not profiles.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6 bg-stone-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-sm uppercase tracking-widest text-rose-400">The Process</span>
            <h2 className="text-4xl sm:text-5xl font-light mt-4">How DAiTE Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-stone-700 to-transparent" />
                )}
                
                <div className="p-8 rounded-3xl bg-stone-900/50 border border-stone-800 
                              hover:border-stone-700 transition-all duration-500
                              hover:transform hover:-translate-y-1">
                  <span className="text-5xl font-light text-stone-700 group-hover:text-rose-900 transition-colors">
                    {step.number}
                  </span>
                  <h3 className="text-2xl font-light mt-4 mb-3">{step.title}</h3>
                  <p className="text-stone-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connection Types */}
      <section id="connections" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-widest text-rose-400">Find Your People</span>
            <h2 className="text-4xl sm:text-5xl font-light mt-4">All Kinds of Connection</h2>
          </div>

          {/* Connection type selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {connectionTypes.map((type, i) => (
              <button
                key={type.id}
                onClick={() => setActiveConnection(i)}
                className={`
                  px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                  ${activeConnection === i 
                    ? 'bg-white text-stone-900' 
                    : 'bg-stone-900 text-stone-400 hover:bg-stone-800 hover:text-white'}
                `}
              >
                <span className="mr-2">{type.icon}</span>
                {type.title}
              </button>
            ))}
          </div>

          {/* Active connection display */}
          <div className="relative">
            {connectionTypes.map((type, i) => (
              <div
                key={type.id}
                className={`
                  transition-all duration-500
                  ${activeConnection === i 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'}
                `}
              >
                <div className={`
                  p-12 rounded-3xl bg-gradient-to-br ${type.gradient}
                  relative overflow-hidden
                `}>
                  {/* Background pattern */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                      backgroundSize: '32px 32px'
                    }} 
                  />
                  
                  <div className="relative max-w-2xl">
                    <span className="text-6xl mb-6 block">{type.icon}</span>
                    <h3 className="text-4xl font-light mb-2">{type.title}</h3>
                    <p className="text-xl text-white/80 mb-6">{type.subtitle}</p>
                    <p className="text-lg text-white/70 leading-relaxed">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CYRAiNO Feature */}
      <section className="py-32 px-6 bg-stone-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm uppercase tracking-widest text-amber-400">Your AI Companion</span>
              <h2 className="text-4xl sm:text-5xl font-light mt-4 mb-6">Meet CYRAiNO</h2>
              <p className="text-xl text-stone-400 leading-relaxed mb-8">
                Named for the poet who spoke love on behalf of others, your CYRAiNO learns who you are—your values, your humor, your non-negotiables—and advocates for you in conversations with other agents.
              </p>
              <ul className="space-y-4">
                {[
                  'Understands context, not just keywords',
                  'Finds compatibility through conversation',
                  'Explains why connections matter',
                  'Respects your boundaries always'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-stone-300">
                    <span className="text-rose-400 mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* CYRAiNO visual */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-stone-800 to-stone-900 
                            border border-stone-700 flex items-center justify-center relative overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                w-64 h-64 bg-rose-500/20 rounded-full blur-[80px]" />
                </div>
                
                {/* CYRAiNO representation */}
                <div className="relative text-center">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-rose-400 to-amber-400 
                                flex items-center justify-center text-6xl mb-6 shadow-2xl shadow-rose-500/30 relative overflow-hidden">
                    <Image 
                      src="/cyraino.png" 
                      alt="CYRAiNO" 
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-2xl font-light text-white">CYRAiNO</p>
                  <p className="text-stone-500 mt-1">Your connection advocate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6">
            Ready to find
            <span className="block text-rose-400">your people?</span>
          </h2>
          <p className="text-xl text-stone-400 max-w-2xl mx-auto mb-12">
            Whether you&apos;re seeking friendship, community, collaboration, or something more—let your CYRAiNO discover connections that actually matter.
          </p>
          <button 
            onClick={() => setShowAuth(true)}
            className="group px-10 py-5 bg-gradient-to-r from-rose-500 to-amber-500 
                     text-white rounded-full text-lg font-medium 
                     hover:from-rose-400 hover:to-amber-400 
                     transition-all duration-300 shadow-2xl shadow-rose-500/25
                     flex items-center gap-3 mx-auto"
          >
            Create Your CYRAiNO
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-stone-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌸</span>
            <span className="font-light">DAiTE</span>
            <span className="text-stone-600 ml-2">Helping humans embrace.</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-stone-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-sm text-stone-600">© 2025 DAiTE</p>
        </div>
      </footer>
    </div>
  )
}
