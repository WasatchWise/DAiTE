'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'
import { 
  Heart, 
  MessageCircle, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  Zap,
  ArrowRight,
  Activity
} from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [agent, setAgent] = useState<any>(null)
  const [stats, setStats] = useState({
    matches: 0,
    messages: 0,
    upcomingDates: 0,
    compatibility: 0
  })

  useEffect(() => {
    if (supabase) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        setUser(user)
        // TODO: Fetch agent and stats from database
        setAgent({ name: 'CY-Sarah' }) // Mock data
        setStats({
          matches: 3,
          messages: 12,
          upcomingDates: 2,
          compatibility: 87
        })
      })
    }
  }, [])

  const quickActions = [
    { 
      title: 'Discover Connections', 
      description: 'Find new people to connect with',
      href: '/discover',
      icon: Sparkles,
      color: 'from-purple-600 to-purple-700'
    },
    { 
      title: 'View Connections', 
      description: 'See your meaningful connections',
      href: '/matches',
      icon: Heart,
      color: 'from-pink-600 to-pink-700'
    },
    { 
      title: 'Messages', 
      description: 'Continue conversations',
      href: '/messages',
      icon: MessageCircle,
      color: 'from-blue-600 to-blue-700'
    },
    { 
      title: 'Plan Gathering', 
      description: 'Schedule playdates, meetups, events',
      href: '/dates',
      icon: Calendar,
      color: 'from-green-600 to-green-700'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-safe mb-20 md:mb-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}
          </h1>
          <p className="text-slate-400">
            Your CYRAiNO: <span className="text-purple-400 font-semibold">{agent?.name || 'Not created yet'}</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Total Connections</p>
                  <p className="text-3xl font-bold">{stats.matches}</p>
                  <p className="text-xs text-green-400 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2 this week
                  </p>
                </div>
                <div className="p-3 bg-pink-600/20 rounded-lg">
                  <Heart className="w-6 h-6 text-pink-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Messages</p>
                  <p className="text-3xl font-bold">{stats.messages}</p>
                  <p className="text-xs text-blue-400 mt-1 flex items-center">
                    <Activity className="w-3 h-3 mr-1" />
                    Active conversations
                  </p>
                </div>
                <div className="p-3 bg-blue-600/20 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Upcoming Dates</p>
                  <p className="text-3xl font-bold">{stats.upcomingDates}</p>
                  <p className="text-xs text-green-400 mt-1">This week</p>
                </div>
                <div className="p-3 bg-green-600/20 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Avg. Compatibility</p>
                  <p className="text-3xl font-bold">{stats.compatibility}%</p>
                  <p className="text-xs text-purple-400 mt-1">Very high</p>
                </div>
                <div className="p-3 bg-purple-600/20 rounded-lg">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.title} href={action.href}>
                  <Card hover className="h-full">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg mb-2">{action.title}</CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                      <div className="mt-4 flex items-center text-purple-400 text-sm font-medium">
                        Go <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Connections</CardTitle>
              <CardDescription>Your latest meaningful connections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <span className="text-sm font-bold">A</span>
                    </div>
                    <div>
                      <p className="font-medium">Alex</p>
                      <p className="text-xs text-slate-400">92% compatibility</p>
                    </div>
                  </div>
                  <Badge variant="success">Mutual</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                      <span className="text-sm font-bold">J</span>
                    </div>
                    <div>
                      <p className="font-medium">Jordan</p>
                      <p className="text-xs text-slate-400">87% compatibility</p>
                    </div>
                  </div>
                  <Badge variant="success">Mutual</Badge>
                </div>
              </div>
              
              <Link href="/matches">
                <Button variant="ghost" className="w-full mt-4">
                  View All Connections
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your CYRAiNO</CardTitle>
              <CardDescription>Agent profile and status</CardDescription>
            </CardHeader>
            <CardContent>
              {agent ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-6 border border-purple-500/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{agent.name}</h3>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <p className="text-slate-300 mb-4">
                      Your personal AI companion is ready to help you find meaningful connections—friendship, community, playdates, music partners, and more.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm">
                        Edit Profile
                      </Button>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <p className="text-xs text-slate-400 mb-1">Conversations</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <p className="text-xs text-slate-400 mb-1">Matches Found</p>
                      <p className="text-2xl font-bold">{stats.matches}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-400 mb-4">No CYRAiNO created yet</p>
                  <Button variant="primary">Create Your CYRAiNO</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

