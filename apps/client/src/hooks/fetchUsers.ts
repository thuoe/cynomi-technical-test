import { useQuery } from '@tanstack/react-query'

const useFetchUsers = <T>() => {
  const { isPending, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then((res) => res.json() as Promise<T>),
  })
  return { isPending, error, data }
}

export default useFetchUsers
