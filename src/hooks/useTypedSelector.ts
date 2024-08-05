import { useSelector } from 'react-redux'
import { TypedUseSelectorHook } from 'react-redux'
import { IRootReducer } from '../store/store'

export const useTypedSelector: TypedUseSelectorHook<IRootReducer> = useSelector
