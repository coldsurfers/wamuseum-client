'use client'

import { format } from 'date-fns'
import { Button, Spinner } from '@coldsurfers/hotsurf'
import { useMemo } from 'react'
import styled from 'styled-components'
import useConcertQuery from '../../../hooks/useConcertQuery'
import useConcertPoster from './queries/useConcertPoster'
import useConcertArtists from './queries/useConcertArtists'
import PosterUI from './components/PosterUI'
import RegisteredArtist from './components/RegisteredArtist'
import SearchArtistsUI from './components/SearchArtistsUI'
import AddTicketsUI from './components/AddTicketsUI'

const ConcertIdPage = ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const { id } = params

  const { data: concertData, loading: concertLoading } = useConcertQuery({
    variables: {
      concertId: id,
    },
  })

  const { data: concertArtists } = useConcertArtists({
    variables: {
      concertId: id,
    },
  })
  const { data: concertPosterData } = useConcertPoster({
    variables: {
      concertId: id,
    },
  })

  const concert = useMemo(() => {
    if (!concertData?.concert) return null
    switch (concertData.concert.__typename) {
      case 'HttpError':
        return null
      case 'Concert':
        return concertData.concert
      default:
        return null
    }
  }, [concertData])

  const thumbnailURL = useMemo<string | null>(() => {
    if (concertPosterData?.concertPoster.__typename === 'PosterList') {
      return concertPosterData.concertPoster.list?.at(0)?.imageURL ?? null
    }
    return null
  }, [concertPosterData])

  const artistsResult = useMemo(() => {
    if (concertArtists?.concertArtists.__typename === 'ArtistList') {
      return concertArtists.concertArtists.list ?? []
    }
    return []
  }, [concertArtists])

  // const onClickCreatePoster = useCallback(() => {
  //   if (!concert) return
  //   pickFile(async (e) => {
  //     const { target } = e
  //     if (!target) return
  //     const filename = new Date().toISOString()
  //     const { files } = target as any
  //     const presignedData = await presign({
  //       filename,
  //       filetype: 'image/*',
  //     })
  //     await uploadToPresignedURL({
  //       data: presignedData,
  //       file: files[0],
  //     })
  //     mutateCreateConcertPoster({
  //       variables: {
  //         input: {
  //           concertId: concert.id,
  //           imageURL: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/poster-thumbnails/${filename}`,
  //         },
  //       },
  //     })
  //   })
  // }, [concert, mutateCreateConcertPoster])

  // const onClickUpdatePoster = useCallback(async () => {
  //   if (!thumbnail) return
  //   pickFile(async (e) => {
  //     const { target } = e
  //     if (!target) return
  //     const filename = new Date().toISOString()
  //     const { files } = target as any
  //     const presignedData = await presign({
  //       filename,
  //       filetype: 'image/*',
  //     })
  //     await uploadToPresignedURL({
  //       data: presignedData,
  //       file: files[0],
  //     })
  //     mutateUpdateConcertPoster({
  //       variables: {
  //         input: {
  //           id: thumbnail.id,
  //           imageURL: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/poster-thumbnails/${filename}`,
  //         },
  //       },
  //     })
  //   })
  // }, [mutateUpdateConcertPoster, thumbnail])

  // const tickets = useMemo(() => {
  //   if (!concert?.tickets) return []
  //   return concert.tickets
  // }, [concert?.tickets])

  if (concertLoading) {
    return <Spinner />
  }

  return (
    <Wrapper>
      <Title>{concert?.title}</Title>
      <ConfigButtonWrapper>
        {/* <Button
          color="transparentDarkGray"
          onPress={() => router.push(`/upload?id=${concert?.id}`)}
          text="수정하기"
        /> */}
        {/* <Button
          color="pink"
          onPress={() => {
            mutateRemoveConcert({
              variables: {
                input: {
                  id: concertId,
                },
              },
              update: (cache, { data }) => {
                if (!data || !data.removeConcert) return
                const { removeConcert } = data
                if (removeConcert.__typename !== 'RemovedConcert') return
                const normalizedId = cache.identify({
                  id: removeConcert.id,
                  __typename: 'Concert',
                })
                cache.evict({ id: normalizedId })
                cache.gc()
              },
            }).then(() => {
              router.push('/')
            })
          }}
          text="삭제하기"
          style={{ marginLeft: 10 }}
        /> */}
      </ConfigButtonWrapper>
      <InnerWrapper>
        <LeftWrapper>
          {thumbnailURL ? (
            <PosterUI imageURL={thumbnailURL} />
          ) : (
            <Button
              text="포스터 등록하기"
              onPress={() => {}}
              style={{ marginTop: 12 }}
            />
          )}
        </LeftWrapper>
        <RightWrapper>
          <Label>아티스트</Label>
          <Content
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {artistsResult.map((value) => {
              if (!value) return null
              return <RegisteredArtist key={value.id} value={value} />
            }) || '등록된 아티스트가 없습니다.'}
            <SearchArtistsUI concertId={id} />
          </Content>
          <Label>공연장소</Label>
          {/* <Content>{location || '등록된 공연장소가 없습니다.'}</Content> */}
          <Label>공연 날짜</Label>
          <Content>
            {concert?.date
              ? format(new Date(concert.date), 'yyyy-MM-dd hh:mm a')
              : '등록된 공연날짜가 없습니다.'}
          </Content>

          {/* <RegisteredTicketsUI /> */}
          <AddTicketsUI concertId={id} />

          <Label>등록일</Label>
          {concert?.createdAt ? (
            <Content>
              {format(new Date(concert.createdAt), 'yyyy-MM-dd hh:mm a')}
            </Content>
          ) : null}
          {concert?.updatedAt && (
            <>
              <Label>수정일</Label>
              <Content>
                {format(new Date(concert.updatedAt), 'yyyy-MM-dd hh:mm a')}
              </Content>
            </>
          )}
        </RightWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 25px;

  padding-left: 150px;
  padding-right: 150px;
`

const InnerWrapper = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
`

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
`

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 28px;
  overflow-x: auto;
  min-width: 725px;
`

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
`

const Label = styled.p`
  font-size: 18px;
  margin-bottom: 8px;
`

const Content = styled.h3`
  font-size: 20px;
  margin-bottom: 16px;
  font-weight: 600;
`

const ConfigButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`

export default ConcertIdPage
