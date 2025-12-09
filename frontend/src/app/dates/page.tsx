'use client'

import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Calendar, MapPin, Clock, Users, Sparkles } from 'lucide-react'

const mockDates = [
  {
    id: '1',
    matchName: 'Alex',
    title: 'Coffee & Conversation',
    description: 'A cozy morning chat at our favorite local cafe, discussing philosophy and life.',
    date: '2025-01-20',
    time: '10:00 AM',
    location: 'The Philosopher\'s Café, Downtown',
    status: 'planned',
    suggestedBy: 'CYRAiNO'
  },
  {
    id: '2',
    matchName: 'Jordan',
    title: 'Art Gallery Walk',
    description: 'Explore the local art scene and discover new perspectives together.',
    date: '2025-01-22',
    time: '2:00 PM',
    location: 'Metropolitan Art Gallery',
    status: 'pending',
    suggestedBy: 'You'
  },
]

const dateIdeas = [
  {
    title: 'Sunset Hiking Trail',
    description: 'Moderate difficulty, 2 hours, beautiful views',
    compatibility: 95
  },
  {
    title: 'Bookstore Browsing',
    description: 'Cozy afternoon discovering new reads together',
    compatibility: 92
  },
  {
    title: 'Cooking Class',
    description: 'Learn to make pasta from scratch, interactive and fun',
    compatibility: 88
  },
]

export default function DatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-safe mb-20 md:mb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Plan Your Dates
          </h1>
          <p className="text-slate-400">
            Let CYRAiNO help you plan meaningful experiences
          </p>
        </div>

        {/* Upcoming Dates */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Upcoming Dates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockDates.map((date) => (
              <Card key={date.id} hover>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{date.title}</CardTitle>
                      <p className="text-sm text-purple-400 mt-1">With {date.matchName}</p>
                    </div>
                    <Badge variant={date.status === 'planned' ? 'success' : 'warning'}>
                      {date.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-slate-300">{date.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-slate-400 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(date.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex items-center text-slate-400 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      {date.time}
                    </div>
                    <div className="flex items-center text-slate-400 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      {date.location}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <div className="text-xs text-slate-500">
                      Suggested by {date.suggestedBy}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm">
                        Edit
                      </Button>
                      <Button variant="primary" size="sm">
                        Confirm
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Date Suggestions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">AI Date Suggestions</h2>
            <Badge variant="info" className="flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              Powered by CYRAiNO
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dateIdeas.map((idea, index) => (
              <Card key={index} hover>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <CardTitle className="text-lg">{idea.title}</CardTitle>
                    <Badge variant="success">{idea.compatibility}%</Badge>
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-4">{idea.description}</p>
                  
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1">
                      Plan This Date
                    </Button>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

