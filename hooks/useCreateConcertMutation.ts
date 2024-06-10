import {
  ApolloCache,
  DefaultContext,
  MutationHookOptions,
  useMutation,
} from '@apollo/client'
import { CreateConcertData, CreateConcertInput } from '../gql/schema'
import { CreateConcertMutation } from '../gql/mutations'

export default function useCreateConcertMutation(
  options?: MutationHookOptions<
    { createConcert: CreateConcertData },
    {
      input: CreateConcertInput
    },
    DefaultContext,
    ApolloCache<any>
  >
) {
  return useMutation<
    {
      createConcert: CreateConcertData
    },
    {
      input: CreateConcertInput
    }
  >(CreateConcertMutation, options)
}
