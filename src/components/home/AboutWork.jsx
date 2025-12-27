
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
                pin: true,
                scrub: true,
            },
        })
        tl.from(".spn_other_above", {
            top: "50%",
            ease: "linear",
        })
        tl.from(".spn_other_below", {
            bottom: "50%",
            ease: "linear",
        }, "<")

        const paralex_tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about_work_paren",
                start: "bottom 99%",
                scrub: true,
            },
        })
        paralex_tl.to(".split_txt_about", {
            y: 500,
            ease: "linear",
            opacity: 0,
        })

        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".spn_slide_paren",
                start: "20% 60%",
                end: "80% 60%",
                scrub: true,
            },
        });

        const fadeIn = 0.2;
        const fadeOut = 0.2;
        const gap = 0.5;

        gsap.set(" .spn_2, .spn_3, .spn_4, .spn_5", {
            opacity: 0.05,
        });

        tl2
            // 1
            .to(".spn_1", { opacity: 0.05, duration: fadeOut }, `+=${gap}`)

            // 2
            .to(".spn_2", { opacity: 1, duration: fadeIn })
            .to(".spn_2", { opacity: 0.05, duration: fadeOut }, `+=${gap}`)

            // 3
            .to(".spn_3", { opacity: 1, duration: fadeIn })
            .to(".spn_3", { opacity: 0.05, duration: fadeOut }, `+=${gap}`)

            // 4
            .to(".spn_4", { opacity: 1, duration: fadeIn })
            .to(".spn_4", { opacity: 0.05, duration: fadeOut }, `+=${gap}`)

            // 5
            .to(".spn_5", { opacity: 1, duration: fadeIn });

    }, [])

    return (
        <>
            <div className=" about_work_paren  relative center w-full h-screen">
                <div className="split_txt_about w-full relative h-screen">

                    {/* <h2 className='absolute top-1/2 -translate-y-1/2 z-[12] left-1/2 text-3xl mix-blend-difference font-semibold text-[#ffffff] -translate-x-1/2'>MY APPROACH</h2> */}

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
            <div className="spn_slide_paren relative py-[10vw]  w-full  z-10 bg-transparent ">
                <div className="  spn_slide    center w-[100%] ">
                    <h2 className='text-[#18293A] text-[3.2vw] w-[72%]  text-justify  leading-none'>
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
        </>
    )
}

export default AboutWork