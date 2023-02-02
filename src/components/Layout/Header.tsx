import { Col, Row, Menu } from 'antd'
import {useNavigate} from 'react-router-dom'

import MenuProps from './MenuProps'


const Header = () => {

  const navigate = useNavigate()

  const handleSwitch = (item:any) => {
    console.log(item,'item....');
    navigate(item?.key)
  }

  return (
    <Row justify='space-between' align='middle'>
      <Col span={4} style={{color:'black'}}>Blog</Col>
      <Col span={20} >
        <Menu mode='horizontal' items={MenuProps} onClick={handleSwitch} />
      </Col>
    </Row>
  )

}
export default Header
