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
You are facilitating a "vibe check" conversation between two users' personal CYRAiNO agents. DAiTE is a social connection platform for all kinds of relationships: friendship, community, playdates, music collaboration, support groups, and romantic connections. The goal is helping humans embrace meaningful connections of all types.

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
1. Simulate a natural, insightful conversation (3-5 exchanges each, 6-10 lines total) between these two CYRAiNO agents discussing their humans' potential for connection. This could be friendship, community, collaboration, playdates, support, or romantic—whatever makes sense.

2. Provide a brief summary of their interaction and perceived compatibility.

3. Provide a compatibilityScore (0-100).

4. Provide a matchDecision ("YES" or "NO").

5. If matchDecision is "YES", provide a narrative that combines:
   - **Emotional resonance (System 1)**: A beautiful, poetic explanation (2-3 sentences) that gives readers "chills" - specific, warm, and insightful about the type of connection and why it matters. Frame it to trigger emotional recognition: "This person gets you" or "This connection aligns with who you are."
   - **Rational justification (System 2)**: Include 2-3 concrete, shareable reasons that help justify the connection. Focus on specific shared values, compatible lifestyles, mutual interests, or identity alignment (e.g., "Both are parents who see themselves as community builders" or "Both musicians seeking authentic collaboration"). These reasons should help the user explain to themselves and others why this connection makes sense.

The narrative should address identity alignment (Self-Congruity Theory) - how this connection reflects their actual self, ideal self, or social self. Use framing that helps users see what they might miss by not connecting (loss aversion), while celebrating what they gain (positive framing).

Format as JSON:
{
  "transcript": "Agent A: ...\\nAgent B: ...",
  "summary": "...",
  "compatibilityScore": 85,
  "matchDecision": "YES",
  "narrative": "Your combined emotional + rational explanation here. First paragraph: poetic, emotional resonance. Second paragraph: concrete justification points that help validate the connection choice."
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

