import { ChangeEvent } from 'react'
import { CheckBoxType, FilterType } from '../../../types/types'
import styles from './Checkbox.module.scss'
import { useAppDispatch } from '../../../hooks'
import { toggleFilter } from '../../../redux/ticketsSlice'

interface CheckboxProps {
  options: CheckBoxType[],
  text: string,
  filter: FilterType,
  checkedOptions: string[]
}

const Checkbox = ({ options, text, filter, checkedOptions }: CheckboxProps) => {
  const dispatch = useAppDispatch()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleFilter({value: (e.target as HTMLInputElement).value, filter}))
  }

  return (
    <div className={styles.menu}>
      <span className={styles.span}>{text}</span>
      {options.map(option =>
        <div key={option.id}>
          <input
            type="checkbox"
            id={option.text}
            value={option.id}
            className={styles.checkbox}
            checked={checkedOptions.includes(option.id)}
            onChange={handleChange}
          />
          <label htmlFor={option.text} className={`${styles[filter]} ${styles.label}`}>{option.text}</label>
        </div>
      )}
    </div>
  )
}

export default Checkbox