import React from 'react'

const Footer = () => {
  return (
    <>
      <div className="w-full background px-20 pb-10 h-[50vw] items-end overflow-hidden  flex text-[#18293A] ">
        <div className="w-1/2">
        {/* <img className='cover' src="https://ghuynguyen.vercel.app/images/Contact/Contact.png" alt="" /> */}
          <h2 className='text-5xl vvds_light w-[80%]'>Bridging the gap between humans and digital experiences</h2>
        </div>
        <div className="w-1/2 pl-32 ">

          <div className="space-y-10">
            <div className="">
              <h2 className='text-sm'>For Work:</h2>
              <h2 className='text-3xl vvds_light'>piran@gmail.com</h2>
            </div>
            <div className=" capitalize flex w-full gap-20">
              {["Instagram", "LinkedIn", "Behance"].map((label, i) => (
                <div key={i} className=" w-fit overflow-hidden group flex gap-1 items-center justify-end cursor-pointer relative transition duration-300">
                  <h2
                    key={label}
                    className='cursor-pointer text-[#18293A]   '
                  >
                    <span className=' group-hover:w-[100%] w-0 cursor-pointer transition-all rounded-full duration-300 absolute h-[2px] bg-[text-[#18293A]] bottom-0' ></span>
                    {label}
                  </h2>
                  <img className='w-3   ' src="https://www.archi-malinstudio.com/img/arrow.svg" alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Footer