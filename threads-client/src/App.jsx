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
        enter thread link
      <input {...register("url")} />
      <input type="submit" />
      </form>
      {downloadLink ? <a href={downloadLink}>indir</a> : "gecerli bir link girin"} 
    </>
  )
}

export default App
