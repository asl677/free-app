import { NextResponse } from 'next/server'

// Companies and their job boards for fetching real positions
const companySources = [
  { name: 'Linear', board: 'lever', slug: 'linear' },
  { name: 'Stripe', board: 'lever', slug: 'stripe' },
  { name: 'Notion', board: 'lever', slug: 'notion' },
  { name: 'Figma', board: 'greenhouse', slug: 'figma' },
  { name: 'Vercel', board: 'lever', slug: 'vercel' },
  { name: 'OpenAI', board: 'workable', slug: 'openai' },
  { name: 'Anthropic', board: 'lever', slug: 'anthropic' },
  { name: 'Discord', board: 'lever', slug: 'discord' },
  { name: 'Airbnb', board: 'greenhouse', slug: 'airbnb' },
  { name: 'Spotify', board: 'greenhouse', slug: 'spotify' },
  { name: 'GitLab', board: 'lever', slug: 'gitlab' },
  { name: 'Shopify', board: 'greenhouse', slug: 'shopify' },
  { name: 'GitHub', board: 'greenhouse', slug: 'github' },
  { name: 'Twilio', board: 'greenhouse', slug: 'twilio' },
  { name: 'Netflix', board: 'greenhouse', slug: 'netflix' },
  { name: 'Slack', board: 'greenhouse', slug: 'slack' },
  { name: 'Uber', board: 'greenhouse', slug: 'uber' },
  { name: 'Dropbox', board: 'greenhouse', slug: 'dropbox' },
  { name: 'Canva', board: 'greenhouse', slug: 'canva' },
  { name: 'Asana', board: 'greenhouse', slug: 'asana' },
]

interface JobberJob {
  title: string
  location: string
  link: string
}

interface Job {
  id: number
  title: string
  company: string
  type: string
  salary: string
  location: string
  duration: string
  url: string
  board: string
}

const getJobType = (title: string): string => {
  const lowerTitle = title.toLowerCase()

  if (lowerTitle.includes('design') || lowerTitle.includes('ui') || lowerTitle.includes('ux')) return 'Design'
  if (lowerTitle.includes('frontend') || lowerTitle.includes('react') || lowerTitle.includes('vue')) return 'Frontend'
  if (lowerTitle.includes('backend') || lowerTitle.includes('node') || lowerTitle.includes('django')) return 'Backend'
  if (lowerTitle.includes('full stack')) return 'Full Stack'
  if (lowerTitle.includes('devops') || lowerTitle.includes('infrastructure') || lowerTitle.includes('platform engineer')) return 'DevOps'
  if (lowerTitle.includes('data scientist') || lowerTitle.includes('analytics')) return 'Data Science'
  if (lowerTitle.includes('mobile') || lowerTitle.includes('ios') || lowerTitle.includes('android')) return 'Mobile'
  if (lowerTitle.includes('ml') || lowerTitle.includes('machine learning') || lowerTitle.includes('ai')) return 'AI/ML'
  if (lowerTitle.includes('security')) return 'Security'
  if (lowerTitle.includes('cloud') || lowerTitle.includes('architect')) return 'Cloud'
  if (lowerTitle.includes('product')) return 'Product'

  return 'Full Stack'
}

const generateSalary = (title: string, company: string): string => {
  const lowerTitle = title.toLowerCase()

  // Use company name and title to generate varied salaries
  const seed = (company + title).split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  const isHighLevel = lowerTitle.includes('principal') || lowerTitle.includes('lead') || lowerTitle.includes('senior') || lowerTitle.includes('architect')
  const isML = lowerTitle.includes('ml') || lowerTitle.includes('machine learning') || lowerTitle.includes('ai')

  let baseMin = 90
  let baseMax = 160

  if (isML) {
    baseMin = 140
    baseMax = 280
  } else if (isHighLevel) {
    baseMin = 130
    baseMax = 240
  }

  const variance = (seed % 40) - 20
  const min = baseMin + variance
  const max = baseMax + variance

  return `${Math.round(min)}K-${Math.round(max)}K`
}

async function fetchJobsFromSource(board: string, slug: string, company: string): Promise<Job[]> {
  try {
    const response = await fetch(`https://jobber.mihir.ch/${board}/${slug}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })

    if (!response.ok) return []

    const jobs: JobberJob[] = await response.json()

    return jobs.map((job) => ({
      id: Math.random() * 10000,
      title: job.title,
      company: company,
      type: getJobType(job.title),
      salary: generateSalary(job.title, company),
      location: job.location || 'Remote',
      duration: '6 months',
      url: job.link,
      board: company
    }))
  } catch (error) {
    console.error(`Failed to fetch jobs for ${company}:`, error)
    return []
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const offset = parseInt(searchParams.get('offset') || '0')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Fetch jobs from all sources in parallel
    const jobPromises = companySources.map(source =>
      fetchJobsFromSource(source.board, source.slug, source.name)
    )

    const allJobsArrays = await Promise.all(jobPromises)
    let allJobs = allJobsArrays.flat()

    // Shuffle jobs for variety
    allJobs = allJobs.sort(() => Math.random() - 0.5)

    // Remove duplicates by URL
    const uniqueJobs = Array.from(new Map(allJobs.map(job => [job.url, job])).values())

    // Apply pagination
    const paginatedJobs = uniqueJobs.slice(offset, offset + limit)

    return NextResponse.json({
      jobs: paginatedJobs,
      total: uniqueJobs.length,
      hasMore: offset + limit < uniqueJobs.length
    })
  } catch (error) {
    console.error('Failed to fetch jobs:', error)
    return NextResponse.json({ jobs: [], total: 0, hasMore: false })
  }
}
