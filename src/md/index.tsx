import { Card } from '../components/Card'
import {useSelector} from 'react-redux'
 import { marked } from 'marked';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css'


let rendererMD:any = null;
const Document = () => {

  const mdRef = useRef<HTMLDivElement>(null)
  
  const mdObj = useSelector((state:any) => state.mdReducer.mdDocument);
  const [content,setContent] = useState<string>('');

  useEffect(() => {
    if(!rendererMD){
      rendererMD = new marked.Renderer()
      marked.setOptions({
        renderer: rendererMD,
        gfm: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
      })
    }

    axios.get(mdObj.url).then(res => {
      if(res?.status == 200){
        setContent(res?.data)
        if (mdRef && mdRef.current) {
          mdRef.current.innerHTML = marked(res?.data)
        }
      }
    })
  },[mdObj?.url])

  console.log(content,'res..')


  return (
    <Card>
      {/* <ReactMarkdown children={content}  /> */}
      <div ref={mdRef} ></div>
  </Card>
  )
}

export default Document;
