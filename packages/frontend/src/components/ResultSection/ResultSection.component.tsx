import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography } from '@mui/material'
import { useAppContext } from '../../hooks'
import { AppContextResult } from '../../providers/AppContextProvider/AppContext.type'
import { Result } from '../Result'

export const ResultSection = () => {
  const { clearResult, result, setError } = useAppContext()
  const [results, setResults] = useState<AppContextResult[]>([])

  const handleClear = useCallback(() => {
    clearResult()
    setResults([])
  }, [clearResult, setResults])

  const handleRemove = useCallback((input: string) =>
    setResults(current => current.filter(r => r.input !== input)),
  [setResults])

  useEffect(() => {
    if (result) {
      // only put each entry in once
      setResults(current => {
        if (!current.map(c => c.input).includes(result.input)) {
          return [...current, result]
        }

        setError('Value already submitted!')
        return current
      })
    }
  }, [result, setError])

  return (
    <Box sx={{
      alignItems: 'flex-start',
      alignSelf: 'stretch',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Typography variant="h3" component="h2">Result</Typography>
      {!results.length && (
        <Typography>Submit an input number to see your result!</Typography>
      )}
      {!!results.length && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width='25%'>n</TableCell>
              <TableCell width='25%'>n * 2</TableCell>
              <TableCell width='25%'>(n * 2) ^ 2</TableCell>
              <TableCell width='25%'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => (
              <Result key={result.input} {...result} removeResult={handleRemove} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
                <Button onClick={handleClear}>Clear</Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </Box>
  )
}
