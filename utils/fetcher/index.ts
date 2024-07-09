import { AuthToken } from '../../gql/schema'
import storage from '../storage/storage'
import { PresignedData } from './types'

export const presign = async ({
  filename,
  filetype,
}: {
  filename: string
  filetype: 'image/*'
}): Promise<PresignedData> => {
  const authToken = storage.get<AuthToken>('@wamuseum-client/auth-token')
  const headers = new Headers()
  headers.append('Authorization', authToken?.accessToken ?? '')
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_FILE_UPLOAD_URI}?filename=${filename}&filetype=${filetype}`,
    {
      method: 'GET',
      headers,
    }
  )
  const data = (await result.json()) as PresignedData

  return data
}

export const uploadToPresignedURL = async ({
  data,
  file,
}: {
  data: PresignedData
  file: File
}) => {
  const formData = new FormData()

  Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
    formData.append(key, value as string)
  })
  await fetch(data.url, {
    method: 'POST',
    body: formData,
    credentials: 'include',
    mode: 'cors',
  })
}
