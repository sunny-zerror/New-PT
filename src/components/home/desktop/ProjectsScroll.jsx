import { projectsData } from "@/data/ProjectsData";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const directions = [
    { x: 1.3, y: 0.7 },
    { x: -1.5, y: 1 },
    { x: 1.1, y: -1.3 },
    { x: -1.7, y: -0.8 },
    { x: 0.8, y: 1.5 },
    { x: -1, y: -1.4 },
    { x: 1.6, y: 0.3 },
    { x: -0.7, y: 1.7 },
];


const ProjectsScroll = () => {
    const containerRef = useRef(null);

    const canvasRef = useRef(null);
    const frameRef = useRef(0);
    const imageCache = useRef({});
    const totalFrames = 114;
    
    useEffect(() => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        
            // Preload images
            let loaded = 0;
            for (let i = 1; i < totalFrames; i++) {
                const padded = String(i).padStart(4, '0');
                const src = `/frames/${padded}.png`;
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    imageCache.current[i] = img;
                    loaded++;
                    if (loaded === totalFrames - 1) drawFrame(0); // Start at frame 0
                };
            }
        
            const drawFrame = (index) => {
                const img = imageCache.current[index];
                if (!img) return;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            const cards = gsap.utils.toArray(".scroll-card");

            const vw = window.innerWidth;
            const vh = window.innerHeight;

            // Initial state
            gsap.set(cards, {
                x: 0,
                y: 0,
                z: -1000,
                scale: 0,
                rotationX: 0,
                rotationY: 0,
                force3D: true,
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=600%",
                    scrub: true,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });

            cards.forEach((card, i) => {
                const dir = directions[i % directions.length];

                const delay = i * 0.05;

                tl.to(
                    card,
                    {
                        x: dir.x * vw * 0.6,
                        y: dir.y * vh * 0.6,
                        z: 2000,
                        scale: 1.8,
                        rotationY: gsap.utils.random(-10, 10),
                        rotationX: gsap.utils.random(-6, 6),
                        ease: "none",
                    },
                    delay
                );
                tl.to(".rot_circ_paren", {
                    rotate: 720,
                }, "<")
            });

            tl.to(".last_vec", {
                opacity: 1,
                duration: 0.1
            })
            tl.to(frameRef, {
                current: totalFrames - 1,
                snap: 'current',
                duration: 4,
                onUpdate: () => {
                    drawFrame(Math.round(frameRef.current));
                }
            }, ">")


        },
        { scope: containerRef },[]
    );

    return (
        <div
            ref={containerRef}
            className="desktp_wrk_pren relative w-full h-screen text-center center"
        >
            <div className=" last_vec absolute z-40 top-0 left-0 opacity-0  pointer-events-none flex  items-center w-full justify-center h-screen">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ display: 'block', pointerEvents: 'none' }}
                />
            </div>

            <div className="rot_circ_paren origin-center translate-x-[-30%] translate-y-[10%] absolute z-[-1] w-[25vw]  aspect-square">
                <img className="w-full " src="/images/projects_circ_bg.png" alt="" />
            </div>
            <div className="rot_circ_paren origin-center translate-y-[-30%]  absolute z-[-1] w-[25vw]  aspect-square">
                <img className="w-full rotate-90 " src="/images/projects_circ_bg.png" alt="" />
            </div>
            <div className="rot_circ_paren origin-center translate-x-[30%] translate-y-[10%] absolute z-[-1] w-[25vw]  aspect-square">
                <img className="w-full rotate-90 " src="/images/projects_circ_bg.png" alt="" />
            </div>
            <h2 className=" absolute text-3xl uppercase w-[30%]">
                Curiosity, friction, iteration: <br />
                The machinery of my design
            </h2>
            <div className="cards-stage h-screen w-full flex items-center justify-center">
                {projectsData.map((item, i) => (
                    <div
                        key={i}
                        className="scroll-card absolute w-[35vw] aspect-square"
                    >
                        <img
                            src={item.image}
                            className="w-full h-full object-cover"
                            alt=""
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsScroll;
