import { Button, palette, Spinner } from '@coldsurfers/hotsurf'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { format, isValid } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'
import useCreateConcertMutation from '../hooks/useCreateConcertMutation'
import UploadFormDateInput from './UploadFormDateInput'
import {
  DEFAULT_LIMIT,
  DEFAULT_ORDER_BY_CREATED_AT,
  DEFAULT_PAGE,
} from '../utils/constants'
import { CONCERT_LIST_QUERY } from '../gql/queries'
import { CreateConcertInput } from '../src/__generated__/graphql'
import Label from './Label'
import InputWithLabel from './InputWithLabel'

type FormState = {
  title: string
  date: string
}

const formInitialState: FormState = {
  title: '',
  date: '',
}

const UploadForm = () => {
  const searchParams = useSearchParams()
  const idParam = searchParams?.get('id')
  const router = useRouter()

  const [mutate, { loading: createConcertLoading }] = useCreateConcertMutation({
    refetchQueries: [
      {
        query: CONCERT_LIST_QUERY,
        variables: {
          page: DEFAULT_PAGE,
          limit: DEFAULT_LIMIT,
          orderBy: {
            createdAt: DEFAULT_ORDER_BY_CREATED_AT,
          },
        },
      },
    ],
    awaitRefetchQueries: true,
  })

  const [formState, setFormState] = useState<FormState>(formInitialState)
  useEffect(() => {
    const resetStates = () => {
      setFormState(formInitialState)
    }
    resetStates()
  }, [idParam])

  const parseDate = useCallback((dateString: string) => {
    const year = dateString.slice(0, 2)
    const month = dateString.slice(2, 4)
    const day = dateString.slice(4, 6)
    const hour = dateString.slice(6, 8)
    const min = dateString.slice(8, 10)
    const parsed = new Date(`20${year}-${month}-${day} ${hour}:${min}`)
    return parsed
  }, [])

  const validation: {
    validated: boolean
    message: string
  } = useMemo(() => {
    const { title, date } = formState
    if (title.split('').join('').length === 0) {
      return {
        validated: false,
        message: '올바른 공연 제목을 입력해주세요',
      }
    }
    if (!isValid(parseDate(date))) {
      return {
        validated: false,
        message: '올바른 공연 일정을 입력해주세요',
      }
    }

    return {
      validated: true,
      message: '',
    }
  }, [formState, parseDate])

  const formatDate = useCallback(
    (date: Date) =>
      isValid(date)
        ? format(date, 'yyyy-MM-dd hh:mm a')
        : '올바르지 않은 날짜입니다',
    []
  )

  const createConcert = useCallback(() => {
    if (validation.message) {
      alert(validation.message)
      return
    }
    const { date, title } = formState
    const input: CreateConcertInput = {
      date: parseDate(date).toISOString(),
      title,
    }
    mutate({
      variables: {
        input,
      },
    }).then((response) => {
      if (response) {
        if (response.data?.createConcert.__typename === 'Concert') {
          router.push(`/upload/${response.data.createConcert.id}`)
        }
      }
    })
  }, [formState, mutate, parseDate, router, validation.message])

  const { title, date } = formState

  return (
    <Wrapper>
      <InputWithLabel
        value={title}
        onChangeText={(text) => {
          setFormState((prev) => ({
            ...prev,
            title: text,
          }))
        }}
        label="공연 제목"
        placeholder="공연 제목"
      />
      {/* <InputWithLabel
        value={location}
        onChangeText={(text) => {
          setFormState((prev) => ({
            ...prev,
            location: text,
          }))
        }}
        label="공연 장소"
        placeholder="공연 장소"
      /> */}
      <Label>공연 일정 ({formatDate(parseDate(date))})</Label>
      <UploadFormDateInput
        value={date}
        onChangeText={(text) => {
          setFormState((prev) => ({
            ...prev,
            date: text,
          }))
        }}
        placeholder={'공연 일정'}
      />
      <Button
        // text={existing ? '수정하기' : 'Next'}
        text={'다음'}
        // disabled={!validation.validated}
        style={{ marginTop: 10, backgroundColor: palette.black }}
        // onPress={existing ? updateConcert : createConcert}
        onPress={createConcert}
      />
      {createConcertLoading ? <Spinner /> : null}
    </Wrapper>
  )
}

const Wrapper = styled.div`
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

export default memo(UploadForm)
