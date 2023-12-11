import { appContext } from '../providers'
import { useContext } from 'react'

export const useAppContext = () => useContext(appContext)
