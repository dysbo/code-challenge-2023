import { useContext } from 'react'
import { appContext } from '../providers'

export const useAppContext = () => useContext(appContext)
