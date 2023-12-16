import { Box, Button, TextField } from '@mui/material'
import React, { useCallback } from 'react'
import { useAppContext } from '../../hooks'

export const Input = () => {
  const { error, input, onSubmit: onContextSubmit, result, setError, setInput } = useAppContext()

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(' ')
    setInput(e.target.value.replaceAll(/[^(\d|.)]/gmi, ''))
  }, [setError, setInput])

  const onSubmit = useCallback(async () => {
    if (!input) {
      setError('Please enter a number!')
      return
    }

    if (input === result?.input?.toString()) {
      setError('Please enter a different number!')
      return
    }

    await onContextSubmit()
    setInput('')
  }, [input, onContextSubmit, result?.input, setError, setInput])

  const onKeyUp = useCallback(async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!!input && e.key.toLowerCase() === 'enter') {
      onSubmit().then()
    }
  }, [input, onSubmit])

  return (
    <Box sx={{
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'row',
      gap: '1rem',
      justifyContent: 'flex-start',
      padding: '1rem 0'
    }}>
      <TextField
        error={!!error}
        helperText={error}
        label="Input Number"
        id="input-number"
        inputProps={{
          ['data-testid']: 'input-number',
          maxLength: 15
        }}
        onChange={onChange}
        onKeyUp={onKeyUp}
        value={input}
      />
      <Button
        data-testid="button-calculate"
        id="button-calculate"
        onClick={onSubmit}
      >
        Calculate
      </Button>
    </Box>
  )
}
