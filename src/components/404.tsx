import NotFoundImg from '../assets/404.png'
import { Card } from './Card'

const NotFound = () => {
  return (
    <img
      src={NotFoundImg}
      style={{ width: '100%', height: '400px', textAlign: 'center' }}
      alt='404'
    />
  )
}

export default NotFound
