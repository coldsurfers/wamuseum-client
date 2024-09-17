'use client'

import AddButton from '@/ui/AddButton'
import InputWithLabel from '@/ui/InputWithLabel'
import Label from '@/ui/Label'
import UploadFormDateInput from '@/ui/UploadFormDateInput'
import { Button } from '@coldsurfers/hotsurf'
import format from 'date-fns/format'
import isValid from 'date-fns/isValid'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import useCreateConcertTicket from '../mutations/useCreateConcertTicket'

const Content = styled.h3`
  font-size: 20px;
  margin-bottom: 16px;
  font-weight: 600;
`

const parseDate = (dateString: string) => {
  const year = dateString.slice(0, 2)
  const month = dateString.slice(2, 4)
  const day = dateString.slice(4, 6)
  const hour = dateString.slice(6, 8)
  const min = dateString.slice(8, 10)
  const parsed = new Date(`20${year}-${month}-${day} ${hour}:${min}`)
  return parsed
}

const formatDate = (date: Date) =>
  isValid(date)
    ? format(date, 'yyyy-MM-dd hh:mm a')
    : '올바르지 않은 날짜입니다'

const AddTicketsUI = ({ concertId }: { concertId: string }) => {
  const [mutateCreateConcertTicket] = useCreateConcertTicket({})

  const [addTicketsForm, setAddTicketsForm] = useState<
    {
      name: string
      website: string
      opendate: string
      ticketPrices: number[]
    }[]
  >([])

  const addTicket = useCallback(() => {
    setAddTicketsForm((prev) =>
      prev.concat({
        name: '',
        website: '',
        opendate: '',
        ticketPrices: [],
      })
    )
  }, [])

  return (
    <>
      <Content style={{ display: 'flex', alignItems: 'center' }}>
        <Label>티켓 정보</Label>
        <AddButton
          onPress={() => {
            addTicket()
          }}
        />
      </Content>
      {addTicketsForm.map((ticket, ticketIndex) => (
        <div
          key={ticketIndex}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <InputWithLabel
            value={ticket.name}
            onChangeText={(text) => {
              setAddTicketsForm((prev) =>
                prev.map((prevItem, prevIndex) => {
                  if (prevIndex === ticketIndex) {
                    return {
                      ...prevItem,
                      name: text,
                    }
                  }
                  return prevItem
                })
              )
            }}
            label="티켓 예매처 이름"
            placeholder="티켓 예매처 이름"
          />
          <InputWithLabel
            value={ticket.website}
            onChangeText={(text) => {
              setAddTicketsForm((prev) =>
                prev.map((prevItem, prevIndex) => {
                  if (prevIndex === ticketIndex) {
                    return {
                      ...prevItem,
                      website: text,
                    }
                  }
                  return prevItem
                })
              )
            }}
            label="티켓 예매 사이트"
            placeholder="티켓 예매 사이트"
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Label>
              {`티켓 오픈 날짜\n(${formatDate(parseDate(ticket.opendate))})`}
            </Label>
            <UploadFormDateInput
              value={ticket.opendate}
              onChangeText={(text) => {
                setAddTicketsForm((prev) =>
                  prev.map((prevItem, prevIndex) => {
                    if (prevIndex === ticketIndex) {
                      return {
                        ...prevItem,
                        opendate: text,
                      }
                    }
                    return prevItem
                  })
                )
              }}
              placeholder={'티켓 오픈 날짜'}
            />
          </div>
          <div>
            <Button
              style={{
                width: 10,
                height: 10,
              }}
              color={'indigo'}
              text={'﹢'}
              onPress={() => {
                const isValidOpenDate = isValid(parseDate(ticket.opendate))
                if (!isValidOpenDate) {
                  alert('Invalid Ticket Open Date')
                  return
                }
                mutateCreateConcertTicket({
                  variables: {
                    input: {
                      concertId,
                      openDate: parseDate(ticket.opendate).toISOString(),
                      seller: ticket.name,
                      sellingURL: ticket.website,
                    },
                  },
                })
              }}
            />
            <Button
              style={{
                width: 10,
                height: 10,
              }}
              text={'✘'}
              color={'pink'}
              onPress={() =>
                setAddTicketsForm((prev) =>
                  prev.filter((_, index) => index !== ticketIndex)
                )
              }
            />
          </div>
        </div>
      ))}
    </>
  )
}

export default AddTicketsUI
