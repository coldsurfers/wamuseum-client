'use client'

import InputWithLabel from '@/ui/InputWithLabel'
import { Button, Spinner, palette } from '@coldsurfers/hotsurf'
import { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/navigation'
import useCreateArtist from './mutations/useCreateArtist'

const RegisterArtistPage = () => {
  const router = useRouter()
  const [artistName, setArtistName] = useState('')
  const [mutate, { loading }] = useCreateArtist({
    onCompleted: () => {
      router.push('/')
    },
  })
  return (
    <Wrapper>
      <Form>
        <InputWithLabel
          label="아티스트 등록"
          value={artistName}
          onChangeText={setArtistName}
        />
        <Button
          text={'등록하기'}
          style={{ marginTop: 10, backgroundColor: palette.black }}
          onPress={() => {
            mutate({
              variables: {
                input: {
                  artistName,
                },
              },
            })
          }}
        />
      </Form>
      {loading ? <Spinner /> : null}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Form = styled.div`
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

export default RegisterArtistPage
