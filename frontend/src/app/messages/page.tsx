'use client'

import { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Send, Search } from 'lucide-react'

const mockConversations = [
  {
    id: '1',
    pseudonym: 'Alex',
    lastMessage: 'That sounds amazing! I&apos;d love to hear more about your philosophy on...',
    timestamp: '2h ago',
    unread: 2
  },
  {
    id: '2',
    pseudonym: 'Jordan',
    lastMessage: 'Your CYRAiNO really captured something special about you.',
    timestamp: '5h ago',
    unread: 0
  },
  {
    id: '3',
    pseudonym: 'Sam',
    lastMessage: 'When are you free this week?',
    timestamp: '1d ago',
    unread: 1
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1')
  const [message, setMessage] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-safe mb-20 md:mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)] min-h-[600px]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <CardContent className="p-4 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className="w-full pl-10 pr-4 py-2 bg-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    />
                  </div>
                </div>
              </CardContent>
              
              <div className="flex-1 overflow-y-auto">
                {mockConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`
                      p-4 border-b border-slate-700 cursor-pointer transition-colors
                      ${selectedConversation === conv.id ? 'bg-purple-600/20' : 'hover:bg-slate-700/30'}
                    `}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                          <span className="text-sm font-bold">{conv.pseudonym[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium">{conv.pseudonym}</p>
                          <p className="text-xs text-slate-400">{conv.timestamp}</p>
                        </div>
                      </div>
                      {conv.unread > 0 && (
                        <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-2 ml-13">
                      {conv.lastMessage}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <CardContent className="p-4 border-b border-slate-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                          <span className="text-sm font-bold">
                            {mockConversations.find(c => c.id === selectedConversation)?.pseudonym[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">
                            {mockConversations.find(c => c.id === selectedConversation)?.pseudonym || ''}
                          </p>
                          <p className="text-xs text-slate-400">Active now</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="flex justify-start">
                      <div className="max-w-[70%] bg-slate-700 rounded-lg p-3">
                        <p className="text-sm">Hey! I loved reading your CYRAiNO&apos;s narrative about our match. It really resonated with me.</p>
                        <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="max-w-[70%] bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-3">
                        <p className="text-sm">Thank you! I felt the same way. There's something special about how our agents connected.</p>
                        <p className="text-xs text-purple-200 mt-1">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-start">
                      <div className="max-w-[70%] bg-slate-700 rounded-lg p-3">
                        <p className="text-sm">That sounds amazing! I&apos;d love to hear more about your philosophy on authenticity.</p>
                        <p className="text-xs text-slate-400 mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <CardContent className="p-4 border-t border-slate-700">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 bg-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && message.trim()) {
                            // Handle send
                            setMessage('')
                          }
                        }}
                      />
                      <Button
                        variant="primary"
                        onClick={() => {
                          if (message.trim()) {
                            // Handle send
                            setMessage('')
                          }
                        }}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <p className="text-slate-400 mb-4">Select a conversation to start messaging</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

