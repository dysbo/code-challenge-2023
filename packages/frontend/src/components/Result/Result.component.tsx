import { Box, Button, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography } from '@mui/material'
import { useAppContext } from '../../hooks'
import { useCallback, useEffect, useState } from 'react'
import { AppContextResult } from '../../providers/AppContextProvider/AppContext.type'

export const Result = () => {
  const [results, setResults] = useState<AppContextResult[]>([])
  const { clearResult, result } = useAppContext()

  const clearResults = useCallback(() => {
    clearResult()
    setResults([])
  }, [])

  useEffect(() => {
    if (result) {
      setResults(current => {
        // don't append the same thing twice (they can still enter it multiple times)
        if (current[current.length - 1]?.input !== result.input) {
          return [...current, result]
        }

        return current
      })
    }
  }, [result])

  return (
    <Box>
      <Typography variant="h3" component="h2">Result</Typography>
      {!results.length ? (
        <Typography>Submit an input number to see your result!</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow sx={{ fontWeight: 700 }}>
              <TableCell>n</TableCell>
              <TableCell>n * 2</TableCell>
              <TableCell>(n * 2) ^ 2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((r, i) => (
              <TableRow key={i}>
                <TableCell>{r?.input}</TableCell>
                <TableCell>{r?.inputTimesTwo}</TableCell>
                <TableCell>{r?.inputTimesTwoSquared}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableCell colSpan={3}>
              <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                <Button onClick={clearResults}>Clear</Button>
              </Box>
            </TableCell>
          </TableFooter>
        </Table>
      )}
    </Box>
  )
}
