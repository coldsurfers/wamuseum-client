'use client'

import { Spinner, Text, TextInput, palette } from '@coldsurfers/hotsurf'
import { useMemo, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import styled from 'styled-components'
import useSearchArtists from '../queries/useSearchArtists'
import useCreateConcertArtist from '../mutations/useCreateConcertArtist'

const SearchResultWrapper = styled.div`
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: ${palette.white};
  padding: 8px;
  margin: 4px;
`

const SearchArtistsUI = ({ concertId }: { concertId: string }) => {
  const [searchArtistKeyword, setSearchArtistKeyword] = useState('')
  const debouncedSearchArtistKeyword = useDebounce(searchArtistKeyword, 350)
  const { data: searchedArtists, loading: loadingSearchArtists } =
    useSearchArtists({
      variables: {
        keyword: debouncedSearchArtistKeyword,
      },
    })

  const [mutateCreateConcertArtist] = useCreateConcertArtist({})

  const artistSearchResult = useMemo(() => {
    if (searchedArtists?.searchArtists.__typename === 'ArtistList') {
      return searchedArtists.searchArtists.list ?? []
    }
    return []
  }, [searchedArtists])

  return (
    <>
      <TextInput
        value={searchArtistKeyword}
        onChangeText={setSearchArtistKeyword}
        placeholder="아티스트 검색"
        style={{
          marginTop: 12,
        }}
      />
      {artistSearchResult.length > 0 ? (
        <SearchResultWrapper>
          {artistSearchResult.map((result) => (
            <div
              key={result?.id}
              onClick={() => {
                if (!result || !result.id) {
                  return
                }
                mutateCreateConcertArtist({
                  variables: {
                    input: {
                      artistId: result.id,
                      concertId,
                    },
                  },
                })
              }}
              style={{
                background: palette.white,
                cursor: 'pointer',
              }}
            >
              <Text>{result?.name}</Text>
            </div>
          ))}
        </SearchResultWrapper>
      ) : null}
      {loadingSearchArtists ? <Spinner /> : null}
    </>
  )
}

export default SearchArtistsUI
