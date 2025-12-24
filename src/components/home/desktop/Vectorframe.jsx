import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'

const Vectorframe = () => {
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

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".last_vec",
                start: "top top",
                end: "+=300%",
                scrub: true,
                pin: true,
                invalidateOnRefresh: true,
            },
        });

        tl.to(frameRef, {
            current: totalFrames - 1,
            snap: 'current',
            duration: 4,
            onUpdate: () => {
                drawFrame(Math.round(frameRef.current));
            }
        }, "pin11")

    }, [])

    return (
        <>
            <div className=" last_vec  pointer-events-none flex  items-center w-full justify-center h-screen">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ display: 'block', pointerEvents: 'none' }}
                />
            </div>
        </>
    )
}

export default Vectorframe