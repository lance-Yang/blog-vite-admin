import { Card as CustomCard } from 'antd'
import classnames from 'classnames'

import styles from './styles/index.module.css'

interface CardTypes {
  title?: string
  className?: string
  children: React.ReactNode
  style?: object
}

const Card: React.FC<CardTypes> = props => {
  const { title, className, style, children, ...rest } = props

  const classname = classnames(
    {
      [styles.card]: true
    },
    className
  )

  return (
    <CustomCard className={classname} style={{ ...style }} {...rest}>
      {children}
    </CustomCard>
  )
}

export default Card
