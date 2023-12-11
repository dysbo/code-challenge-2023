import { useCallback, useMemo } from 'react'
import axios from 'axios'
import { AppContextResult } from '../providers/AppContextProvider/AppContext.type'

export const useCalculationCall = (): (s: string) => Promise<AppContextResult> => {
  const client = useMemo(() => axios.create({ baseURL: 'http://localhost:3001' }), [])

  return useCallback(async (input: string) => {
    const response = await client.post(`/input/${input}`)
    return response.data
  }, [client])
}
