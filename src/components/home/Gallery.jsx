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

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".gallery_container",
                start: "top 50%",
                toggleActions: "play none none reverse"
            }
        })

        tl.to(".galry_card", {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: {
                each: 0.03,
                from: "random", 
            },
        })


    }, [])






    return (
        <>

            <InfiniteCarousel openGallerySwiper={openGallerySwiper} setOpenGallerySwiper={setOpenGallerySwiper} />

            <div ref={containerRef} className="gallery_container relative z-[10] bg-[#18293A]">
                <div
                    ref={textBoxRef}
                    className="gallry_txt_box text-[#ffffff] pointer-events-none fixed  uppercase text-center center text-5xl   z-20 w-full top-1/2 -translate-y-1/2 opacity-0"
                >
                    {activeIndex !== null && (
                        <div className="w-[40%] ">
                            <p className="text-2xl">
                                {String(activeIndex + 1).padStart(2, "0")}
                            </p>
                            <h2>{galleryData[activeIndex].title}</h2>
                            <p className="text-sm capitalize underline">Explore</p>
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
                                    className=" galry_card cursor-pointer  opacity-0 scale-[.7] relative  p-[12vw] shrink-0"
                                    onClick={() => setOpenGallerySwiper(true)}
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