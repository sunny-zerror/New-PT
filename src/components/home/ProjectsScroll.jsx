import { projectsData } from "@/data/ProjectsData";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitText from "gsap/dist/SplitText";
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

        let loaded = 0;
        for (let i = 1; i < totalFrames; i++) {
            const padded = String(i).padStart(4, '0');
            const src = `/images/frames/${padded}.png`;
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

        gsap.set(cards, {
            x: 0,
            y: 0,
            z: -1000,
            scale: 0,
            rotationX: 0,
            rotationY: 0,
            force3D: true,
        });

        const rotate_tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=500%",
                start: "top bottom",
                // markers: true,
                scrub: true,
            },
        });

        rotate_tl.to(
            ".rot_circ_paren",
            {
                rotation: "+=720",
                ease: "none",
                transformOrigin: "50% 50%",
            }
        );

        const project_center_txt = SplitText.create(".project_center_txt", { type: "words" });
        gsap.set(project_center_txt.words, { opacity: 0.2 })


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

        tl.to(project_center_txt.words, {
            opacity: 1,
            duration:0.5,
            stagger: 0.8,
        })
        cards.forEach((card, i) => {
            const dir = directions[i % directions.length];

            const delay = i * 0.4;

            tl.to(
                card,
                {
                    x: dir.x * vw * 0.6,
                    y: dir.y * vh * 0.6,
                    z: 2000,
                    scale: 1.8,
                    duration:3,
                    rotationY: gsap.utils.random(-10, 10),
                    rotationX: gsap.utils.random(-6, 6),
                    ease: "none",
                },
                delay
            );
        });

        tl.to(".last_vec", {
            opacity: 1,
            duration: 0.5
        })
        tl.to(frameRef, {
            current: totalFrames - 1,
            snap: 'current',
            duration: 6,
            onUpdate: () => {
                drawFrame(Math.round(frameRef.current));
            }
        }, ">")


    },
        [])

    return (
        <div
            ref={containerRef}
            className="desktp_wrk_pren overflow-hidden relative w-full h-screen text-center center"
        >
            <div className=" last_vec absolute z-40 top-0 left-0 opacity-0  pointer-events-none flex  items-center w-full justify-center h-screen">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ display: 'block', pointerEvents: 'none' }}
                />
            </div>

            <div className="rot_circ_paren rounded-full  border-[1px] border-[#18293A] origin-center translate-x-[-30%] translate-y-[10%] absolute z-[-1] w-[25vw]  aspect-square">
                <div className="size-3 top-1/2 right-0 absolute rounded-full translate-x-1.5 bg-[#18293A] "></div>
            </div>
            <div className="rot_circ_paren rounded-full  border-[1px] border-[#18293A] origin-center translate-y-[-30%]  absolute z-[-1] w-[25vw]  aspect-square">
                <div className="size-3 bottom-0 left-1/2 absolute rounded-full translate-y-1.5 bg-[#18293A] "></div>
            </div>
            <div className="rot_circ_paren rounded-full  border-[1px] border-[#18293A] origin-center translate-x-[30%] translate-y-[10%] absolute z-[-1] w-[25vw]  aspect-square">
                <div className="size-3 top-0 left-1/2 absolute rounded-full -translate-y-1.5 bg-[#18293A] "></div>
            </div>
            <h2 className=" project_center_txt absolute text-4xl uppercase w-[50%] text-[#18293A]">
                Curiosity, friction, iteration: <br />
                The machinery of my design
            </h2>
            <div className="cards-stage h-screen w-full flex items-center justify-center">
                {projectsData?.map((item, i) => (
                    <div
                        key={i}
                        className="scroll-card absolute w-[35vw] aspect-square"
                    >
                        <img
                            src={item?.image}
                            className="w-full h-full object-cover"
                            alt="loading"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsScroll;
