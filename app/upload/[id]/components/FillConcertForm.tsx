'use client'

import useCreateConcertPosterMutation from '@/hooks/useCreateConcertPosterMutation'
import AddButton from '@/ui/AddButton'
import { presign, uploadToPresignedURL } from '@/utils/fetcher'
import pickFile from '@/utils/pickFile'
import { Button, Text, palette, Spinner } from '@coldsurfers/hotsurf'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;

  padding: 1rem;
  border-radius: 3px;

  margin-top: 32px;

  width: 900px;

  background-color: ${palette.white};
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`

const HeadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`

const PosterThumbnail = styled.img`
  width: 100%;
  height: 500px;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  object-fit: contain;
`

const FillConcertForm = ({ concertId }: { concertId: string }) => {
  const router = useRouter()
  const [uploadFileLoading, setUploadFileLoading] = useState(false)
  const [mutate, { loading }] = useCreateConcertPosterMutation({
    onCompleted: () => {
      router.push('/')
    },
  })
  const [posterUrl, setPosterUrl] = useState('')
  const getThumbnail = useCallback(async () => {
    pickFile(async (e) => {
      const { target } = e
      if (!target) return
      const filename = new Date().toISOString()
      const { files } = target as any
      setUploadFileLoading(true)
      try {
        const presignedData = await presign({
          filename,
          filetype: 'image/*',
        })
        await uploadToPresignedURL({
          data: presignedData,
          file: files[0],
        })
        setPosterUrl(
          `${
            process.env.NEXT_PUBLIC_S3_BUCKET_URL
          }/billets/poster-thumbnails/${encodeURIComponent(filename)}`
        )
      } catch (err) {
        console.error(err)
      } finally {
        setUploadFileLoading(false)
      }
    })
  }, [])

  const createPoster = useCallback(() => {
    mutate({
      variables: {
        input: {
          concertId,
          imageURL: posterUrl,
        },
      },
    })
  }, [concertId, mutate, posterUrl])

  return (
    <Wrapper>
      <Form>
        <HeadWrapper>
          <Text style={{ fontSize: 16 }}>공연 포스터</Text>
          {posterUrl ? (
            <Button
              style={{ width: 10, height: 10, marginLeft: 'auto' }}
              text={'✘'}
              onPress={() => {
                setPosterUrl('')
              }}
            />
          ) : (
            <AddButton onPress={getThumbnail} />
          )}
        </HeadWrapper>
        {posterUrl && <PosterThumbnail src={posterUrl} />}
        <Button
          text={'다음'}
          style={{ marginTop: 10, backgroundColor: palette.black }}
          onPress={createPoster}
        />
      </Form>
      {loading || uploadFileLoading ? <Spinner /> : null}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default FillConcertForm
