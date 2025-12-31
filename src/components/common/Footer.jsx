import React from 'react'

const Footer = () => {
  return (
    <>
      <div className="w-full  text-white px-20 pb-10 h-[50vw] items-end overflow-hidden  flex bg-[#18293A] ">
        <div className="w-[65%]">
        {/* <img className='cover' src="https://ghuynguyen.vercel.app/images/Contact/Contact.png" alt="" /> */}
          <h2 className='text-5xl capitalize vvds_light w-[60%]'>Bridging the gap between humans and digital experiences</h2>
        </div>
        <div className="w-[35%] ">

          <div className="space-y-10">
            <div className="">
              <h2 className='text-sm vvds_light'>For Work</h2>
              <h2 className='text-3xl vvds_light'>piran@gmail.com</h2>
            </div>
            <div className=" relative z-20 capitalize flex gap-x-20 w-full ">
              {["Instagram", "LinkedIn", "Behance"].map((label, i) => (
                <div key={i} className="  w-fit overflow-hidden group flex gap-1 items-center justify-end cursor-pointer relative transition duration-300">
                  <h2
                    key={label}
                    className='cursor-pointer vvds_light text-[#ffffff] '
                  >
                    {label}
                  </h2>
                  <img className='w-3 invert-100   ' src="https://www.archi-malinstudio.com/img/arrow.svg" alt="" />
                    <div className=' group-hover:w-full w-0 left-0 cursor-pointer transition-all rounded-full duration-300 absolute h-[1px] bg-white bottom-0' ></div>
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