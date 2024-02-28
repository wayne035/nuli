import React from "react"

interface Props{
  setSelect: React.Dispatch<React.SetStateAction<string>>
}

export default function Select({setSelect}:Props) {
  const selectValue = (e: React.ChangeEvent<HTMLSelectElement>)=>{
    setSelect(e.target.value)
  }
  
  return (
    <select onChange={selectValue} className='border-[5px] h-[50px] md:text-[20px] outline-none font-black mx-2 rounded-md border-[#000]'>
      <optgroup label="北部">
        <option value="kl">基隆市</option>
        <option value="tp">台北市</option>
        <option value="xb">新北市</option>
        <option value="ty">桃園市</option>
        <option value="hc">新竹縣市</option>
        <option value="ml">苗栗縣</option>
      </optgroup>
      <optgroup label="中部">
        <option value="tc">台中市</option>
        <option value="nt">南投縣</option>
        <option value="ch">彰化縣</option>
        <option value="yl">雲林縣</option>
      </optgroup>
      <optgroup label="東部">
        <option value="yil">宜蘭縣</option>
        <option value="hl">花蓮縣</option>
        <option value="tt">台東縣</option>
      </optgroup>
    </select>
  )
}