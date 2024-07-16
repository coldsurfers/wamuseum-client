import { QueryHookOptions, useQuery } from '@apollo/client'
import { ConcertData } from '../gql/schema'
import { CONCERT_QUERY } from '../gql/queries'

export default function useConcertQuery(
  options: QueryHookOptions<
    { concert: ConcertData },
    {
      concertId: string
    }
  >
) {
  return useQuery<
    { concert: ConcertData },
    {
      concertId: string
    }
  >(CONCERT_QUERY, options)
}
