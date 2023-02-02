import { MenuProps } from 'antd'
import {
  SearchOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  FolderOpenOutlined,
  TagOutlined,
  ToolOutlined,
  HeartOutlined,
  LinkOutlined
} from '@ant-design/icons'

const items: MenuProps['items'] = [
  {
    label: '搜索',
    key: 'search',
    icon: <SearchOutlined />
  },
  {
    label: '首页',
    key: '/home',
    icon: <HomeOutlined />
  },
  {
    label: '目录',
    key: '/catalogue',
    icon: <UnorderedListOutlined />,
    children: [
      {
        key: 'classification',
        label: '分类',
        icon:<FolderOpenOutlined />,
      },
      {
        key: 'tags',
        label: '标签',
        icon:<TagOutlined />
      }
    ]
  },
  {
    label: '工具',
    key: 'utils',
    icon: <ToolOutlined />
  },
  {
    label: '关于',
    key: '/about',
    icon: <HeartOutlined />
  },
  {
    label: '链接',
    key: '/link',
    icon: <LinkOutlined />
  }
]

export default items
