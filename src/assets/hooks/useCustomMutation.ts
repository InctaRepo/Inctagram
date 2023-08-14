import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query'

type MutationData = any

type MutationFunction = (data: MutationData) => Promise<any>
export const useCustomMutation = (
  mutationFn: MutationFunction,
  options?: UseMutationOptions<any, any, MutationData, any>
  // <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>
): UseMutationResult<any, any, MutationData, any> => {
  return useMutation(mutationFn, options)
}
