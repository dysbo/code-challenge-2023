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
  setError: (s?: string) => void
  setInput: (s: string) => void
}
