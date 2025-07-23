// MusicBrainz API functions
export async function searchAlbum(artist, title) {
    const query = `artist:"${artist}" AND release:"${title}"`
    const url = `https://musicbrainz.org/ws/2/release/?query=${encodeURIComponent(query)}&fmt=json&limit=5`

    try {
        const response = await fetch(url)
        const data = await response.json()
        return data.releases?.[0] || null
    } catch (error) {
        console.error('MusicBrainz search failed:', error)
        return null
    }
}

export async function getAlbumCover(musicbrainzId) {
    try {
        const url = `https://coverartarchive.org/release/${musicbrainzId}`
        const response = await fetch(url)
        const data = await response.json()
        return data.images?.[0]?.image || null
    } catch (error) {
        console.error('Cover art fetch failed:', error)
        return null
    }
}

export async function getTracklist(musicbrainzId) {
    try {
        const url = `https://musicbrainz.org/ws/2/release/${musicbrainzId}?inc=recordings&fmt=json`
        const response = await fetch(url)
        const data = await response.json()

        const tracks = data.media?.[0]?.tracks?.map(track => ({
            position: track.position,
            title: track.title,
            length: track.length
        })) || []

        return tracks
    } catch (error) {
        console.error('Tracklist fetch failed:', error)
        return []
    }
}

// Discogs API functions
export async function searchDiscogs(artist, title) {
    const apiKey = process.env.DISCOGS_API_KEY // You'll need to get this
    const query = `${artist} ${title}`
    const url = `https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&type=release&key=${apiKey}&secret=${process.env.DISCOGS_SECRET}`

    try {
        const response = await fetch(url)
        const data = await response.json()
        return data.results?.[0] || null
    } catch (error) {
        console.error('Discogs search failed:', error)
        return null
    }
}