'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Navigation } from '@/components/Navigation'
import { Heart, MessageCircle, Calendar, Star } from 'lucide-react'

// Mock matches data
const mockMatches = [
  {
    id: '1',
    pseudonym: 'Alex',
    agentName: 'Sage',
    narrative: 'In the quiet spaces between words, there&apos;s a resonance—two souls who understand that depth isn&apos;t about complexity, but about the courage to be authentically seen.',
    compatibility: 92,
    status: 'mutual',
    lastActivity: '2 hours ago',
    sharedValues: ['Authenticity', 'Growth', 'Empathy'],
    matchDate: '2025-01-15'
  },
  {
    id: '2',
    pseudonym: 'Jordan',
    agentName: 'Luna',
    narrative: 'Like two artists painting different canvases, they create beauty in parallel—where creativity meets wonder, and conversations become journeys.',
    compatibility: 87,
    status: 'mutual',
    lastActivity: '5 hours ago',
    sharedValues: ['Creativity', 'Wonder', 'Connection'],
    matchDate: '2025-01-14'
  },
  {
    id: '3',
    pseudonym: 'Sam',
    agentName: 'Atlas',
    narrative: 'Adventure calls to both, but it\'s the shared compass—honesty, freedom, authentic connection—that points toward something meaningful.',
    compatibility: 78,
    status: 'pending',
    lastActivity: '1 day ago',
    sharedValues: ['Adventure', 'Honesty'],
    matchDate: '2025-01-13'
  },
]

export default function MatchesPage() {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-safe mb-20 md:mb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Connections
          </h1>
          <p className="text-slate-400">
            Meaningful connections discovered through CYRAiNO conversations
          </p>
        </div>

        {/* Match Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Matches</p>
                <p className="text-3xl font-bold">{mockMatches.length}</p>
              </div>
              <Heart className="w-8 h-8 text-pink-400" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Mutual Matches</p>
                <p className="text-3xl font-bold">
                  {mockMatches.filter(m => m.status === 'mutual').length}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg. Compatibility</p>
                <p className="text-3xl font-bold">
                  {Math.round(mockMatches.reduce((acc, m) => acc + m.compatibility, 0) / mockMatches.length)}%
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
            </CardContent>
          </Card>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockMatches.map((match) => (
            <Card
              key={match.id}
              hover
              onClick={() => setSelectedMatch(match.id)}
              className={selectedMatch === match.id ? 'ring-2 ring-purple-500' : ''}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{match.pseudonym}</CardTitle>
                    <p className="text-sm text-purple-400 mt-1">Matched with {match.agentName}</p>
                    <p className="text-xs text-slate-500 mt-1">{match.lastActivity}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {match.compatibility}%
                    </div>
                    <Badge variant={match.status === 'mutual' ? 'success' : 'warning'} className="mt-2">
                      {match.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Poetic Narrative */}
                <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-lg p-4 border border-purple-500/20">
                  <p className="text-slate-200 italic leading-relaxed">
                    &ldquo;{match.narrative}&rdquo;
                  </p>
                </div>
                
                {/* Shared Values */}
                <div>
                  <p className="text-sm font-medium text-slate-400 mb-2">Shared Values</p>
                  <div className="flex flex-wrap gap-2">
                    {match.sharedValues.map((value) => (
                      <Badge key={value} variant="primary">{value}</Badge>
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-slate-700">
                  <Button variant="primary" className="flex-1" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Plan Date
                  </Button>
                  <Button variant="ghost" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

