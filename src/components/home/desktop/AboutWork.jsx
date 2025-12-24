
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import React, { useEffect } from 'react'
gsap.registerPlugin(ScrollTrigger)

const AboutWork = () => {

    useEffect(() => {
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about_work_paren",
                start: "top top",
                end: "+=400%",
                pin: true,
                scrub: true,
            },
        })
        tl.from(".spn_other_above", {
            top: "50%"
        })
        tl.from(".spn_other_below", {
            bottom: "50%"
        }, "<")
        tl.to(".split_txt_about", {
            x: -400,
            ease: "linear",
        })
        tl.from(".spn_slide_paren", {
            left: "100%",
            ease: "linear",
        }, "<")
        tl.fromTo(".spn_slide", {
            top: "30%",
        }, {
            top: "-25vw",
            duration: 1.8,
        }, "pin5");

        tl.to(".spn_1", {
            opacity: 0.05,
            delay: 0.1,
            duration: .05,
        }, "pin5");
        tl.fromTo(".spn_2", {
            opacity: 0.05,
        }, {
            opacity: 1,
            delay: 0.15,
            duration: .05,
        }, "pin5");

        tl.to(".spn_2", {
            opacity: 0.05,
            duration: .05,
            delay: 0.35,
        }, "pin5");
        tl.fromTo(".spn_3", {
            opacity: 0.05,
        }, {
            opacity: 1,
            delay: 0.35,
            duration: .05,
        }, "pin5");
        tl.to(".spn_3", {
            opacity: 0.05,
            duration: .05,
            delay: 0.65,
        }, "pin5");
        tl.fromTo(".spn_4", {
            opacity: 0.05,
        }, {
            opacity: 1,
            delay: 0.65,
            duration: .05,
        }, "pin5");
        tl.to(".spn_4", {
            opacity: 0.05,
            duration: .05,
            delay: 0.95,
        }, "pin5");
        tl.fromTo(".spn_5", {
            opacity: 0.05,
        }, {
            opacity: 1,
            delay: 0.95,
            duration: .05,
        }, "pin5");
    }, [])

    return (
        <>
            <div className=" about_work_paren overflow-hidden relative center w-full h-screen text-[#6BB7CF] ">
                <div className="spn_slide_paren h-screen  w-full absolute z-10 top-0 left-0 bg-[#FFFBF3] ">
                    <div className="  spn_slide absolute top-[30%]  center w-[100%] ">
                        <h2 className='text-black text-[3.2vw] w-[72%]  text-justify  leading-none'>
                            <span className='spn_1'>
                                I believe the strongest brands are built where story and strategy work together. A clear narrative shapes how people connect, and a solid plan makes sure that connection lasts.
                            </span>
                            <span className='spn_2 opacity-[.1]'>
                                My role isn’t about making things look good, it’s about making sure they work. I focus on building the systems, decisions, and structures that help a brand thrive in the long run.
                            </span>
                            <span className='spn_3 opacity-[.1]'>
                                Every project starts with clarity. I dig deep to understand what a brand stands for, how it operates, and where it wants to go. That understanding guides every move we make.
                            </span>
                            <span className='spn_4 opacity-[.1]'>
                                From there, I align purpose with process making sure that the story a brand tells is backed by a strategy that can adapt, scale, and stay relevant.
                            </span>
                            <span className='spn_5 opacity-[.1]'>
                                What follows are examples of this approach in action: work where the creative is supported by solid strategy, and where ideas are built to last.
                            </span> &nbsp;
                        </h2>

                    </div>
                </div>

                <div className="split_txt_about w-full relative h-screen">

                    <h2 className='absolute top-1/2 -translate-y-1/2 z-[12] left-1/2 text-3xl font-semibold text-black -translate-x-1/2'>MY APPROACH</h2>

                    <div className=" spn_other_above top-[8%]  -translate-y-1/2 py-2 absolute z-[4] w-full  bg-[#fffbf3] center">
                        <img className='w-[97%] opacity-20' src="/images/how_i_work_txt.png" alt="" />
                    </div>
                    <div className=" spn_other_above top-[22%] -translate-y-1/2 py-2 absolute z-[6] w-full  bg-[#fffbf3] center">
                        <img className='w-[97%] opacity-30' src="/images/how_i_work_txt.png" alt="" />
                    </div>
                    <div className=" spn_other_above top-[36%]  -translate-y-1/2 py-2 absolute z-[8] w-full  bg-[#fffbf3] center">
                        <img className='w-[97%] opacity-60' src="/images/how_i_work_txt.png" alt="" />
                    </div>
                    <div className=" spn_center top-1/2  -translate-y-1/2 py-2 absolute z-[10] w-full bg-[#fffbf3] center">
                        <img className='w-[97%]' src="/images/how_i_work_txt.png" alt="" />
                    </div>
                    <div className=" spn_other_below bottom-[36%]  translate-y-1/2 py-2 absolute z-[8] w-full  bg-[#fffbf3] center">
                        <img className='w-[97%] opacity-60' src="/images/how_i_work_txt.png" alt="" />
                    </div>
                    <div className=" spn_other_below bottom-[22%] translate-y-1/2 py-2 absolute z-[6] w-full  bg-[#fffbf3] center">
                        <img className='w-[97%] opacity-30' src="/images/how_i_work_txt.png" alt="" />
                    </div>
                    <div className=" spn_other_below bottom-[8%]  translate-y-1/2 py-2 absolute z-[4] w-full  bg-[#fffbf3] center">
                        <img className='w-[97%] opacity-20' src="/images/how_i_work_txt.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutWork