interface JobData{
    address: string,
    com: string,
    content: string,
    link: string,
    name: string,
    title: string,
    color: string
  }

export default function Article({data}:{data: JobData[]}) {
  return (
    <>
      {data?.map((job: JobData)=>(
        <article key={crypto.randomUUID()} className='w-full flex justify-center flex-wrap relative'>
          <a href={job.link} id='job-link' target='_blank' className='block border-2 bg-[#fff] border-[#000] rounded-md my-8 mx-5 md:mx-20 md:my-6 p-4 pt-9 md:pb-9 font-black relative shadow-md hover:shadow-lg shadow-[#777] hover:shadow-[#555] w-[1024px] overflow-hidden'>
            <span className='absolute top-0 left-[-10px] px-3 py-1 z-10 rounded-b-md' style={{background: job.color}}>
              {job.name + '人力銀行'}
            </span>
            <h2 className='text-[22px] text-[#b25252]'>
              {job.title}
            </h2>
            <div className='md:flex text-[#44bea6] my-2'>
              <h3 className='mr-5 text-[18px]'>{job.com}</h3>
              <address className=' leading-[26px]'>{job.address}</address>
            </div>
            <p className='md:mt-3 text-[#8c44ab]'>{job.content}</p>
            <span className="cover">立即應徵...👆</span>
          </a>
        </article>
      ))}
    </>
  )
}