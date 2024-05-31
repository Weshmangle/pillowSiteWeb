import { useRef , useEffect , useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';


const Tiny = ({value}) => {
    
  const editorRef = useRef(null)
  const [content, setContent] = useState(value)
  
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }
  
  return (
    <>
      <Editor
        apiKey='nvu6k8wve5lh27wu40a7k7fgd8le9rmso8v9tx9kfv57yx7w'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue={content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  )
}

export default Tiny