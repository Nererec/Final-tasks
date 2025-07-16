import FilterMenu from '../FilterMenu/FilterMenu'
import Logo from '../Logo/Logo'
import SortMenu from '../SortMenu/SortMenu'
import TicketsList from '../TicketsList/TicketsList'
import styles from './Layout.module.scss'

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Logo/>
      <div className={styles.ticketbar}>
        <SortMenu/>
        <FilterMenu/>
        <TicketsList/>
      </div>
    </div>
  )
}

export default Layout