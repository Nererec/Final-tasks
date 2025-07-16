import Ticket from '../Ticket/Ticket'
import Button from '../UI/Button/Button'
import { SortType, TicketType } from '../../types/types'
import { getTickets } from '../../redux/ticketsSlice'
import store from '../../redux/store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import styles from './TicketsList.module.scss'
import { tickets } from '../../ticketsDetails'
import { useMemo } from 'react'
import { selectorFilterCompany, selectorFilterConnection, selectorLoading, selectorSortBy, ticketsSelectors } from '../../redux/ticketsSelectors'

const TicketsList = () => {
  const allTickets = ticketsSelectors.selectAll(store.getState())
  const loading = useAppSelector(selectorLoading)
  const dispatch = useAppDispatch()
  const amountOfTickets = ticketsSelectors.selectTotal(store.getState())

  const filterConnection = useAppSelector(selectorFilterConnection)
  const filterCompany = useAppSelector(selectorFilterCompany)
  const sortBy = useAppSelector(selectorSortBy)

  const ticketsData = useMemo(() => {
    let array = allTickets.filter(a => filterConnection.includes(a.connectionAmount.amount)).filter(a => filterCompany.includes(a.companyName))
    switch(sortBy) {
      case SortType.Connection:
        return array.sort((a, b) => a.connectionAmount.amount.localeCompare(b.connectionAmount.amount))
      case SortType.Duration:
        return array.sort((a, b) => a.duration - b.duration)
      case SortType.Price:
        return array.sort((a, b) => a.price - b.price)
    }
  }, [allTickets, filterConnection, filterCompany, sortBy])

  const handleClick = () => {
    dispatch(getTickets(3))
  }

  return (
    <div className={styles.ticket_list}>
      {ticketsData?.map((ticket: TicketType) => <Ticket key={ticket.id} {...ticket}/>)}
      {(ticketsData?.length === 0 && !loading) && <div className={styles.no_data}>There are no tickets that answer to your request.</div>}
      {loading && <div className={styles.loading}>Loading...</div>}
      {amountOfTickets < tickets.length && <Button className={styles.button} onClick={handleClick}>Загрузить еще билеты</Button>}
    </div>
  )
}

export default TicketsList