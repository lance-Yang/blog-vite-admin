import { Card } from '../components/Card'

import './index.css'

const LinkPage = () => {
    console.log('about.............')
  return <Card>
     <div className="container">
        <div className="box">
            <div className="front">
                <div className="icon">
                    {/* <i className="fa fa-apple" aria-hidden="true"></i> */}
                </div>
                <span>apple</span>
            </div>
            <div className="back">
                <span>apple</span>
                <p>苹果公司（Apple Inc. ）是美国一家高科技公司。由史蒂夫·乔布斯、斯蒂夫·盖瑞·沃兹尼亚克和罗纳德·杰拉尔德·韦恩（Ron Wayne）等人于1976年4月1日创立。</p>
            </div>
        </div>
        <div className="box">
            <div className="front">
                <div className="icon">
                    <i className="fa fa-google" aria-hidden="true"></i>
                </div>
                <span>google</span>
            </div>
            <div className="back">
                <span>google</span>
                <p>谷歌公司（Google Inc.）成立于1998年9月4日，由拉里·佩奇和谢尔盖·布林共同创建，被公认为全球最大的搜索引擎公司。</p>
            </div>
        </div>
        <div className="box">
            <div className="front">
                <div className="icon">
                    <i className="fa fa-windows" aria-hidden="true"></i>
                </div>
                <span>microsoft</span>
            </div>
            <div className="back">
                <span>microsoft</span>
                <p>微软（Microsoft）是一家美国跨国科技企业，由比尔·盖茨和保罗·艾伦于1975年4月4日创立。公司总部设立在华盛顿州雷德蒙德（Redmond，邻近西雅图）。</p>
            </div>
        </div>
    </div>
  </Card>
}

export default LinkPage;
