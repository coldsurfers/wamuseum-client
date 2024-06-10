import { QueryHookOptions, useQuery } from '@apollo/client'
import { ConcertData } from '../gql/schema'
import { CONCERT_QUERY } from '../gql/queries'

export default function useConcertQuery(
  options: QueryHookOptions<
    { concert: ConcertData },
    {
      concertId: number
    }
  >
) {
  return useQuery<
    { concert: ConcertData },
    {
      concertId: number
    }
  >(CONCERT_QUERY, options)
}
