import React, { useEffect } from 'react'
import classnames from 'classnames'

interface IconTypes {
  name: string
  className?: string
  style?: React.CSSProperties
}

const Icon: React.FC<IconTypes> = props => {
  const { name, className, style, ...otherProps } = props

  const classString = classnames(`fa ${name} fa-fw`, {}, className)

  return (
    <i
      className={classString}
      aria-hidden='true'
      style={{ marginRight: 4, ...style }}
      {...otherProps}
    />
  )
}

export default Icon
