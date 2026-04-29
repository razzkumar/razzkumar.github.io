export interface GithubRepo {
  id: number
  name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  html_url: string
}

export interface GithubStats {
  username: string
  publicRepos: number
  followers: number
  totalStars: number
  topRepos: GithubRepo[]
  fetchedAt: string
}

const FALLBACK: GithubStats = {
  username: 'razzkumar',
  publicRepos: 0,
  followers: 0,
  totalStars: 0,
  topRepos: [],
  fetchedAt: new Date(0).toISOString(),
}

export async function getGithubStats(): Promise<GithubStats> {
  const token = process.env.GITHUB_TOKEN
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (token) headers.Authorization = `Bearer ${token}`

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch('https://api.github.com/users/razzkumar', { headers }),
      fetch(
        'https://api.github.com/users/razzkumar/repos?sort=updated&per_page=100',
        { headers }
      ),
    ])
    if (!userRes.ok) throw new Error(`user fetch failed: ${userRes.status}`)
    if (!reposRes.ok) throw new Error(`repos fetch failed: ${reposRes.status}`)

    const user = await userRes.json()
    const reposRaw = (await reposRes.json()) as Array<GithubRepo & { fork?: boolean }>

    const topRepos: GithubRepo[] = [...reposRaw]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 4)
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description ?? null,
        stargazers_count: r.stargazers_count ?? 0,
        forks_count: r.forks_count ?? 0,
        language: r.language ?? null,
        html_url: r.html_url,
      }))

    return {
      username: user.login,
      publicRepos: user.public_repos,
      followers: user.followers,
      totalStars: topRepos.reduce((sum, r) => sum + r.stargazers_count, 0),
      topRepos,
      fetchedAt: new Date().toISOString(),
    }
  } catch (err) {
    console.warn('[github-stats] fetch failed, using fallback:', err)
    return FALLBACK
  }
}
