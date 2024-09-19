'use client'

import { Text, TextInput } from '@coldsurfers/hotsurf'
import styled from 'styled-components'
import { useMemo, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import useSearchVenueQuery from './queries/useSearchVenueQuery'

const RegisterVenueClientPage = () => {
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 350)
  const { data: searchedVenues } = useSearchVenueQuery({
    variables: {
      keyword: debouncedKeyword,
    },
  })

  const searchResult = useMemo(() => {
    if (searchedVenues?.searchVenue.__typename === 'SearchedVenueList') {
      return searchedVenues.searchVenue.list ?? []
    }
    return []
  }, [searchedVenues])

  return (
    <Wrapper>
      <TextInput
        placeholder="공연 장소 검색하기"
        value={keyword}
        onChangeText={setKeyword}
        style={{ width: 520 }}
      />
      {searchResult.map((result) => {
        if (!result) {
          return null
        }
        return (
          <div key={result.id}>
            <Text>{result.place_name}</Text>
          </div>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 120px;
`

export default RegisterVenueClientPage
