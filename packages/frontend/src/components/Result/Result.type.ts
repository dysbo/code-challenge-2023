import { AppContextResult } from '../../providers/AppContextProvider/AppContext.type'

export interface ResultProps extends AppContextResult {
  removeResult: (input: string) => void
}
