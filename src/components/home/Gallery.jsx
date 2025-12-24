import { useEffect, useMemo, useRef, useState } from "react";
import Parallax from "parallax-js";
import gsap from "gsap";
import { galleryData } from "@/data/galleryData";
import Image from "next/image";

const Gallery = () => {
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


    return (
        <>
            <div className="w-full  h-screen gap-y-12 text-[#18293A] flex justify-center px-20 flex-col ">
                <h2 className="uppercase text-2xl">What I’ve built</h2>
                <div className="w-full grid grid-cols-2 pt-3 border-t border-[#18293A]">
                    <div className="">
                        <h2 className="text-xl vvds_light">Scaled and launched teams across industries.</h2>
                        <h2 className="text-[10vw]">150+</h2>
                    </div>
                    <div className="">
                        <h2 className="text-xl vvds_light">Built brands from strategy to launch.</h2>
                        <h2 className="text-[10vw] ">4+</h2>
                    </div>
                </div>

                <div className="w-full relative z-20 text-xl vvds_light grid grid-cols-4 border-t border-[#18293A]">
                    <div className="w-full border-r p-12  ">
                        <h2>25+</h2>
                        <h2 className="vvds_light">Team Members Led</h2>
                    </div>
                    <div className="w-full border-r p-12  ">
                        <h2>25+</h2>
                        <h2 className="vvds_light">Team Members Led</h2>
                    </div>
                    <div className="w-full border-r p-12  ">
                        <h2>25+</h2>
                        <h2 className="vvds_light">Team Members Led</h2>
                    </div>
                    <div className="w-full  p-12  ">
                        <h2>25+</h2>
                        <h2 className="vvds_light">Team Members Led</h2>
                    </div>
                </div>
            </div>
            <div ref={containerRef} className="gallery_container">
                <div
                    ref={textBoxRef}
                    className="gallry_txt_box text-[#18293A] pointer-events-none fixed  uppercase text-center center text-[5rem] leading-18 z-20 w-full top-1/2 -translate-y-1/2 opacity-0"
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
                                    onMouseEnter={() => setActiveIndex(i)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                >
                                    <div
                                        className={`gallery_item group hover:scale-105 hover:rounded-sm overflow-hidden transition-all duration-300 aspect-square`}
                                        style={{
                                            top: item.top,
                                            left: item.left,
                                        }}
                                    >
                                        {/* <div className="blue_overlay transition-all duration-300 group-hover:opacity-0 opacity-50 w-full h-full bg-[#252525] absolute top-0 left-0 z-10"></div> */}
                                        <Image
                                            width={300}
                                            height={400}
                                            src={item.img}
                                            alt={item.title}
                                            className="cover brightness-[.6] group-hover:brightness-100 transition-all duration-300 group-hover:scale-110"
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