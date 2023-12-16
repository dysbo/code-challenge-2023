import { createContext, PropsWithChildren, useCallback, useState } from 'react'
import { AppContext, AppContextResult } from './AppContext.type'
import { useCalculationCall } from '../../hooks'

export const appContext = createContext<AppContext>({
  clearResult: () => {
  },
  input: '',
  onSubmit: () => Promise.resolve(),
  setError: (_) => {},
  setInput: (_) => {}
})

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const calculate = useCalculationCall()

  const [error, setError] = useState<string>(' ')
  const [input, setInput] = useState<string>('')
  const [result, setResult] = useState<AppContextResult>()

  const clearResult = useCallback(() => {
    setResult(undefined)
    setError(' ')
  }, [])

  const onSubmit = useCallback(async () => {
    setResult(await calculate(input))
  }, [calculate, input])

  return (
    <appContext.Provider value={{ clearResult, error, input, onSubmit, result, setError, setInput }}>
      {children}
    </appContext.Provider>
  )
}
