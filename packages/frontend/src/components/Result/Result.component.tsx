import { Link, TableCell, TableRow } from '@mui/material'
import { ResultProps } from './Result.type'
import { useCallback, useMemo } from 'react'
import { useAppContext } from '../../hooks'

export const Result = ({ input, inputTimesTwo, inputTimesTwoSquared, removeResult }: ResultProps) => {
  const { result } = useAppContext()
  const handleRemove = useCallback(() => removeResult(input), [input, removeResult])
  const isActive = useMemo(() => input === result?.input, [result])

  return (
    <TableRow
      sx={{
        backgroundColor: isActive ? 'primary.light' : 'inherit'
      }}
    >
      <TableCell data-testid={`result-n-${input}`}>{input}</TableCell>
      <TableCell data-testid={`result-nTimesTwo-${input}`}>{inputTimesTwo}</TableCell>
      <TableCell data-testid={`result-nTimesTwoSquared-${input}`}>{inputTimesTwoSquared}</TableCell>
      <TableCell data-testid={`result-actions-${input}`}>
        <Link href="#" color="error" onClick={handleRemove}>
          Remove
        </Link>
      </TableCell>
    </TableRow>
  )
}
