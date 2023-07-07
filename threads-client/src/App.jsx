import './App.css'
import axios from 'axios';
import { useState } from 'react';
import { useForm } from "react-hook-form"

function App() {
  const [downloadLink, setDownloadLink] =useState("")
  const { register, handleSubmit } = useForm();


  const onSubmit = data => {
    axios.post("http://localhost:3001/api/download", data)
      .then(res => {
        if(res.data.downloadLink) {
          setDownloadLink(res.data.downloadLink)
        }
      })
      .catch(err => console.log(err))
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Enter thread link</h1>
        <input type='text' {...register("url")} />
        <input type="submit" />
        
      </form>
      {downloadLink ? <button><a href={downloadLink}>Download</a></button> : "Enter a valid link"} 
    </>
  )
}

export default App
