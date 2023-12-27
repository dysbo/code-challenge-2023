import { Dispatch, SetStateAction } from 'react'

export interface AppContextResult {
  input: string
  inputTimesTwo: string
  inputTimesTwoSquared: string
}

export interface AppContext {
  clearResult: () => void
  error?: string
  input: string
  onSubmit: () => Promise<void>
  result?: AppContextResult
  setError: Dispatch<SetStateAction<string>>
  setInput: Dispatch<SetStateAction<string>>
}
