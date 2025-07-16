import { getTickets } from './redux/ticketsSlice'
import Layout from './components/Layout/Layout'
import { useEffect } from 'react'
import { useAppDispatch } from './hooks'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTickets(0))
  }, [dispatch])

  return (
    <Layout />
  )
}

export default App