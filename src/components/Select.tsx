import React from "react"

interface Props{
  setSelect: React.Dispatch<React.SetStateAction<string>>
}

export default function Select({setSelect}:Props) {
  const selectValue = (e: React.ChangeEvent<HTMLSelectElement>)=>{
    setSelect(e.target.value)
  }
  
  return (
    <select onChange={selectValue} className='border-[5px] h-[60px] text-[20px] md:text-[24px] outline-none font-black mx-2 rounded-md border-[#000]'>
          <option value="kl">基隆市</option>
          <option value="tp">台北市</option>
          <option value="xb">新北市</option>
          <option value="ty">桃園市</option>
    </select>
  )
}