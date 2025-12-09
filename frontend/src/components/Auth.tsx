import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) {
      setMessage('Error: Supabase not configured. Please check environment variables.')
      return
    }

    setLoading(true)
    setMessage('')

    // Get the redirect URL - ensure it's HTTPS
    let siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    if (!siteUrl && typeof window !== 'undefined') {
      siteUrl = window.location.origin
      // Force HTTPS in production
      if (siteUrl.includes('daiteapp.com') && !siteUrl.startsWith('https://')) {
        siteUrl = siteUrl.replace('http://', 'https://')
      }
    }
    if (!siteUrl) {
      siteUrl = 'https://www.daiteapp.com'
    }
    // Ensure HTTPS
    if (!siteUrl.startsWith('https://')) {
      siteUrl = siteUrl.replace('http://', 'https://')
    }
    const redirectTo = `${siteUrl}/auth/callback`

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            emailRedirectTo: redirectTo,
          },
        })
        
        if (error) {
          console.error('Sign up error:', error)
          throw error
        }
        
        // Check if email confirmation is required
        if (data.user && !data.session) {
          setMessage('Success! Please check your email and click the confirmation link to complete sign up.')
        } else if (data.session) {
          setMessage('Account created successfully! Redirecting...')
          // Redirect to dashboard if session exists (auto-confirmed)
          setTimeout(() => {
            window.location.href = '/dashboard'
          }, 1000)
        } else {
          setMessage('Check your email for the confirmation link!')
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        })
        
        if (error) {
          console.error('Sign in error:', error)
          // Provide more helpful error messages
          if (error.message.includes('Invalid login')) {
            throw new Error('Invalid email or password. Please check your credentials.')
          } else if (error.message.includes('Email not confirmed')) {
            throw new Error('Please check your email and click the confirmation link before signing in.')
          }
          throw error
        }
        
        setMessage('Signed in successfully! Redirecting...')
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 1000)
      }
    } catch (error: any) {
      console.error('Auth error:', error)
      const errorMessage = error.message || 'An error occurred'
      setMessage(`Error: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-slate-800/50 rounded-lg p-8 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isSignUp ? 'Create Account' : 'Welcome Back'}
      </h2>
      
      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="you@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="••••••••"
          />
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm ${
            message.includes('error') || message.includes('Error')
              ? 'bg-red-500/20 text-red-300'
              : 'bg-green-500/20 text-green-300'
          }`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm text-purple-400 hover:text-purple-300"
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  )
}

