import { QueryHookOptions, useQuery } from '@apollo/client'
import { ConcertListData } from '../gql/schema'
import { CONCERT_LIST_QUERY } from '../gql/queries'

export default function useConcertListQuery(
  options?: QueryHookOptions<
    { concertList: ConcertListData },
    {
      page: number
      limit: number
      orderBy: {
        createdAt: 'asc' | 'desc'
      }
    }
  >
) {
  return useQuery<
    {
      concertList: ConcertListData
    },
    {
      page: number
      limit: number
      orderBy: {
        createdAt: 'asc' | 'desc'
      }
    }
  >(CONCERT_LIST_QUERY, options)
}
