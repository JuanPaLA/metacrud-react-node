import React, { useEffect, useState } from 'react'

export default function Text({input, handleValue}) {
  const [data, setData] = useState(input);
  const [id, setId] = useState(input[0]);
  const [value, setValue] = useState(input[1].value);
  const [required, setRequired] = useState(input[1].required);

  useEffect(()=>{
    var event = {
      target : {
        name: id,
        value: value
      }
    }
    handleValue(event)
  },[value])


  return (
    <>
    {data &&
    <>
        <label htmlFor={id}>{id}</label>
        <input           
          required={data[1].required}
          name={id} 
          id={id} 
          type="text" 
          value={value}
          placeholder={value}
          onChange={(e) => setValue(e.target.value)} />
        <br></br>
        </>
    }  
    </>
  )
}

