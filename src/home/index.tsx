import { CardArticle } from '../components/Card'

import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'

import axios from 'axios'
import {setMdDocument} from '../store/reducer/mdSlice'

const Home = () => {


  const navigate = useNavigate();
  const dispatch  = useDispatch();
  const url = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-78abecd5-154a-4bdc-90ef-f4959377f1bc/74d50ee9-c886-4b8e-875f-3faadd9fef55.md';
   


  const cardArticleProps = {
    title: 'xxx',
    url:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-78abecd5-154a-4bdc-90ef-f4959377f1bc/74d50ee9-c886-4b8e-875f-3faadd9fef55.md',
    date: new Date(),
    commentNum: 0,
    content:
      ' Ant Design, a design language for background applications, isrefined by Ant UED Team. Ant Design, a design language forbackground applications, is refined by Ant UED Team. Ant Design,a design language for background applications, is refined by AntUED Team. Ant Design, a design language for backgroundapplications, is refined by Ant UED Team. Ant Design, a designlanguage for background applications, is refined by Ant UEDTeam. Ant',
    tag: 'Hexo',
    onTtleClik:async() => {
      navigate(`/md/${'001'}`)
      dispatch(setMdDocument({url}))
    }
  };

  return (
    <>
      <CardArticle {...cardArticleProps} />
      <CardArticle {...cardArticleProps} />
      <CardArticle {...cardArticleProps} />
      <CardArticle {...cardArticleProps} />
      <CardArticle {...cardArticleProps} />
      <CardArticle {...cardArticleProps} />
    </>
  )
}

export default Home
