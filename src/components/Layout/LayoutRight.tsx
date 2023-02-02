import { Typography, Button } from 'antd'

import { Card } from '../Card'
import Icon from '../Icon'
import styles from './index.module.css'
import avatar from '../../assets/avatar.jpg'

const { Title, Text } = Typography

const LayoutRight = () => {
  return (
    <>
      <Card>
        <div className={styles.personal_header}>
          <img
            src={avatar}
            alt='avatar'
            width={100}
            height={100}
            style={{ borderRadius: '50%' }}
          />
          <Title level={2}>xxxx</Title>
        </div>
        <div className={styles.personal_title}>
          <div>
            <div>
              <Text type='secondary'>文章</Text>{' '}
            </div>
            <div>
              <Text type='secondary'>11</Text>
            </div>
          </div>
          <div>
            <div>
              <Text type='secondary'>标签</Text>
            </div>
            <div>
              <Text type='secondary'>11</Text>
            </div>
          </div>
          <div>
            <div>
              <Text type='secondary'>分类</Text>
            </div>
            <div>
              <Text type='secondary'>11</Text>
            </div>
          </div>
        </div>
        <Button
          type='primary'
          icon={<Icon name='fa-github' />}
          style={{ width: '100%', marginTop: 16 }}
        >
          GitHub
        </Button>
      </Card>
      <Card>
        <div>
          <Icon className={styles.icon_shape} name='fa-bullhorn' /> 公告
        </div>
        <Text type='secondary'>This is my blog</Text>
      </Card>
      <Card>
        <div>
          <Icon name='fa-history' /> 最新文章
        </div>
        <Text type='secondary'>This is my blog</Text>
      </Card>
    </>
  )
}

export default LayoutRight
