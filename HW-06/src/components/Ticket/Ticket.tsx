import { CompanyName, TicketType } from '../../types/types'
import styles from './Ticket.module.scss'
import victory from '../../assets/images/airlines/victory.png'
import s7 from '../../assets/images/airlines/s7.png'
import redWings from '../../assets/images/airlines/red-wings.png'

const Ticket = ({ from, to, companyName, price, currency, time, duration, connectionAmount }: TicketType) => {
  let imgSrc = ''
  switch (companyName) {
    case CompanyName.Victory:
      imgSrc = victory
      break
    case CompanyName.RedWings:
      imgSrc = redWings
      break
    case CompanyName.S7:
      imgSrc = s7
      break
  }
  return (
    <div className={styles.ticket}>
      <img src={imgSrc} className={styles.ticket_image} alt={companyName} />
      <span className={styles.ticket_price}>{price} {currency}</span>
      <div className={styles.info}>
        <div className={styles.info_block}>
          <span className={styles.info_block_head}>{from} - {to}</span>
          <span>{time.startTime} - {time.endTime}</span>
        </div>
        <div className={styles.info_block}>
          <span className={styles.info_block_head}>В пути</span>
          <span>{Math.floor(duration / 60)} ч {duration % 60} мин</span>
        </div>
        <div className={styles.info_block}>
          <span className={styles.info_block_head}>Пересадки</span>
          <span>{connectionAmount.text}</span>
        </div>
      </div>
    </div>
  )
}

export default Ticket
