import { RiArrowUpLine } from '@remixicon/react'
import gsap from 'gsap'
import React, { useEffect } from 'react'

const Header = () => {


  useEffect(() => {
    if (window.innerWidth < 1020) {
      gsap.set(".lin , .mob_logo_image", { y: -10, opacity: 0 })
      gsap.to(".lin , .mob_logo_image", {
        y: 0,
        opacity: 1,
        delay: 5,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
      })
    } else {
      gsap.set(".lin , .mob_logo_image", { y: -10, opacity: 0 })
      gsap.to(".lin , .mob_logo_image", {
        y: 0,
        opacity: 1,
        delay: 5.5,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
      })
    }

  }, [])


  return (
    <nav>
      <div className=" fixed w-fit  block  w-56 z-[999] p-5">
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className=" cursor-pointer block overflow-hidden">
          <img className=' w-[4vw] mob_logo_image  ' src="/logos/MenuLogo.svg" alt="" />
        </div>
      </div>
      <div className=" lg:hidden logo_paren fixed block p-3 z-[999] ">
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="logo cursor-pointer block overflow-hidden">
          <img className=' w-[12vw] md:w-[5vw] mob_logo_image opacity-0 ' src="/logos/MenuLogo.svg" alt="" />
        </div>
      </div>
      <div className="absolute top-0 w-full z-[16] flex items-center justify-end p-3 lg:p-5">
        <div className=" capitalize flex text-sm lg:text-base flex-col text-end items-end">
          {["Instagram", "LinkedIn", "Behance"].map((label, i) => (
            <div key={i} className=" w-fit h-fit  overflow-hidden group flex gap-1 items-center justify-end cursor-pointer relative transition duration-300">
              <h2
                key={label}
                className='cursor-pointer text-[#18293A] lin opacity-0  '
              >
                <span className=' group-hover:w-[100%] w-0 cursor-pointer transition-all rounded-full duration-300 absolute h-[2px] bg-[#18293A] bottom-0' ></span>
                {label}
              </h2>
              <img className='w-3 lin opacity-0 cursor-pointer  ' src="https://www.archi-malinstudio.com/img/arrow.svg" alt="" />
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Header
