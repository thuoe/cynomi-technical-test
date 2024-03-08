import { useMutation } from "@tanstack/react-query"

type Params = {
  name: string,
  gender: string,
  sleepPattern: {
    duration: number
    date?: string
  }
}

const saveUser = <T,>(params: Params) => fetch('/api/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
    body: JSON.stringify(params),
}).then(response => response.json() as T)

const useSaveUser = <T,>(
  onSuccess?: (
    data: T | null | undefined,
    variables: Params,
    context: T,
  ) => void,
  onError?: (
    error: Error, 
    variables: Params, 
    context: T | undefined) => void
  ) => {
  return useMutation({
    mutationFn: (variables) => {
      return saveUser<T>(variables)
    },
    onSuccess,
    onError,
  })
}

export default useSaveUser