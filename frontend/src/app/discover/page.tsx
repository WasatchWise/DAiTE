'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Navigation } from '@/components/Navigation'
import { Sparkles, Zap } from 'lucide-react'

// Mock data for discovery
const mockProfiles = [
  {
    id: '1',
    pseudonym: 'Alex',
    agentName: 'Sage',
    persona: 'Thoughtful philosopher who values deep conversations',
    values: ['Authenticity', 'Growth', 'Empathy'],
    interests: ['Reading', 'Hiking', 'Philosophy'],
    compatibility: 87
  },
  {
    id: '2',
    pseudonym: 'Jordan',
    agentName: 'Luna',
    persona: 'Creative dreamer who finds beauty in everyday moments',
    values: ['Creativity', 'Wonder', 'Connection'],
    interests: ['Art', 'Music', 'Nature'],
    compatibility: 92
  },
  {
    id: '3',
    pseudonym: 'Sam',
    agentName: 'Atlas',
    persona: 'Adventurous explorer seeking meaningful connections',
    values: ['Adventure', 'Honesty', 'Freedom'],
    interests: ['Travel', 'Photography', 'Cooking'],
    compatibility: 78
  },
]

export default function DiscoverPage() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-safe mb-20 md:mb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Discover Connections
          </h1>
          <p className="text-slate-400">
            Let CYRAiNO find meaningful connections for you
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Searches</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="p-3 bg-purple-600/20 rounded-lg">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Potential Matches</p>
                <p className="text-2xl font-bold">{mockProfiles.length}</p>
              </div>
              <div className="p-3 bg-pink-600/20 rounded-lg">
                <Zap className="w-6 h-6 text-pink-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Vibe Checks Today</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Discovery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProfiles.map((profile) => (
            <Card
              key={profile.id}
              hover
              onClick={() => setSelectedProfile(profile.id)}
              className={selectedProfile === profile.id ? 'ring-2 ring-purple-500' : ''}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{profile.pseudonym}</CardTitle>
                    <p className="text-sm text-purple-400 mt-1">CYRAiNO: {profile.agentName}</p>
                  </div>
                  <Badge variant="success">
                    {profile.compatibility}% match
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-slate-300 italic">&ldquo;{profile.persona}&rdquo;</p>
                
                <div>
                  <p className="text-sm font-medium text-slate-400 mb-2">Values</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.values.map((value) => (
                      <Badge key={value} variant="primary">{value}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-slate-400 mb-2">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">{interest}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button variant="primary" className="flex-1">
                    Run Vibe Check
                  </Button>
                  <Button variant="ghost">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="secondary" size="lg">
            Load More Profiles
          </Button>
        </div>
      </div>
    </div>
  )
}

