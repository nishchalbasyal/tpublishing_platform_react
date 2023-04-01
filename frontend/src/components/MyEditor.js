import React, { useState } from 'react';
import ReactQuill,{Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
 import { ImageResize } from 'quill-image-resize';
 Quill.register('modules/imageResize', ImageResize);


function MyEditor() {
  const [text, setText] = useState('');




  function handleChange(value) {
    setText(value);
  }

  function handleImageUpload(file) {
    return new Promise (function(resolve, reject) {
      const formData = new FormData();
      formData.append('image', file);

      fetch('/upload/image', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(result => {
        resolve(result.url);
      })
      .catch(error => {
        console.error(error);
        reject('Upload failed');
      });
    });
  }

  function handleImageFetch(url, callback) {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onload = () => {
          callback(reader.result);
        };
        reader.readAsDataURL(blob);
      })
      .catch(error => {
        console.error(error);
        callback('');
      });
  }

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'},
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    imageResize: {
      displayStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white'
      },
      modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
    },
    imageDrop: true,
    imageFetch: handleImageFetch,
    imageUpload: handleImageUpload
  };
    

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  return (
    <ReactQuill
      value={text}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      style={{fontSize:"28"}}
    />
  );
}


export default MyEditor;
