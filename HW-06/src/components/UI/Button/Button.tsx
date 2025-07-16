import { ReactNode } from 'react'
import styles from './Button.module.scss'
import { SortType } from '../../../types/types'

interface ButtonProps {
  children: ReactNode,
  className?: string,
  active?: boolean,
  id?: SortType,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ children, className, active = true, onClick, id }: ButtonProps) => {
  return (
    <button
      className={[
        className,
        styles.button,
        active && styles.button_active
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      id={id}
    >
      {children}
    </button>
  )
}

export default Button