import { useState } from 'react'
import { CompanyCheckboxes, ConnectionCheckboxes } from '../../data'
import { useAppSelector } from '../../hooks'
import Button from '../UI/Button/Button'
import Checkbox from '../UI/Checkbox/Checkbox'
import styles from './FilterMenu.module.scss'
import { selectorFilterCompany, selectorFilterConnection } from '../../redux/ticketsSelectors'
import { FilterType, FiltersTotal } from '../../types/types'

const FilterMenu = () => {
  const filterConnection = useAppSelector(selectorFilterConnection)
  const filterCompany = useAppSelector(selectorFilterCompany)
  const [isOpen, setOpen] = useState<boolean>(false)

  const handleClick = () => {
    setOpen(prev => !prev)
  }

  return (
    <div className={[styles.menu, isOpen ? styles.menu_open : ''].filter(Boolean).join(' ')}>
      <div className={styles.mobile}>
        <span className={styles.span}>
          {
            filterCompany.length === FiltersTotal.Company
              ? 'Любая авиакомпания, '
              : `Авиакомпании: ${filterCompany.join(', ')}, `
          }
          {
            filterConnection.length === FiltersTotal.Connection
              ? 'любое кол-во пересадок'
              : `пересадок: ${filterConnection.join(', ')}`
          }
        </span>
        <Button onClick={handleClick} className={styles.button}><span className={styles.button_span}>Открыть настройки</span></Button>
      </div>
      <div className={styles.checkboxes}>
        <Checkbox options={ConnectionCheckboxes} text={'Количество пересадок'} filter={FilterType.Connection} checkedOptions={filterConnection} />
        <Checkbox options={CompanyCheckboxes} text={'Компании'} filter={FilterType.Company} checkedOptions={filterCompany} />
      </div>
    </div>
  )
}

export default FilterMenu