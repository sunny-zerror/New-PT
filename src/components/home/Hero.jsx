;
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import BulgeImageThree from '../effect/BulgeImageThree';
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {

  const main_Ref = useRef(null);
  const logoRef = useRef(null);
  const logoRef2 = useRef(null);
  const clipRef = useRef(null);

  useEffect(() => {
    window.addEventListener("load", () => {
      window.scrollTo(0, 0);
      window.lenis?.scrollTo(0, { immediate: true })
      if (window.lenis) window.lenis.stop()
    })

    gsap.set(".animate_logo_div", {
      y: 40,
      scale: 0.3
    })
    gsap.set(".logo_div", {
      opacity: 0
    })
    gsap.to(".loader_left", {
      left: "3%",
      duration: 3.2,
      ease: "expo.inOut",
      delay: .6
    })
    gsap.to(".loader_right", {
      right: "3%",
      duration: 3.2,
      ease: "expo.inOut",
      delay: .6
    })

    gsap.set(".clip_container", {
      scale: .3,
      top: "100%",
      transformOrigin: "50% 66%"
    })
    gsap.to(".animate_logo_div", {
      y: 0,
      scale: 1,
      duration: 1.3,
      ease: "expo.inOut",
      delay: 4.4
    })
    gsap.to(".clip_container", {
      top: "0%",
      duration: 2.1,
      ease: "expo.inOut",
      delay: 2
    })
    gsap.to(".clip_container", {
      top: 0,
      scale: 1,
      duration: 1.5,
      ease: "expo.inOut",
      delay: 4.2
    })
    gsap.to(".loader_left, .loader_right, .percent_inc", {
      opacity: 0,
      duration: 1,
      ease: "expo.inOut",
      delay: 4
    })
    gsap.fromTo(".short_desc p, .short_desc h2", {
      y: 100
    }, {
      y: 0,
      duration: 2,
      ease: "expo.inOut",
      delay: 4.7
    })
    gsap.to(".loader_left, .loader_right, .percent_inc, .animate_logo_div ,.animate_logo_div_parent", {
      display: "none",
      duration: 0,
      ease: "expo.inOut",
      delay: 5.5
    })
    gsap.to(".logo_div", {
      opacity: 1,
      duration: 0,
      ease: "expo.inOut",
      delay: 5.5,
      onComplete: () => {
        window.scrollTo(0, 0);
        window.lenis?.scrollTo(0, { immediate: true })
        window.lenis.start()
      }
    })

  }, [])

  useEffect(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: main_Ref.current,
        start: "top top",
        end: "+=300%",
        scrub: true,
        pin: true,
        // markers: true,
      }

    });

    gsap.set(".logo_image", {
      opacity: 0,
      y: 100
    })


    tl.to([logoRef.current, logoRef2.current], {
      top: 20,
      duration: 1,
    }, "pin");

    tl.to(clipRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
      ease: "ease.out",
      duration: 1,
    }, "pin");

    tl.to(".profile_pic", {
      bottom: "0%",
      duration: 1,
    });

    tl.to(".slide_box", {
      left: "50%",
      duration: 1,
    });

    tl.to(".slide_box", {
      left: "12.5%",
      duration: 1.5,
    }, "pin2");

    tl.to(".profile_pic", {
      height: "100vh",
      width: "100%",
      duration: 1.5,
    }, "pin2");
    tl.to(".profile_pic img", {
      filter: "brightness(.5) grayScale(1)",
      duration: 1.5,
    }, "pin2");

    tl.to([logoRef.current, logoRef2.current, ".log_par"], {
      top: "-65vh",
      duration: 1.5,
    }, "pin2");

    tl.to(".logo_image", {
      y: 0,
      opacity: 1,
      duration: 1,
    }, "pin3");

    tl.to(".slide_box", {
      left: "-13%",
      duration: 1,
    }, "pin3");

    tl.to(".slide_box_upside", {
      bottom: "0%",
      duration: 3,
    }, "pin3");

    tl.to(".logo_div canvas", {
      display: "none",
      duration: .1,
    });

  }, [])

  useEffect(() => {
    if (window.innerWidth < 1020) return

    let percent = 0;
    const el = document.querySelector(".percent");

    const updatePercent = () => {
      if (percent >= 100) return;

      const increment = Math.floor(Math.random() * 10) + 2;
      percent = Math.min(100, percent + increment);

      el.textContent = percent.toString().padStart(2, "0");

      const delay = Math.random() * 300;
      setTimeout(updatePercent, delay);
    };

    updatePercent();
  }, []);

  return (
    <>
      <div ref={main_Ref} className="h-screen w-full overflow-hidden relative">
        <div
          ref={clipRef}
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
          className=" bg-[#FFFBF3] absolute top-0 w-full h-[65vh] z-[10] flex items-end justify-end  "
        >
          <div
            className="animate_logo_div_parent absolute w-full h-fit ">
            <div className=" animate_logo_div  center  h-[16vw]   w-full">
              <img className="w-[96%]" src="/logos/logo_blue.png" alt="" />
            </div>

            <div className=" text-[#18293A] short_desc  w-full px-10 py-4  overflow-hidden text-[16px] flex items-center justify-between">
              <p>Where clarity drives creativity</p>
              <h2>Brand Systems Architect</h2>
              <p>From insight to impact</p>
              <h2 className="vvds_light">Mumbai, India.</h2>
            </div>
          </div>
          <div
            ref={logoRef}
            className=" absolute w-full h-fit ">
            <div className=" logo_div  center  h-[16vw]   w-full">
              {/* <img className="w-[94.8%]" src="/logos/Logo_Dark.svg" alt="" /> */}
              {/* <ProjectCardImage imgUrl="/logos/Logo_Dark.png" /> */}
              <BulgeImageThree imageUrl="/logos/logo_blue.png" />
            </div>

            <div className=" text-[#18293A] short_desc w-full px-10 py-4  overflow-hidden text-[16px] flex items-center justify-between">
              <p>Where clarity drives creativity</p>
              <h2>Brand Systems Architect</h2>
              <p>From insight to impact</p>
              <h2 className="vvds_light">Mumbai, India.</h2>
            </div>
          </div>
        </div>

        <div
          className="absolute text-[#18293A] w-full absolute_center  center z-[10] flex-col ">
          <div className="loader_left pointer-events-none left-[25%]  text-xl absolute top-1/2 translate-y-[-50%]">
            <p>Loading</p>
          </div>
          <div className="loader_right pointer-events-none right-[25%]  text-xl absolute top-1/2 translate-y-[-50%]">
            <p>
              in progress
            </p>
          </div>

          <div className=" pointer-events-none percent_inc absolute translate-y-[7vh] left-[50%] translate-x-[-50%]  ">
            <p>
              [<span className="percent inline-block text-center "> 00 </span>%]
            </p>
          </div>
        </div>

        <div
          className="clip_container overflow-hidden absolute top-0 left-1/2 translate-x-[-50%] w-full h-full center "
        >

          <video
            loop
            autoPlay
            muted
            className="object-cover w-full brightness-50 h-full"
            src="/videos/bg_vid.mp4"
            alt=""
          />
        </div>

        <div className="log_par absolute w-full h-[65vh] flex items-end justify-end ">
          <div
            ref={logoRef2}
            className=" absolute bottom-0 w-full z-[9] h-fit">
            <div className=" logo_div  center  h-[16vw]   w-full">
              {/* <img className="w-[94.8%]" src="/logos/Logo_Dark.svg" alt="" /> */}
              {/* <ProjectCardImage imgUrl="/logos/Logo_Dark.png" /> */}
              <BulgeImageThree imageUrl="/logos/Logo_Light.png" />
            </div>
            <div className=" text-white short_desc w-full px-10 py-4  overflow-hidden text-[16px] flex items-center justify-between">
              <p>Where clarity drives creativity</p>
              <h2>Brand Systems Architect</h2>
              <p>From insight to impact</p>
              <h2 className="vvds_light">Mumbai, India.</h2>
            </div>
          </div>
        </div>
        <div
          className=" profile_pic absolute z-[8] bottom-[-100%] absolute_x_center w-[40%]  h-[80vh]">
          <img className='object-cover brightness-[1] grayscale-[100] w-full h-full' src="/images/piran_pic_new.webp" alt="" />
        </div>

        <div className=" slide_box z-[10] -translate-x-1/2 aspect-square w-[26vw] p-10 text-[1.2vw] absolute text-[#18293A] h-[30vw] bg-[#FFFBF3] bottom-0  left-[125%] flex flex-col justify-between items-center  text-center ">
          <img src="	https://www.archi-malinstudio.com/_vercel/image?url=%2Fimg%2Fpicto%2Fflocon.svg&w=320&q=100" alt="" />
          <div className=" center flex-col gap-5">
            <p className=' xl:text-3xl 2xl:text-4xl mix_light'>
              Helping brands grow by making their story clear.</p>
            <p className=' mt-1 xl:text-3xl 2xl:text-4xl mix_light'>
              Together, we create stories that matter and strategies that work.</p>
          </div>
          <h2 className='text-xl'>The journey starts here.</h2>
        </div>

        <div className=" slide_box_upside  w-[40vw] z-[10] absolute text-white   bottom-[-150%]  right-5 ">
          <h2 className='text-xl mb-6'>My Philosophy on Brands</h2>
          <h2 className='text-xl'>Brand as a Living System</h2>
          <p className='text-4xl leading-none mb-10 mix_light'>A brand isn’t just a logo or product it’s a living, evolving ecosystem made up of stories, values, and people. I help brands grow by staying connected to their true purpose while adapting to their audience.</p>
          <h2 className='text-xl'>Story and Structure</h2>
          <p className='text-4xl leading-none mb-10 mix_light'>Story gives meaning; structure drives progress. I combine emotional storytelling with smart systems so brands don’t just exist, they move forward with intention.</p>
          <h2 className='text-xl'>Ethical Innovation</h2>
          <p className='text-4xl leading-none mb-10 mix_light'>Innovation without purpose is noise. I build with awareness of people, culture and impact ensuring growth that lasts.</p>
        </div>
      </div>
    </>
  )
}

export default Hero