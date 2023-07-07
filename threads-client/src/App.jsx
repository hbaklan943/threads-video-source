import './App.css'
import axios from 'axios';
import { useState } from 'react';
import { useForm } from "react-hook-form"

function App() {
  const [downloadLink, setDownloadLink] =useState("")
  const { register, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(isSubmitting);

  const onSubmit = data => {
    setIsSubmitting(true)
    axios.post("/api/download", data)
      .then(res => {
        if(res.data.downloadLink) {
          setDownloadLink(res.data.downloadLink)
        }
      })
      .catch(err => console.log(err))
      .finally(()=> {setIsSubmitting(false)})
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Enter thread link</h1>
        <input type='text' {...register("url")} />
        <input type="submit" disabled={isSubmitting}/>
        
      </form>
      {downloadLink ? <button><a href={downloadLink}>Download</a></button> : "Enter a valid link"} 
    </>
  )
}

export default App
