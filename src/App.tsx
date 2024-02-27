import { useState, useEffect, useRef} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

interface JobData{
  address: string,
  com: string,
  content: string,
  link: string,
  name: string,
  title: string,
  color: string
}

export default function App() {
  const [data, setData] = useState([] as JobData[])
  const [homeData, setHomeData] = useState('')
  const [isClose, setIsClose] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const text = useRef<HTMLInputElement>(null!)
  const button = useRef<HTMLButtonElement>(null!)
  const select = useRef<HTMLSelectElement>(null!)

  const toTop = ()=> window.scrollTo(0,0)

  const getHomeData = async()=> {
    try{
      const res = await fetch(import.meta.env.VITE_URL)
      const data = await res.json()
      setHomeData(data)
    }catch(e){
      console.log((e as Error).message)
    }
  }

  const search = async()=>{
    setData([])
    setHasMore(true)
    const city = select.current.value
    const keyWord = text.current.value.trim()
    if(keyWord === '') return
    setIsClose(true)
    setIsLoading(true)
    button.current.disabled = true
    try{
      const res = await fetch(import.meta.env.VITE_URL + `job?key=${keyWord}&page=1&city=${city}`)
      const data = await res.json()
      setTimeout(()=> {button.current.disabled = false}, 2_500)
      setData(data)
      setIsLoading(false)
    }catch(e){
      console.log((e as Error).message)
    }
  }
  
  const getPageData = async(page: Number)=> {
    const city = select.current.value
    const keyWord = text.current.value.trim()
    if(keyWord === '') return
    try{
      const res = await fetch(import.meta.env.VITE_URL + `job?key=${keyWord}&page=${page}&city=${city}`)
      const data = await res.json()
      if(data.length === 0) setHasMore(false)
      setData(pre=>[...pre, ...data])
    }catch(e){
      console.log((e as Error).message)
    }
  }

  useEffect(()=>{
    getHomeData()
  },[])

  useEffect(()=>{
    getPageData(page)
  },[page])

  return (
    <>
      <h1 className='text-[160px] md:text-[180px] font-black w-full text-center'>
        <span className='text-[#b25252]'>N</span>
        <span className='text-[#dcd762]'>u</span>
        <span className='text-[#44bea6]'>l</span>
        <span className='text-[#8c44ab]'>i</span>
      </h1>
      <span onClick={toTop} className='fixed right-2 md bottom-2 z-10 w-[60px] h-[60px] text-center text-[20px] leading-[58px] font-bold rounded-[50%] cursor-pointer text-[#fff] border-2 hover:border-[#000] bg-[#000] hover:bg-[#fff] hover:text-[#000] xl:right-10 xl:bottom-10'>
        置頂
      </span>
      <div className='w-full flex justify-center items-center'>
        <input ref={text} placeholder='請輸入工作名稱...'/>
        <select ref={select} className='border-[5px] h-[60px] text-[20px] md:text-[24px] outline-none font-black mx-2 rounded-md border-[#000]'>
          <option value="kl">基隆市</option>
          <option value="tp">台北市</option>
          <option value="xb">新北市</option>
          <option value="ty">桃園市</option>
        </select>
        <button ref={button} onClick={search}>🔍</button>
      </div>
      <section className='mt-12'>
        {isClose || <p className='text-[20px] lg:text-[25px] font-black p-3 w-full sm:text-center'>{homeData}</p>}
        {isLoading ? 
          <span className='block w-full text-center text-[50px] font-black'>
            爬蟲中請稍後......
          </span> 
          :
          <InfiniteScroll 
            dataLength={data.length} 
            next={()=> setPage(prev => prev += 1)}
            hasMore={hasMore}
            loader={
              <span className='block text-[50px] text-center font-bold'>
                爬蟲中請稍後......
              </span>
            } 
          >
            {data?.map((job: JobData)=>(
            <article key={crypto.randomUUID()} className='w-full flex justify-center flex-wrap'>
              <a href={job.link} target='_blank' className='block border-2 bg-[#fff] border-[#000] rounded-md my-8 mx-5 md:mx-20 md:my-6 p-4 md:py-8 font-black relative hover:bg-[#ffe3fd] shadow-md hover:shadow-lg shadow-[#777] hover:shadow-[#555] w-[1024px]'>
                <span className='absolute top-[-20px] left-[-15px] px-3 py-1 border-2 border-[#000]' style={{background: job.color}}>
                  {job.name}
                </span>
                <h2 className='text-[22px] text-[#b25252]'>
                  {job.title}
                </h2>
                <div className='md:flex text-[#44bea6] my-2'>
                  <h3 className='mr-5 text-[18px]'>{job.com}</h3>
                  <address className=' leading-[26px]'>{job.address}</address>
                </div>
                <p className='md:mt-3 text-[#8c44ab]'>{job.content}</p>
              </a>
            </article>
          ))}
          </InfiniteScroll>
        }
      </section>
      { isClose ||
        <div className="absolute bottom-6 w-full flex justify-center">
          <footer className=" md:px-5 md:text-[18px] font-black">
            © 2024 All Rights Reserved. Designed By Wayne
          </footer>
        </div>
      }
    </>
  )
}