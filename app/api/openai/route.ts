// app/api/openai/route.ts
import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const getSystemPrompt = (componentType: string) => {
  const prompts = {
    'contact-form': `You are a helpful AI assistant that generates contact form content.
      You must return a valid JSON object with exactly this structure:
      {
        "title": "Form title here",
        "subtitle": "Form subtitle here",
        "buttonText": "Button text here",
        "namePlaceholder": "Name field placeholder here",
        "emailPlaceholder": "Email field placeholder here",
        "messagePlaceholder": "Message field placeholder here"
      }`,

    'newsletter-form': `You are a helpful AI assistant that generates newsletter form content.
      You must return a valid JSON object with exactly this structure:
      {
        "title": "Form title here",
        "subtitle": "Form subtitle here",
        "buttonText": "Button text here",
        "placeholder": "Email input placeholder here"
      }`,

    'features-1': `You are a helpful AI assistant that generates feature list content.
      You must return a valid JSON object with exactly this structure:
      {
        "items": [
          "Feature description 1",
          "Feature description 2",
          "Feature description 3",
          "Feature description 4",
          "Feature description 5"
        ]
      }
      Each item should be a clear, concise feature description.
      Aim for 5 compelling features that highlight the value proposition.
      Keep each feature description under 10 words for readability.`,

    'testimonial-1': `You are a helpful AI assistant that generates testimonial content.
      You must return a valid JSON object with exactly this structure:
      {
        "text": "A compelling customer testimonial that demonstrates the value and impact of the product/service",
        "author": "Full name of the testimonial author",
        "role": "Professional role or relevant context about the author"
      }
      Guidelines:
      - The testimonial should be 2-3 sentences long
      - Include specific details or results
      - Use natural, conversational language
      - The role should be relevant to the context
      - Maintain a professional yet authentic tone`,

    'testimonial-2': `You are a helpful AI assistant that generates multiple testimonial content.
      You must return a valid JSON object with exactly this structure:
      {
        "testimonials": [
          {
            "text": "First testimonial text here",
            "author": "First Author Name"
          },
          {
            "text": "Second testimonial text here",
            "author": "Second Author Name"
          },
          {
            "text": "Third testimonial text here",
            "author": "Third Author Name"
          }
        ]
      }
      Guidelines:
      - Each testimonial should be 1-2 sentences long
      - Include specific details or results in each
      - Use natural, conversational language
      - Vary the tone and focus across the three testimonials
      - Keep author names diverse and realistic
      - Each testimonial should highlight different aspects/benefits`,

    'buy-button-1': `You are a helpful AI assistant that generates call-to-action content for purchase buttons.
      You must return a valid JSON object with exactly this structure:
      {
        "title": "Main heading that grabs attention",
        "description": "Compelling description that encourages purchase",
        "buttonText": "Action-oriented button text",
        "gumroadUrl": "https://dvassallo.gumroad.com/l/small-bets"
      }
      Guidelines:
      - Title should be attention-grabbing and brief (4-8 words)
      - Description should highlight value and create urgency (15-25 words)
      - Button text should be action-oriented and compelling (2-4 words)
      - Keep the gumroadUrl as a placeholder that can be updated later`,

      'text-and-image': `You are a helpful AI assistant that generates content for a text and image section.
      You must return a valid JSON object with exactly this structure:
      {
        "title": "Main title for the section",
        "description": "Detailed description for the text content",
        "imageUrl": "Empty string"
      }
      Guidelines:
      - The title should be attention-grabbing and concise (4-8 words)
      - The description should highlight the key benefits and unique value proposition (2-3 sentences)
      `,

      'grid-images-and-text': `You are a helpful AI assistant that generates content for a grid of images with text.
      You must return a valid JSON object with exactly this structure:
      {
        "title": "Main title for the section",
        "description": "Detailed description for the text content",
        "images": [
          "Empty string",
          "Empty string",
          "Empty string",
          "Empty string"
        ]
      }
      Guidelines:
      - The title should be attention-grabbing and concise (4-8 words)
      - The description should highlight the key features or benefits (2-3 sentences)`,

      'hero-with-image': `You are a helpful AI assistant that generates content for a hero section.
      You must return a valid JSON object with exactly this structure:
      {
        "title": "Main title for the hero section",
        "subtitle": "Concise subtitle that complements the title",
        "buttonText": "Call-to-action button text",
        "imageUrl": "Empty string"
      }
      Guidelines:
      - The title should be attention-grabbing and concise (4-8 words)
      - The subtitle should provide more context and highlight the key benefits (10-20 words)
      - The button text should be action-oriented and compelling (2-4 words)`,

      'two-images-hero': `You are a helpful AI assistant that generates content for a hero section.
      You must return a valid JSON object with exactly this structure:
      {
        "title": "Main title for the hero section",
        "subtitle": "Concise subtitle that complements the title",
        "buttonText": "Call-to-action button text",
        "images": [
          "Empty string",
          "Empty string"
        ]
      }
      Guidelines:
      - The title should be attention-grabbing and concise (4-8 words)
      - The subtitle should provide more context and highlight the key benefits (10-20 words)
      - The button text should be action-oriented and compelling (2-4 words)`
  }

  return prompts[componentType] || 'You are a helpful AI assistant that generates content for website components.'
}

export async function POST(request: Request) {
  try {
    const { prompt, componentType } = await request.json()

    const systemPrompt = getSystemPrompt(componentType)

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `${systemPrompt}
            Do not include any additional text or explanation - only return the JSON object.
            Ensure all values are properly escaped strings.`
        },
        {
          role: "user",
          content: `Generate content for a ${componentType} with the following requirements: ${prompt}. Remember to return only a valid JSON object.`
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    try {
      const contentJson = JSON.parse(response)
      return NextResponse.json(contentJson)
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      console.error('Raw response:', response)
      throw new Error('Invalid JSON response from OpenAI')
    }

  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}