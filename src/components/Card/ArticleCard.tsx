import {  Typography } from 'antd'
import Icon from '../Icon'
import Card from './Card'



const { Title, Text, Paragraph } = Typography

export interface ArticleCardType {
  title: string;
  date: Date;
  tag: string;
  commentNum: number
  content: string;
  onTtleClik():void;
  url: string
}


export default function ArticleCard (props: ArticleCardType) {

  return (
    <Card>
      <Title level={2}  onClick={props.onTtleClik}>{props.title}</Title>
      <div className='card_tools'>
        <div>
          <Icon name='fa-calendar' />
          <Text type='secondary'>{`发表于 ${props.date}`}</Text>
        </div>
        <span className='splic'>|</span>
        <div>
          <Icon name='fa-tag' />
          <Text type='secondary'>{props.tag}</Text>
        </div>
        <span className='splic'>|</span>
        <div>
          <Icon name='fa-comments' />
          <Text type='secondary'>{`${props.commentNum}条评论`}</Text>
        </div>
        <div style={{ overflow: 'hidden', marginTop: 16 }}>
          <Paragraph ellipsis type='secondary'>
            {props.content}
          </Paragraph>
        </div>
      </div>
    </Card>
  )
}
