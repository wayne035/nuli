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
    </>
  )
}