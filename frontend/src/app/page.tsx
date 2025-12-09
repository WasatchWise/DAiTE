'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Auth } from '../components/Auth'
import { Button } from '../components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Heart, MessageCircle, Zap } from 'lucide-react'
import { AITransparency } from '../components/AITransparency'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [showAuth, setShowAuth] = useState(false)

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

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAuth(false)}
              className="text-slate-400 hover:text-white mb-4"
            >
              ← Back
            </button>
            <div className="flex items-center justify-center mb-4">
              <Image 
                src="/cyraino.png" 
                alt="CYRAiNO" 
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                DAiTE
              </h1>
            </div>
            <p className="text-slate-300">Your Personal CYRAiNO</p>
          </div>
          <Auth />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Cherry Blossom Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl" />
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-300/10 rounded-full blur-xl animate-pulse delay-300" />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-pink-400/10 rounded-full blur-lg animate-pulse delay-700" />
        {/* Floating Cherry Blossom Petals */}
        <div className="absolute top-1/4 left-1/4 text-3xl opacity-20 animate-float-petal">🌸</div>
        <div className="absolute top-1/3 right-1/4 text-2xl opacity-15 animate-float-petal delay-300">🌸</div>
        <div className="absolute bottom-1/3 left-1/3 text-2xl opacity-20 animate-float-petal delay-700">🌸</div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            {/* CYRAiNO Logo - Prominently Displayed */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <Image 
                  src="/cyraino.png" 
                  alt="CYRAiNO" 
                  width={120}
                  height={120}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-pink-300/30 shadow-2xl shadow-pink-500/20"
                />
                {/* Cherry Blossom Petal Decorations */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-pink-300/40 rounded-full blur-sm animate-pulse" />
                <div className="absolute -top-1 -right-3 w-3 h-3 bg-purple-300/40 rounded-full blur-sm animate-pulse delay-300" />
                <div className="absolute -bottom-2 -left-1 w-3 h-3 bg-pink-400/40 rounded-full blur-sm animate-pulse delay-700" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 px-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Helping humans embrace.
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto px-4">
              Create <span className="text-purple-400 font-semibold">CYRAiNO</span>—your personal AI companion that discovers meaningful connections. If you&apos;re seeking playdates, music partners, community, or friendships, CYRAiNO helps you find the people who get you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowAuth(true)}
                className="text-lg px-8 py-4"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Link href="#how-it-works">
                <Button variant="ghost" size="lg" className="text-lg px-8 py-4">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How DAiTE Works</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A different approach to finding meaningful connections—all kinds of connections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center relative">
            {/* Cherry Blossom Petal Decoration */}
            <div className="absolute -top-2 right-4 text-2xl opacity-30 animate-pulse">🌸</div>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/30">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">1. Create Your CYRAiNO</h3>
            <p className="text-slate-400">
              Build your personal AI companion by sharing who you are—your values, interests, and what you&apos;re looking for. Whether it&apos;s friendship, community, or connection.
            </p>
          </div>

          <div className="text-center relative">
            {/* Cherry Blossom Petal Decoration */}
            <div className="absolute -top-2 left-4 text-2xl opacity-30 animate-pulse delay-300">🌸</div>
            <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">2. Agents Have Conversations</h3>
            <p className="text-slate-400">
              Your CYRAiNO talks with other agents, discovering compatibility through real dialogue. AI facilitates the discovery—but the connections are between real humans, not algorithms.
            </p>
          </div>

          <div className="text-center relative">
            {/* Cherry Blossom Petal Decoration */}
            <div className="absolute -top-2 right-4 text-2xl opacity-30 animate-pulse delay-700">🌸</div>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/30">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">3. Discover Connections</h3>
            <p className="text-slate-400">
              When connections resonate, you get a beautiful narrative explaining why this person matters. From playdates to music sessions, community events to deep friendships.
            </p>
          </div>
        </div>

        {/* Connection Types */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">Find Your People</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <p className="text-purple-400 font-semibold">Parents</p>
              <p className="text-sm text-slate-400">Playdates & community</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <p className="text-pink-400 font-semibold">Musicians</p>
              <p className="text-sm text-slate-400">Jam sessions & collaboration</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <p className="text-purple-400 font-semibold">Community</p>
              <p className="text-sm text-slate-400">Events & gatherings</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <p className="text-pink-400 font-semibold">Connection</p>
              <p className="text-sm text-slate-400">Friendship & more</p>
            </div>
          </div>
          
          {/* AI Transparency */}
          <div className="max-w-2xl mx-auto mt-8">
            <AITransparency variant="compact" />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">
            Ready to find your people?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join DAiTE and discover connections that matter—whether you&apos;re seeking friendship, community, playdates, or something more. Helping humans embrace, one connection at a time.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowAuth(true)}
            className="text-lg px-8 py-4"
          >
            Create Your CYRAiNO
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-slate-400">
            <p>© 2025 DAiTE. Helping humans embrace.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

