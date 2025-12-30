import { useEffect, useMemo, useRef, useState } from "react";
import Parallax from "parallax-js";
import gsap from "gsap";
import { galleryData } from "@/data/galleryData";
import Image from "next/image";
import InfiniteCarousel from "./InfiniteCarousel";

const Gallery = () => {
    const [openGallerySwiper, setOpenGallerySwiper] = useState(false)
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const textBoxRef = useRef(null);
    const parallaxRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        if (!sceneRef.current || !containerRef.current) return;

        parallaxRef.current = new Parallax(sceneRef.current, {
            relativeInput: true,
            hoverOnly: true,
            frictionX: 0.08,
            frictionY: 0.1,
            scalarX: 1000,
            scalarY: 450,
        });

        return () => {
            parallaxRef.current?.disable();
            parallaxRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!textBoxRef.current) return;

        if (activeIndex !== null) {
            gsap.to(textBoxRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: "power3.out",
            });
        } else {
            gsap.to(textBoxRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power3.inOut",
            });
        }
    }, [activeIndex]);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".wht_built_pren",
                start: "top 60%",
                toggleActions: "play none none reverse",
            },
        })
        tl.fromTo(
            ".counter",
            { innerText: 0 },
            {
                innerText: (i, el) => el.dataset.count,
                duration: 1.2,
                ease: "power2.out",
                snap: { innerText: 1 },
                onUpdate: function () {
                    this.targets().forEach(el => {
                        el.innerHTML = `${Math.round(el.innerText)}+`
                    })
                },
            },
        )
        tl.to(".tin_line", {
            width: "100%",
            ease: "expo.out",
            duration: 1,
            stagger: 0.2
        }, "<")
        tl.to(".tin_line_ver", {
            height: "100%",
            ease: "expo.out",
            duration: 1,
            stagger: 0.15
        }, "<+=0.5")
    }, [])



    return (
        <>  

            <InfiniteCarousel openGallerySwiper={openGallerySwiper} setOpenGallerySwiper={setOpenGallerySwiper}/>

            <div className=" wht_built_pren w-full  h-screen gap-y-12 bg-[#18293A] text-white flex justify-center px-20 flex-col ">
                <h2 className="uppercase text-2xl">What I’ve built</h2>
                <div className="w-full relative grid grid-cols-2 pt-3 ">
                    <div className="tin_line w-0  absolute h-px bg-white top-0 left-0"></div>
                    <div className="">
                        <h2 className="text-xl vvds_light">Scaled and launched teams across industries.</h2>
                        <h2 className="text-[10vw] counter" data-count="150"> 0+</h2>
                    </div>
                    <div className="">
                        <h2 className="text-xl vvds_light">Built brands from strategy to launch.</h2>
                        <h2 className="text-[10vw] counter " data-count="4">  0+</h2>
                    </div>
                </div>

                <div className="w-full relative z-20 text-xl vvds_light grid grid-cols-4 ">
                    <div className="tin_line w-0  absolute h-px bg-white top-0 left-0"></div>
                    <div className="w-full relative  p-12  ">
                        <div className="tin_line_ver h-0  absolute w-px bg-white top-0 right-0"></div>
                        <h2>25+</h2>
                        <h2 className="vvds_light">Team Members Led</h2>
                    </div>
                    <div className="w-full relative  p-12  ">
                        <div className="tin_line_ver h-0  absolute w-px bg-white top-0 right-0"></div>
                        <h2>25+</h2>
                        <h2 className="vvds_light">Team Members Led</h2>
                    </div>
                    <div className="w-full relative  p-12  ">
                        <div className="tin_line_ver h-0  absolute w-px bg-white top-0 right-0"></div>
                        <h2>25+</h2>
                        <h2 className="vvds_light">Team Members Led</h2>
                    </div>
                    <div className="w-full relative  p-12  ">
                        <h2>25+</h2>
                        <h2 className="vvds_light">Team Members Led</h2>
                    </div>
                </div>

            </div>

            <div ref={containerRef} className="gallery_container bg-[#18293A]">
                <div
                    ref={textBoxRef}
                    className="gallry_txt_box text-[#ffffff] pointer-events-none fixed  uppercase text-center center text-[5rem] leading-18 z-20 w-full top-1/2 -translate-y-1/2 opacity-0"
                >
                    {activeIndex !== null && (
                        <div className="w-[40%] ">
                            <p className="text-2xl">
                                {String(activeIndex + 1).padStart(2, "0")}
                            </p>
                            <h2>{galleryData[activeIndex].title}</h2>
                        </div>
                    )}
                </div>
                <div ref={sceneRef} className="gallery_scene scene" >
                    <div
                        className="gallery_group center w-full h-full"
                        data-depth="0.1"
                        scalar-x="1"
                        scalar-y="0"
                        number="38"
                    >
                        <div className="grid_inne">

                            {galleryData.map((item, i) => (
                                <a
                                    key={i}
                                    className="relative  p-[12vw] shrink-0"
                                    onClick={()=>setOpenGallerySwiper(true)}
                                    onMouseEnter={() => setActiveIndex(i)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                >
                                    <div
                                        className={`gallery_item group hover:scale-105 rounded-sm overflow-hidden transition-all duration-300 aspect-square`}
                                        style={{
                                            top: item.top,
                                            left: item.left,
                                        }}
                                    >
                                        <Image
                                            width={300}
                                            height={400}
                                            src={item.img}
                                            alt={item.title}
                                            className={` ${activeIndex && activeIndex !== i && "not_active"} normal_glry_img cover group-hover:scale-110`}
                                        />
                                    </div>
                                </a>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Gallery;