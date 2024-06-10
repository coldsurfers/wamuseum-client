import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  useMutation,
} from '@apollo/client'
import { CreateConcertPosterData } from '../gql/schema'
import { CreateConcertPosterMutation } from '../gql/mutations'

export default function useCreateConcertPosterMutation(
  options?: MutationHookOptions<
    { createConcertPoster: CreateConcertPosterData },
    { input: { imageURL: string; concertId: number } },
    DefaultContext,
    ApolloCache<any>
  >
) {
  return useMutation<
    {
      createConcertPoster: CreateConcertPosterData
    },
    {
      input: {
        imageURL: string
        concertId: number
      }
    }
  >(CreateConcertPosterMutation, options)
}
