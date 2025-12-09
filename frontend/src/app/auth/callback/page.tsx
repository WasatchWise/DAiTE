'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (!supabase) {
        console.error('Supabase not configured')
        router.push('/?error=auth_not_configured')
        return
      }

      try {
        // Get the hash fragment from URL (contains tokens)
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        const error = hashParams.get('error')
        const errorDescription = hashParams.get('error_description')

        // Handle errors from URL
        if (error) {
          console.error('Auth callback error from URL:', error, errorDescription)
          router.push(`/?error=${encodeURIComponent(errorDescription || error)}`)
          return
        }

        // If we have tokens in the URL, set the session
        if (accessToken && refreshToken) {
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })

          if (sessionError) {
            console.error('Error setting session:', sessionError)
            router.push(`/?error=${encodeURIComponent(sessionError.message)}`)
            return
          }

          if (data.session) {
            // Successful authentication
            router.push('/dashboard')
            return
          }
        }

        // Try to get existing session
        const { data, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error('Error getting session:', sessionError)
          router.push(`/?error=${encodeURIComponent(sessionError.message)}`)
          return
        }

        if (data?.session) {
          // Successful authentication
          router.push('/dashboard')
        } else {
          // No session - might need to confirm email first
          router.push('/?error=Please confirm your email address first')
        }
      } catch (err: any) {
        console.error('Unexpected auth callback error:', err)
        router.push(`/?error=${encodeURIComponent(err.message || 'Authentication failed')}`)
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-stone-950 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-400 mx-auto mb-4"></div>
        <p className="text-stone-400">Completing authentication...</p>
      </div>
    </div>
  )
}

