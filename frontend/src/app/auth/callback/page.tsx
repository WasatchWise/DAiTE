'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (!supabase) {
        router.push('/?error=auth_not_configured')
        return
      }

      // Handle the OAuth callback
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Auth callback error:', error)
        router.push('/?error=auth_failed')
        return
      }

      if (data?.session) {
        // Successful authentication - redirect to dashboard
        router.push('/dashboard')
      } else {
        // No session - redirect to home
        router.push('/')
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

