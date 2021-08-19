export async function getCreators() {
  return await fetch('https://accounts.webaverse.com/')
    .then((res) => res.json())
}

export async function getCreatorsWithBalance() {
  return await getCreators()
    .then((res) => res)
}

export async function getBlogPosts() {
  return await fetch(`https://webaverse.ghost.io/ghost/api/v3/content/posts/?key=${process.env.GHOST_API_KEY}`)
    .then((res) => res.json())
}

export async function getBlogPost(slug) {
  return await fetch(`https://webaverse.ghost.io/ghost/api/v3/content/posts/slug/${slug}/?key=${process.env.GHOST_API_KEY}`)
    .then((res) => res.json())
    .then((res) => res.posts[0])
}

export async function getLands() {
  return await fetch('https://land.webaverse.com/1-100')
    .then((res) => res.json())
}

export async function getItem(id) {
  return await fetch(`https://tokens.webaverse.com/${id}`)
    .then((res) => res.json())
}

export async function getItems(pageNum) {
  return await fetch(`https://tokens.webaverse.com/${1 * pageNum}-${100 * pageNum}`)
    .then((res) => res.json())
}

export async function getCreatorsItems(address) {
  return await fetch(`https://tokens.webaverse.com/${address}`)
    .then((res) => res.json())
}

export async function getCreator(address) {
  return await fetch(`https://accounts.webaverse.com/${address.toLowerCase()}`)
    .then((res) => res.json())
}

export async function searchCreators(query) {
  return await fetch('https://accounts.webaverse.com/')
    .then((res) => res.json())
    .then((res) => res.filter((creator) => creator.name.toLowerCase().includes(query.toLowerCase())))
}

export async function searchItems(query) {
  return await fetch(`https://tokens.webaverse.com/search?q=${query}`)
    .then((res) => res.json())
}

export async function searchLands(query) {
  return await fetch('https://land.webaverse.com/1-100')
    .then((res) => res.json())
    .then((res) => res.filter((land) => land.name.toLowerCase().includes(query.toLowerCase())))
}