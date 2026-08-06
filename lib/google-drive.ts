import { google } from 'googleapis'

export interface DriveAlbum {
  id: string
  name: string
  createdTime: string
  coverPhotoId: string | null
}

export interface DrivePhoto {
  id: string
  name: string
  createdTime: string
  width: number | null
  height: number | null
}

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  if (!email || !key) return null
  return new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  })
}

export function drivePhotoUrl(fileId: string, size = 800) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`
}

export async function getAlbums(): Promise<DriveAlbum[]> {
  const auth = getAuth()
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID
  if (!auth || !folderId) return []

  try {
    const drive = google.drive({ version: 'v3', auth })

    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name, createdTime)',
      orderBy: 'createdTime desc',
      pageSize: 50,
    })

    const folders = res.data.files ?? []

    // Get first photo of each folder for cover
    const albums = await Promise.all(
      folders.map(async (folder) => {
        const coverRes = await drive.files.list({
          q: `'${folder.id}' in parents and mimeType contains 'image/' and trashed = false`,
          fields: 'files(id)',
          orderBy: 'createdTime asc',
          pageSize: 1,
        })
        return {
          id: folder.id!,
          name: folder.name!,
          createdTime: folder.createdTime ?? '',
          coverPhotoId: coverRes.data.files?.[0]?.id ?? null,
        }
      })
    )

    return albums
  } catch {
    return []
  }
}

export async function getAlbumPhotos(albumId: string): Promise<DrivePhoto[]> {
  const auth = getAuth()
  if (!auth) return []

  try {
    const drive = google.drive({ version: 'v3', auth })
    const res = await drive.files.list({
      q: `'${albumId}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: 'files(id, name, createdTime, imageMediaMetadata)',
      orderBy: 'createdTime asc',
      pageSize: 200,
    })

    return (res.data.files ?? []).map((f) => ({
      id: f.id!,
      name: f.name ?? '',
      createdTime: f.createdTime ?? '',
      width: (f.imageMediaMetadata as { width?: number } | undefined)?.width ?? null,
      height: (f.imageMediaMetadata as { height?: number } | undefined)?.height ?? null,
    }))
  } catch {
    return []
  }
}

export async function getAlbumById(albumId: string): Promise<{ id: string; name: string } | null> {
  const auth = getAuth()
  if (!auth) return null

  try {
    const drive = google.drive({ version: 'v3', auth })
    const res = await drive.files.get({
      fileId: albumId,
      fields: 'id, name',
    })
    return { id: res.data.id!, name: res.data.name! }
  } catch {
    return null
  }
}
