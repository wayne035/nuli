import { useState, useEffect, useRef} from 'react'
import Article from './components/Article'
import Select from './components/Select'
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
  const [notFound, setNotFound] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [select, setSelect] = useState('kl')
  const text = useRef<HTMLInputElement>(null!)
  const button = useRef<HTMLButtonElement>(null!)

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
    const city = select
    const keyWord = text.current.value.trim()
    setIsClose(true)
    if(keyWord === ''){
      setHasMore(false)
      setNotFound(true)
      return
    }
    setHasMore(true)
    setIsLoading(true)
    setNotFound(false)
    button.current.disabled = true
    try{
      const res = await fetch(import.meta.env.VITE_URL + `job?key=${keyWord}&page=1&city=${city}`)
      const data = await res.json()
      if (data.length === 0){
        setHasMore(false)
        setNotFound(true)
      }
      setTimeout(()=> {button.current.disabled = false}, 2_500)
      setData(data)
      setIsLoading(false)
    }catch(e){
      console.log((e as Error).message)
    }
  }
  
  const getPageData = async(page: Number)=> {
    const city = select
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
        <Select  setSelect={setSelect}/>
        <button ref={button} onClick={search}>🔍</button>
      </div>
      <section className='mt-12'>
        {isClose || <p className='text-[20px] lg:text-[25px] font-black p-3 w-full sm:text-center'>{homeData}</p>}
        {isLoading ? 
          <span className='block w-full text-center text-[50px] font-black'>
            爬蟲中請稍後......
          </span> 
          : 
          notFound ?
            <span className='block w-full text-center text-[20px] md:text-[35px] font-black text-[#f00]'>
              找不到相關工作，請換其他關鍵字試試...
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
              <Article data={data}/>
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