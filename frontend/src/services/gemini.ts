import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY

if (!apiKey) {
  console.warn('Gemini API key not set. AI features will be unavailable.')
}

export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

export const model = genAI ? genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' }) : null

/**
 * Simulate a conversation between two CYRAiNO agents
 */
export interface AgentProfile {
  name: string
  persona: string
  values: string[]
  interests: string[]
  communicationStyle: string
}

export interface AgentConversation {
  transcript: string
  summary: string
  compatibilityScore: number
  matchDecision: 'YES' | 'NO'
  narrative?: string
}

export async function simulateAgentDialogue(
  agentA: AgentProfile,
  agentB: AgentProfile
): Promise<AgentConversation | { error: string }> {
  if (!model) {
    return { error: 'Gemini API not configured' }
  }

  const prompt = `
You are facilitating a "vibe check" conversation between two users' personal CYRAiNO agents.

Agent A (${agentA.name}):
- Persona: ${agentA.persona}
- Values: ${agentA.values.join(', ')}
- Interests: ${agentA.interests.join(', ')}
- Communication Style: ${agentA.communicationStyle}

Agent B (${agentB.name}):
- Persona: ${agentB.persona}
- Values: ${agentB.values.join(', ')}
- Interests: ${agentB.interests.join(', ')}
- Communication Style: ${agentB.communicationStyle}

Instructions:
1. Simulate a natural, insightful conversation (3-5 exchanges each, 6-10 lines total) between these two CYRAiNO agents discussing their humans' compatibility.
2. Provide a brief summary of their interaction and perceived compatibility.
3. Provide a compatibilityScore (0-100).
4. Provide a matchDecision ("YES" or "NO").
5. If matchDecision is "YES", provide a beautiful, poetic narrative (2-3 sentences) explaining why these two humans would connect. This should give readers "chills" - be specific, warm, and insightful.

Format as JSON:
{
  "transcript": "Agent A: ...\\nAgent B: ...",
  "summary": "...",
  "compatibilityScore": 85,
  "matchDecision": "YES",
  "narrative": "Your beautiful explanation here..."
}
`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Extract JSON from markdown code blocks if present
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/)
    const jsonText = jsonMatch ? jsonMatch[1] : text
    
    const parsed = JSON.parse(jsonText.trim())
    
    return {
      transcript: parsed.transcript || '',
      summary: parsed.summary || '',
      compatibilityScore: parsed.compatibilityScore || 0,
      matchDecision: parsed.matchDecision || 'NO',
      narrative: parsed.narrative,
    }
  } catch (error) {
    console.error('Error in agent dialogue:', error)
    return { error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

