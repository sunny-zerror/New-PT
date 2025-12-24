import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { RiBehanceLine, RiInstagramLine, RiLinkedinLine } from '@remixicon/react';
import { CustomEase } from 'gsap/dist/CustomEase';
import MotionPathPlugin from 'gsap/dist/MotionPathPlugin';
import ProjectCardImage from '../Effect/ProjectCardImage';
gsap.registerPlugin(ScrollTrigger, CustomEase, MotionPathPlugin);

const DesktopHomeOld = () => {
    const main_Ref = useRef(null);
    const logoRef = useRef(null);
    const logoRef2 = useRef(null);
    const clipRef = useRef(null);
    const canvasRef = useRef(null);
    const frameRef = useRef(0);
    const imageCache = useRef({});
    const totalFrames = 114;


    useEffect(() => {
        if (window.innerWidth < 1020) return

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


        gsap.set(".animate_logo_div", {
            y: 40,
            scale: 0.3
        })
        gsap.set(".logo_div", {
            opacity: 0
        })
        gsap.set("body", {
            overflow: "hidden"
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
            delay: 5.5
        })

        gsap.to("body", {
            overflowY: "scroll",
            delay: 7
        })

        gsap.fromTo(".birds", { y: 10 }, { y: 0, duration: 1, ease: "power1.inOut", repeat: -1, yoyo: true })

        gsap.to(".rotate", {
            rotate: 360,
            duration: 15,
            repeat: -1,
            ease: "linear"
        })

        ////////////////////////////////////
        const timeout = setTimeout(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: main_Ref.current,
                    start: "top top",
                    end: window.innerHeight * 28,
                    scrub: true,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
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
                filter: "brightness(.5)",
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
                bottom: "100%",
                duration: 3,
            }, "pin3");

            tl.to(".profile_pic", {
                left: "0%",
                duration: 2,
            }, "pin4");

            tl.to(".frameB", {
                left: "0%",
                duration: 2,
            }, "pin4");
            tl.fromTo(".spn_slide", {
                top: "30%",
            }, {
                top: "-35vw",
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

            tl.fromTo(".spn_img_slider", {
                top: "0%",
            }, {
                top: "-70vw",
                duration: 3,
            }, "pin5.5");

            tl.to(".frame_slider", {
                top: "10vw",
                duration: 2.12,
                delay: .8,
            }, "pin5.5");

            const path = [
                { x: 700, y: 20 },
                { x: 0, y: 0 },
            ];
            tl.to(".move_proj", {
                motionPath: {
                    path: path,
                    align: false,
                    autoRotate: false,
                },
                width: "100%",
                duration: 4,
            }, "pin6")

            tl.to(".move_proj_inner", {
                height: "25vw",
                duration: 4,
            }, "pin6");

            tl.to(".spn_img_slider", {
                top: "-90vw",
                duration: 4,
            }, "pin6");

            tl.to(".frameB", {
                filter: "brightness(.3)",
                duration: 4,
            }, "pin6")

            tl.to(".frame_slider", {
                top: "-110vh",
                duration: 4,
            }, "pin6")

            tl.to(".frame_slide_1", {
                transform: "translateY(-43vw)",
                delay: 3.9,
                duration: 6,
                onComplete: () => {
                    gsap.set(".cont", {
                        overflow: "hidden",
                        clipPath: "shape(nonzero from 100% 100%, line to 66.33% 100%, curve to 58.13% 100% with 64.62% 100% / 59.89% 100%, curve to 53.48% 100% with 55.65% 100% / 56.67% 100%, curve to 50.26% 100% with 52.38% 100% / 51.18% 100%, curve to 45.76% 100% with 49.4% 100% / 46.31% 100%, curve to 30.63% 100% with 41.76% 100% / 30.63% 100%, curve to 0% 100% with 29.17% 100% / 2.64% 100%, curve to 0% 66.42% with 0% 97.9% / 0% 71.11%, curve to 0% 56.98% with 0% 62.34% / 0% 62.05%, curve to 0% 54.51% with 0% 56.38% / 0% 55.15%, curve to 0% 53.75% with 0% 53.9% / 0% 54.17%, curve to 0% 51.45% with 0% 51.27% / 0% 52.34%, curve to 0% 48.24% with 0% 50.85% / 0% 48.93%, curve to 0% 46.05% with 0% 48.04% / 0% 46.32%, curve to 0% 44.33% with 0% 45.85% / 0% 44.51%, curve to 0% 41.25% with 0% 43.19% / 0% 42.79%, curve to 0% 38.51% with 0% 40.58% / 0% 39.2%, curve to 0% 37.55% with 0% 38.11% / 0% 37.82%, curve to 0% 36.36% with 0% 37.37% / -0% 36.85%, curve to 0% 35.81% with 0% 36.28% / 0% 35.97%, curve to 0% 35.74% with 0% 35.79% / 0% 35.77%, line to 0% 30.77%, curve to 0% 29.96% with 0% 30.64% / 0% 30.14%, curve to 0% 29.16% with 0% 29.88% / 0% 29.45%, curve to 0% 27.47% with 0% 28.92% / 0% 27.67%, curve to 0% 25.21% with 0% 26.62% / 0% 26.48%, curve to 0% 22.49% with 0% 24.36% / 0% 23.96%, curve to 0% 19.88% with 0% 21.33% / 0% 20.71%, curve to 0% 19.7% with -0% 19.83% / 0% 19.79%, curve to 0% 19.12% with 0% 19.54% / 0% 19.52%, curve to 0% 18.59% with 0% 18.72% / 0% 18.79%, curve to 0% 17.83% with 0% 18.52% / 0% 18.07%, line to 0% 0%, curve to 25.17% 0% with 1.67% 0% / 22.71% 0%, line to 48.98% 0%, curve to 49.79% 0% with 49.08% 0% / 49.55% 0%, curve to 51.12% 0% with 50.03% 0% / 50.59% 0%, curve to 51.86% 0% with 52.02% 0% / 51.54% -0%, curve to 55.18% 0% with 53.19% 0% / 54.11% 0%, curve to 68.34% 0% with 59.26% 0% / 64.41% 0%, curve to 100% 0% with 72.76% 0% / 96.81% 0%, curve to 100% 29.96% with 100% 4.11% / 100% 25.21%, curve to 100% 39.51% with 100% 32.69% / 100% 37.15%, curve to 100% 41.63% with 100% 40.52% / 100% 40.92%, curve to 100% 42.24% with 100% 41.79% / 100% 41.88%, curve to 100% 43.04% with 100% 42.73% / 100% 42.82%, curve to 100% 44.07% with 100% 43.35% / 100% 43.89%, line to 100% 47.79%, curve to 100% 49.06% with 100% 47.93% / 100% 48.95%, curve to 100% 50.69% with 100% 49.14% / 100% 50.49%, curve to 100% 51.56% with 100% 50.91% / 100% 51.41%, curve to 100% 53.82% with 100% 52.45% / 100% 52.59%, curve to 100% 56.43% with 100% 54.93% / 100% 55.04%, curve to 100% 59.01% with 100% 57.27% / 100% 58.39%, line to 100% 59.26%, curve to 100% 59.97% with 100% 59.39% / 100% 59.46%, curve to 100% 60.75% with 100% 60.49% / 100% 60.67%, curve to 100% 61% with 100% 60.87% / 100% 60.96%, curve to 100% 66.47% with 100% 61.42% / 100% 65.04%, curve to 100% 68.32% with 100% 66.67% / 100% 67.87%, curve to 100% 69.57% with 100% 68.7% / 100% 69.28%, curve to 100% 73.25% with 100% 71.33% / 100% 71.89%, curve to 100% 75.01% with 100% 74.23% / 100% 74.45%, curve to 100% 76.53% with 100% 75.75% / 100% 76.08%, curve to 100% 77.22% with 100% 76.77% / 100% 77%, curve to 100% 77.69% with 100% 77.33% / 100% 77.31%, curve to 100% 78.36% with 100% 78.02% / 100% 78.22%, curve to 100% 79.27% with 100% 78.58% / 100% 79.14%, line to 100% 100%, close)"
                    })
                    gsap.set(".frame_slider", {
                        backgroundColor: "#FFFBF3"
                    })
                },
                onReverseComplete: () => {
                    gsap.set(".cont", {
                        overflow: "visible",
                        clipPath: "none"
                    })
                    gsap.set(".frame_slider", {
                        backgroundColor: "transparent"
                    })
                }
            }, "pin6")
            tl.to(".frame_slide_2", {
                delay: 3.9,
                transform: "translateY(-60vw)",
                duration: 6
            }, "pin6")
            tl.to(".frame_slide_3", {
                delay: 3.9,
                transform: "translateY(-55vw)",
                duration: 6
            }, "pin6")
            tl.to(".frame_slide_4", {
                delay: 3.9,
                transform: "translateY(-43vw)",
                duration: 6
            }, "pin6")

            tl.to(".cont", {
                width: "20vh",
                height: "20vh",
                clipPath: "shape(nonzero from 75.26% 81.49%, line to 52.41% 81.49%, curve to 50.71% 82.93% with 50.71% 81.49% / 50.71% 81.49%, curve to 50.7% 98.64% with 50.71% 88.17% / 50.71% 93.41%, curve to 50.07% 100% with 50.7% 99.16% / 50.96% 99.95%, curve to 49.2% 98.73% with 49.24% 100.04% / 49.29% 99.25%, curve to 44.22% 84.47% with 48.4% 93.75% / 46.64% 89.03%, curve to 36.7% 74.09% with 42.26% 80.73% / 39.73% 77.24%, curve to 21.94% 63.3% with 32.56% 69.76% / 27.56% 66.11%, curve to 1.2% 57.08% with 15.46% 60.09% / 8.53% 58.09%, curve to 0% 56.43% with 0.68% 57.01% / -0.05% 57.1%, curve to 1.31% 55.9% with 0.06% 55.79% / 0.79% 55.9%, curve to 33.42% 55.9% with 12.01% 55.89% / 22.72% 55.89%, curve to 36.1% 55.9% with 34.32% 55.9% / 35.21% 55.9%, curve to 36.76% 55.69% with 36.34% 55.9% / 36.66% 55.96%, curve to 36.45% 55.21% with 36.83% 55.48% / 36.58% 55.35%, curve to 22.05% 44.68% with 32.4% 50.92% / 27.53% 47.46%, curve to 7.03% 39.44% with 17.36% 42.3% / 12.3% 40.54%, curve to 1.03% 38.43% with 5.05% 39% / 3.05% 38.67%, curve to 0.09% 37.8% with 0.57% 38.38% / 0.09% 38.32%, curve to 1.07% 37.27% with 0.09% 37.22% / 0.63% 37.29%, curve to 2.03% 37.27% with 1.39% 37.26% / 1.71% 37.27%, line to 35.2% 37.27%, curve to 36.05% 37.27% with 35.48% 37.27% / 35.77% 37.28%, curve to 36.74% 37.09% with 36.3% 37.26% / 36.62% 37.34%, curve to 36.43% 36.52% with 36.86% 36.84% / 36.59% 36.68%, curve to 30.63% 31.36% with 34.64% 34.69% / 32.7% 32.96%, curve to 18.49% 24.36% with 26.96% 28.57% / 22.87% 26.21%, curve to 1.29% 19.8% with 13.03% 22.06% / 7.32% 20.48%, curve to 0.82% 19.72% with 1.13% 19.79% / 0.98% 19.76%, curve to 0.09% 19.08% with 0.44% 19.63% / 0.06% 19.51%, curve to 0.9% 18.52% with 0.12% 18.65% / 0.5% 18.55%, curve to 1.95% 18.5% with 1.26% 18.5% / 1.6% 18.5%, line to 47.75% 18.5%, curve to 49.39% 17.09% with 49.39% 18.5% / 49.39% 18.5%, line to 49.39% 2.05%, curve to 49.39% 1.3% with 49.39% 1.8% / 49.36% 1.55%, curve to 49.99% 0% with 49.44% 0.81% / 49.17% 0.06%, curve to 50.73% 1.19% with 50.88% -0.06% / 50.62% 0.71%, curve to 52.3% 7.44% with 51.21% 3.29% / 51.62% 5.38%, curve to 58.13% 19.42% with 53.66% 11.63% / 55.62% 15.66%, curve to 64.58% 27.13% with 59.97% 22.18% / 62.13% 24.76%, curve to 77.92% 36.6% with 68.47% 30.88% / 72.88% 34.08%, curve to 92.85% 41.81% with 82.59% 38.94% / 87.61% 40.69%, curve to 99.12% 42.89% with 94.93% 42.25% / 97.02% 42.56%, curve to 100% 43.47% with 99.54% 42.96% / 100.01% 42.98%, curve to 99.04% 44.07% with 99.99% 44% / 99.5% 44.04%, curve to 98.08% 44.08% with 98.72% 44.09% / 98.4% 44.08%, line to 64.82% 44.08%, curve to 63.96% 44.08% with 64.53% 44.08% / 64.24% 44.08%, curve to 63.36% 44.25% with 63.74% 44.09% / 63.48% 44.04%, curve to 63.62% 44.75% with 63.25% 44.47% / 63.48% 44.6%, curve to 69.96% 50.37% with 65.52% 46.79% / 67.65% 48.67%, curve to 85.45% 58.44% with 74.59% 53.77% / 79.82% 56.5%, curve to 98.81% 61.51% with 89.75% 59.93% / 94.23% 60.96%, line to 99.09% 61.54%, curve to 99.98% 62.2% with 99.55% 61.6% / 100.04% 61.67%, curve to 98.95% 62.71% with 99.92% 62.74% / 99.39% 62.69%, curve to 98% 62.71% with 98.63% 62.72% / 98.31% 62.71%, curve to 64.64% 62.72% with 86.88% 62.71% / 75.76% 62.71%, curve to 63.34% 62.95% with 64.19% 62.72% / 63.56% 62.49%, curve to 64.01% 63.88% with 63.16% 63.33% / 63.73% 63.59%, curve to 73.86% 71.71% with 66.9% 66.84% / 70.21% 69.47%, curve to 85.25% 77.08% with 77.41% 73.86% / 81.24% 75.66%, curve to 97.46% 80.08% with 89.19% 78.49% / 93.31% 79.32%, curve to 99.34% 80.31% with 98.08% 80.19% / 98.72% 80.22%, curve to 99.98% 80.9% with 99.71% 80.36% / 100.03% 80.51%, curve to 99.24% 81.45% with 99.92% 81.26% / 99.62% 81.42%, curve to 98.19% 81.48% with 98.89% 81.48% / 98.54% 81.49%, line to 75.26% 81.49%, close)",
                duration: 2,
                backgroundColor: "#18293A"
            }, "pin8")
            tl.to(".cont_child", {
                opacity: 0,
                duration: 1,
                delay: 1
            }, "pin8")
            tl.to(".cont", {
                opacity: 0,
                duration: 1,
            }, "pin10")
            tl.to(".last_vec", {
                opacity: 1,
                pointerEvents: "auto",
                duration: 1,
            }, "pin10")
            tl.to(frameRef, {
                current: totalFrames - 1,
                snap: 'current',
                duration: 4,
                onUpdate: () => {
                    drawFrame(Math.round(frameRef.current));
                }
            }, "pin11")

            tl.to(".img_frame_slide_parent", {
                duration: 1,
                opacity: 1,
            }, "pin11.5");

            tl.to(".img_frame_slide_parent", {
                duration: 3,
                width: "101vw",
                clipPath: "shape(nonzero from 0% 86.54%, line to 0% 21.73%, curve to 0% 0.04% with 0% 21.73% / 0% 1.18%, curve to 4.92% 0.04% with 0% -0.05% / 4.92% 0.04%, line to 97.34% 0.04%, curve to 99.95% 0.04% with 97.34% 0.04% / 99.83% 0.04%, curve to 99.95% 13.62% with 100.07% 0.04% / 99.95% 13.62%, line to 99.95% 78.4%, curve to 99.95% 99.95% with 99.95% 78.4% / 99.98% 96.13%, curve to 95.21% 99.95% with 99.95% 100.04% / 95.21% 99.95%, line to 5.63% 99.95%, curve to 0% 99.95% with 5.63% 99.95% / 0% 100.06%, curve to 0% 86.54% with -0% 96.07% / 0% 86.54%, close)",
                height: "101vh",
                delay: 1,
                pointerEvents: "auto",
            }, "pin11.5");

            tl.to(".img_frame_slide_child", {
                duration: 2,
                opacity: 1,
                delay: 1,
            }, "pin11.5");


            tl.to(".img_frame_slide_child", {
                duration: 14,
                delay: 0.2,
                transform: "translateX(-199vw)"
            }, "pin12");

            tl.to(".india_gate", {
                bottom: "5vh",
            }, "pin12");

            tl.to(".sticker", {
                left: "24%",
                duration: 2,
                bottom: "12%",
                rotate: "360deg"
            }, "pin12");

            tl.to(".birds", {
                top: "-10%",
                left: "-12%",
            }, "pin12");

            tl.to(".pepsi", {
                bottom: "38%",
            }, "pin12");

            tl.fromTo(".ellipse", {
                left: "15%"
            }, {
                left: "12%",
                duration: 2
            }, "pin12");

            tl.to(".car", {
                left: "28%",
                delay: .5,
            }, "pin12");

            tl.fromTo(".royal_mile", {
                top: "-5%",
                rotate: "10deg"
            }, {
                top: "0%",
                rotate: "0deg",
                duration: 1,
                delay: .5,
            }, "pin12");

            tl.fromTo(".sticker2", {
                left: "40%",
                top: "50%",
            }, {
                left: "53%",
                top: "30%",
                duration: 2,
                rotate: "360deg",
                delay: 2.5,
            }, "pin12");

            tl.fromTo(".piran_txt", {
                right: "60vw",
            }, {
                right: "4rem",
                duration: 6,
                delay: 7,
            }, "pin12");

            tl.to(".piran_picc", {
                right: "-40vw",
                duration: 3,
                delay: 14,
            }, "pin12");

            tl.to(".church", {
                left: "38%",
                duration: 3,
                delay: 14,
            }, "pin12");

            tl.to(".bgimg3", {
                bottom: "60%",
                opacity: 0,
                duration: 3,
                delay: 14,
            }, "pin12");

            tl.to(".piran_txt", {
                bottom: "30%",
                duration: 3,
                delay: 14,
            }, "pin12");

            tl.to(".footer", {
                bottom: 0,
                duration: 3,
                delay: 14,
            }, "pin12");

            tl.to(".bridge", {
                bottom: "-25%",
                duration: 3,
                delay: 14,
            }, "pin12");


        }, 7000);

        return () => clearTimeout(timeout);


    }, []);

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

    useEffect(() => {
        if (window.innerWidth < 1020) return

        gsap.to(".rotate", {
            rotation: 360,
            ease: "none",
            duration: 10,
            repeat: -1,
            transformOrigin: "center center",
        })

    }, [])

    return (
        <div>
            <div className="logo_paren fixed block  w-56 z-[999] p-5">
                <div
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="logo cursor-pointer block overflow-hidden">
                    <img className=' w-[4vw] logo_image opacity-0 ' src="/logos/MenuLogo.svg" alt="" />
                </div>
            </div>
            <div ref={main_Ref} className="h-screen w-full relative">
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
                            <img className="w-[94.8%]" src="/logos/Logo_Dark.svg" alt="" />
                        </div>

                        <div className=" short_desc  w-full px-10 py-4  overflow-hidden text-[16px] flex items-center justify-between">
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
                            <ProjectCardImage imgUrl="/logos/Logo_Dark.png" />
                        </div>

                        <div className=" short_desc w-full px-10 py-4  overflow-hidden text-[16px] flex items-center justify-between">
                            <p>Where clarity drives creativity</p>
                            <h2>Brand Systems Architect</h2>
                            <p>From insight to impact</p>
                            <h2 className="vvds_light">Mumbai, India.</h2>
                        </div>
                    </div>
                </div>

                <div
                    className="absolute w-full absolute_center  center z-[10] flex-col ">
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

                    <img
                        className="object-cover w-full h-full"
                        src="/images/Hero_bg.avif"
                        alt=""
                    />
                </div>

                <div className="log_par absolute w-full h-[65vh] flex items-end justify-end ">
                    <div
                        ref={logoRef2}
                        className=" absolute bottom-0 w-full z-[9] h-fit">
                        <div className=" logo_div  center  h-[16vw]   w-full">
                            {/* <img className="w-[94.8%]" src="/logos/Logo_Dark.svg" alt="" /> */}
                            <ProjectCardImage imgUrl="/logos/Logo_Light.png" />
                        </div>
                        <div className=" short_desc w-full px-10 py-4 text-[#fffbf3]  overflow-hidden text-[16px] flex items-center justify-between">
                            <p>Where clarity drives creativity</p>
                            <h2>Brand Systems Architect</h2>
                            <p>From insight to impact</p>
                            <h2 className="vvds_light">Mumbai, India.</h2>
                        </div>
                    </div>
                </div>
                <div
                    className=" profile_pic absolute z-[8] bottom-[-100%] absolute_x_center w-[40%]  h-[80vh]">
                    <img className='object-cover brightness-[.8] w-full h-full' src="/images/piran_pic_new.webp" alt="" />
                </div>

                <div className=" slide_box z-[10] -translate-x-1/2 aspect-square w-[26vw] p-10 text-[1.2vw] absolute h-[30vw] bg-[#FFFBF3] bottom-0  left-[125%] flex flex-col justify-between items-center  text-center ">
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

                <div className=" frameB brightness-100   w-full h-screen z-[12] bg-[#FFFBF3] absolute top-0 left-[100%]">

                    <div className=" absolute top-0 left-0 spn_slide center w-[75%]">
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

                    <div className=" spn_img_slider px-5 w-[23%] text-black absolute right-0 top-0">
                        <div className="w-full">
                            <div className=" aspect-square h-[22vw] center bg-[#18293A] w-full">
                                <img className='w-full h-full object-cover' src="/images/Projects/PointOf.webp" alt="" />
                            </div>
                            <h2 className='capitalize text-xl vvds_light mt-2'>Point Of </h2>
                            <h2 className=' text-sm vvds_light leading-none uppercase'>Founder</h2>
                        </div>
                        <div className="w-full mt-10">
                            <div className="h-[22vw] w-full">
                                <img className='w-full h-full object-cover' src="/images/Projects/namah.webp" alt="" />
                            </div>
                            <h2 className='capitalize text-xl vvds_light mt-2'>House Of Namah</h2>
                            <h2 className=' text-sm vvds_light leading-none uppercase'>Branding</h2>
                        </div>
                        <div className="w-full mt-10">
                            <div className="h-[22vw] w-full">
                                <img className='w-full h-full object-contain' src="/images/Projects/Poonwala.webp" alt="" />
                            </div>
                            <h2 className='capitalize text-xl vvds_light mt-2'>The Poonawala Group</h2>
                            <h2 className=' text-sm vvds_light leading-none uppercase'></h2>
                        </div>
                    </div>

                </div>
                <div className="frame_slider absolute top-[100%]  left-0 w-full   z-[14]">
                    <div className="w-full h-[70vh] bg-transparent pointer-events-none"></div>
                    <div className="w-full h-[40vh] center flex-col gap-5 text-black bg-[#FFFBF3]">
                        <h2 className='uppercase  text-xl vvds_light'>Projects</h2>
                        <h2 className='capitalize text-6xl vvds_light'>Built on Purpose</h2>
                        <h2 className='capitalize  opacity-70 '>A shared answer to how strategy, structure, and detail create meaningful outcomes.</h2>
                    </div>
                    <div className='center w-full   h-screen'>
                        <div
                            style={{
                                height: "500vh",
                                width: "500vh",
                                // clipPath: "shape(nonzero from 100% 100%, line to 66.33% 100%, curve to 58.13% 100% with 64.62% 100% / 59.89% 100%, curve to 53.48% 100% with 55.65% 100% / 56.67% 100%, curve to 50.26% 100% with 52.38% 100% / 51.18% 100%, curve to 45.76% 100% with 49.4% 100% / 46.31% 100%, curve to 30.63% 100% with 41.76% 100% / 30.63% 100%, curve to 0% 100% with 29.17% 100% / 2.64% 100%, curve to 0% 66.42% with 0% 97.9% / 0% 71.11%, curve to 0% 56.98% with 0% 62.34% / 0% 62.05%, curve to 0% 54.51% with 0% 56.38% / 0% 55.15%, curve to 0% 53.75% with 0% 53.9% / 0% 54.17%, curve to 0% 51.45% with 0% 51.27% / 0% 52.34%, curve to 0% 48.24% with 0% 50.85% / 0% 48.93%, curve to 0% 46.05% with 0% 48.04% / 0% 46.32%, curve to 0% 44.33% with 0% 45.85% / 0% 44.51%, curve to 0% 41.25% with 0% 43.19% / 0% 42.79%, curve to 0% 38.51% with 0% 40.58% / 0% 39.2%, curve to 0% 37.55% with 0% 38.11% / 0% 37.82%, curve to 0% 36.36% with 0% 37.37% / -0% 36.85%, curve to 0% 35.81% with 0% 36.28% / 0% 35.97%, curve to 0% 35.74% with 0% 35.79% / 0% 35.77%, line to 0% 30.77%, curve to 0% 29.96% with 0% 30.64% / 0% 30.14%, curve to 0% 29.16% with 0% 29.88% / 0% 29.45%, curve to 0% 27.47% with 0% 28.92% / 0% 27.67%, curve to 0% 25.21% with 0% 26.62% / 0% 26.48%, curve to 0% 22.49% with 0% 24.36% / 0% 23.96%, curve to 0% 19.88% with 0% 21.33% / 0% 20.71%, curve to 0% 19.7% with -0% 19.83% / 0% 19.79%, curve to 0% 19.12% with 0% 19.54% / 0% 19.52%, curve to 0% 18.59% with 0% 18.72% / 0% 18.79%, curve to 0% 17.83% with 0% 18.52% / 0% 18.07%, line to 0% 0%, curve to 25.17% 0% with 1.67% 0% / 22.71% 0%, line to 48.98% 0%, curve to 49.79% 0% with 49.08% 0% / 49.55% 0%, curve to 51.12% 0% with 50.03% 0% / 50.59% 0%, curve to 51.86% 0% with 52.02% 0% / 51.54% -0%, curve to 55.18% 0% with 53.19% 0% / 54.11% 0%, curve to 68.34% 0% with 59.26% 0% / 64.41% 0%, curve to 100% 0% with 72.76% 0% / 96.81% 0%, curve to 100% 29.96% with 100% 4.11% / 100% 25.21%, curve to 100% 39.51% with 100% 32.69% / 100% 37.15%, curve to 100% 41.63% with 100% 40.52% / 100% 40.92%, curve to 100% 42.24% with 100% 41.79% / 100% 41.88%, curve to 100% 43.04% with 100% 42.73% / 100% 42.82%, curve to 100% 44.07% with 100% 43.35% / 100% 43.89%, line to 100% 47.79%, curve to 100% 49.06% with 100% 47.93% / 100% 48.95%, curve to 100% 50.69% with 100% 49.14% / 100% 50.49%, curve to 100% 51.56% with 100% 50.91% / 100% 51.41%, curve to 100% 53.82% with 100% 52.45% / 100% 52.59%, curve to 100% 56.43% with 100% 54.93% / 100% 55.04%, curve to 100% 59.01% with 100% 57.27% / 100% 58.39%, line to 100% 59.26%, curve to 100% 59.97% with 100% 59.39% / 100% 59.46%, curve to 100% 60.75% with 100% 60.49% / 100% 60.67%, curve to 100% 61% with 100% 60.87% / 100% 60.96%, curve to 100% 66.47% with 100% 61.42% / 100% 65.04%, curve to 100% 68.32% with 100% 66.67% / 100% 67.87%, curve to 100% 69.57% with 100% 68.7% / 100% 69.28%, curve to 100% 73.25% with 100% 71.33% / 100% 71.89%, curve to 100% 75.01% with 100% 74.23% / 100% 74.45%, curve to 100% 76.53% with 100% 75.75% / 100% 76.08%, curve to 100% 77.22% with 100% 76.77% / 100% 77%, curve to 100% 77.69% with 100% 77.33% / 100% 77.31%, curve to 100% 78.36% with 100% 78.02% / 100% 78.22%, curve to 100% 79.27% with 100% 78.58% / 100% 79.14%, line to 100% 100%, close)"
                            }}
                            className="cont center rotate-90 origin-center ">
                            <div className=" cont_child w-[100vw] h-screen bg-[#FFFBF3] shrink-0 -rotate-90 grid grid-cols-4 gap-5 px-5 ">
                                <div className=" frame_slide_1  w-full h-screen space-y-10 bg-[#FFFBF3]">


                                    <div className="move_proj  z-[999] translate-x-[77vw] bg-[#fffbf3] translate-y-[-100vh]  w-[87.5%] ">
                                        <div className=" move_proj_inner  aspect-square h-[22vw] w-full">
                                            <img className='w-full h-full object-cover' src="/images/Projects/jbl.webp" alt="" />
                                        </div>
                                        <h2 className='capitalize text-xl vvds_light mt-2'>JBL</h2>
                                        <h2 className='capitalize text-sm vvds_light leading-none'>Community Management</h2>
                                    </div>


                                    <div className="w-full ">
                                        <div className="aspect-square h-[25vw] w-full">
                                            <img className='w-full h-full object-cover' src="/images/Projects/namah.webp" alt="" />
                                        </div>
                                        <h2 className='capitalize text-xl vvds_light mt-2'>House Of Namah</h2>
                                        <h2 className='capitalize text-sm vvds_light leading-none'>Branding</h2>
                                    </div>
                                    <div className="w-full ">
                                        <div className="aspect-square h-[25vw] w-full">
                                            <img className='w-full h-full object-cover' src="/images/Projects/goodrich.webp" alt="" />
                                        </div>
                                        <h2 className='capitalize text-xl vvds_light mt-2'>Goodrich</h2>
                                        <h2 className='capitalize text-sm vvds_light leading-none'>Branding</h2>
                                    </div>
                                    <div className="w-full ">
                                        <div className="aspect-square h-[25vw] w-full">
                                            <img className='w-full h-full object-cover' src="/images/Projects/kvar.webp" alt="" />
                                        </div>
                                        <h2 className='capitalize text-xl vvds_light mt-2'>Kvar by Design</h2>
                                        <h2 className='capitalize text-sm vvds_light leading-none'>Branding</h2>
                                    </div>
                                </div>
                                <div className=" frame_slide_2 z-[-1]  w-full h-screen space-y-10 ">
                                    <div className="w-full ">
                                        <div className="aspect-square h-[25vw] center w-full">
                                            <img className='w-full h-full object-cover' src="/images/Projects/Voltas.webp" alt="" />
                                        </div>
                                        <h2 className='capitalize text-xl vvds_light mt-2'>Voltas</h2>
                                        <h2 className='capitalize text-sm vvds_light leading-none'>Social Media</h2>
                                    </div>
                                    <div className="w-full ">
                                        <div className="aspect-square h-[25vw]  center w-full">
                                            <img className='w-full h-full object-cover' src="/images/Projects/opera.webp" alt="" />
                                        </div>
                                        <h2 className='capitalize text-xl vvds_light mt-2'>Opera Chips</h2>
                                        <h2 className='capitalize text-sm vvds_light leading-none'>Branding</h2>
                                    </div>

                                    <div className="w-full ">
                                        <div className="aspect-square h-[25vw] w-full">
                                            <img className='w-full h-full object-cover' src="/images/Projects/kvar.webp" alt="" />
                                        </div>
                                        <h2 className='capitalize text-xl vvds_light mt-2'>Kvar by Design</h2>
                                        <h2 className='capitalize text-sm vvds_light leading-none'>Branding</h2>
                                    </div>
                                    <div className="w-full ">
                                        <div className="aspect-square h-[25vw] w-full">
                                            <img className='w-full h-full object-cover' src="/images/Projects/oneLess.webp" alt="" />
                                        </div>
                                        <h2 className='capitalize text-xl vvds_light mt-2'>One Less</h2>
                                        <h2 className='capitalize text-sm vvds_light leading-none'>Influencer Marketing</h2>
                                    </div>
                                </div>
                                <div className=" frame_slide_3 z-[-1]  w-full h-screen space-y-10 ">
                                    <div className="w-full ">
                                        <div className="aspect-square h-[25vw] w-full center">
                                            <img className='w-full h-full object-cover' src="/images/Projects/pepsi.webp" alt="" />
                                        </div>
                                        <h2 className='capitalize text-xl vvds_light mt-2'> Pepsi India</h2>
                                        <h2 className='capitalize text-sm vvds_light leading-none'>Social Media</h2>
                                    </div>
                                    <div className="w-full ">
                                        <div className="aspect-square h-[25vw] w-full">
                                            <img className='w-full h-full object-cover' src="/images/Projects/plotPoint.webp" alt="" />
                                        </div>
                                        <h2 className='capitalize text-xl vvds_light mt-2'>Plot Point</h2>
                                        <h2 className='capitalize text-sm vvds_light leading-none'>Branding</h2>
                                    </div>
                                    <div className="w-full ">
                                        <div className="aspect-square h-[25vw] w-full">
                                            <img className='w-full h-full object-cover' src="/images/Projects/wealthFusion.webp" alt="" />
                                        </div>
                                        <h2 className='capitalize text-xl vvds_light mt-2'>Wealthfusion</h2>
                                        <h2 className='capitalize text-sm vvds_light leading-none'>Branding</h2>
                                    </div>
                                    <div className="w-full ">
                                        <div className="aspect-square h-[25vw] w-full">
                                            <img className='w-full h-full object-cover' src="/images/Projects/jadau.webp" alt="" />
                                        </div>
                                        <h2 className='capitalize text-xl vvds_light mt-2'>Jadau</h2>
                                        <h2 className='capitalize text-sm vvds_light leading-none'>Branding</h2>
                                    </div>
                                </div>
                                <div className=" frame_slide_4 z-[-1]  w-full h-screen space-y-10 ">
                                    <div className="w-full ">
                                        <div className="aspect-square h-[25vw] w-full">
                                            <img className='w-full h-full object-cover' src="/images/Projects/labelRituKumar.webp" alt="" />
                                        </div>
                                        <h2 className='capitalize text-xl vvds_light mt-2'>Label Ritu Kumar</h2>
                                        <h2 className='capitalize text-sm vvds_light leading-none'>Social Media</h2>
                                    </div>
                                    <div className="w-full ">
                                        <div className="aspect-square h-[25vw] center w-full">
                                            <img className='w-full h-full object-cover' src="/images/Projects/podarSchool.webp" alt="" />
                                        </div>
                                        <h2 className='capitalize text-xl vvds_light mt-2'>Podar International School</h2>
                                        <h2 className='capitalize text-sm vvds_light leading-none'>Influencer Marketing</h2>
                                    </div>
                                    <div className="w-full ">
                                        <div className="aspect-square h-[25vw] center bg-black w-full">
                                            <img className='w-full h-full object-cover' src="/images/Projects/freddieCity.webp" alt="" />
                                        </div>
                                        <h2 className='capitalize text-xl vvds_light mt-2'>Freddie City</h2>
                                        <h2 className='capitalize text-sm vvds_light leading-none'>Social Media</h2>
                                    </div>
                                    <div className="w-full ">
                                        <div className="aspect-square h-[25vw] w-full">
                                            <img className='w-full h-full object-cover' src="/images/Projects/Voltas.webp" alt="" />
                                        </div>
                                        <h2 className='capitalize text-xl vvds_light mt-2'>Voltas</h2>
                                        <h2 className='capitalize text-sm vvds_light leading-none'>Norda</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" last_vec opacity-0 z-[20] pointer-events-none flex absolute items-center w-full justify-center h-screen">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full"
                        style={{ display: 'block', pointerEvents: 'none' }}
                    />
                </div>

                <div
                    style={{ clipPath: "shape(nonzero from 0% 86.58%, line to 0% 21.71%, curve to 38.77% 15.99% with 0% 21.71% / 28.28% 20.95%, curve to 45.94% 0% with 47.26% 11.97% / 45.94% 0%, line to 53.11% 0%, curve to 70.78% 11.12% with 53.11% 0% / 53.11% 7.41%, curve to 100% 13.6% with 81.43% 13.35% / 100% 13.6%, line to 100% 78.44%, curve to 69.77% 81.24% with 100% 78.44% / 79.36% 79.56%, curve to 53.53% 100% with 47.95% 85.06% / 53.53% 100%, line to 45.82% 100%, curve to 28.57% 89.06% with 45.82% 100% / 47.3% 93.03%, curve to 0% 86.58% with 18.16% 86.85% / 0% 86.58%, close)" }}
                    className=" img_frame_slide_parent absolute_center absolute opacity-0 bg-black  z-[999]  w-[20.5vw] h-[88vh] overflow-hidden pointer-events-none ">
                    <div className=" img_frame_slide_child opacity-0 w-[300vw] h-full bg-[#19334B] relative">
                        {/* royalmile */}
                        <img className=' royal_mile w-[30vw] z-[99]  absolute top-0 left-[30%]' src="/images/Slider Frame/royalMile.png" alt="" />

                        {/* bgimg1 */}
                        <img className=' opacity-70 w-[100vw] h-full  absolute top-0 left-0' src="/images/Slider Frame/bgimg1.png" alt="" />

                        {/* bgimg2 */}
                        <img className=' w-[100vw] h-full   absolute top-0 left-[32%]' src="/images/Slider Frame/bgimg2.png" alt="" />

                        {/* bgimg3  */}
                        <img className=' bgimg3 w-[100vw]  z-[10]  absolute bottom-0 left-[66.5%] mix-blend-darken' src="/images/Slider Frame/bgimg3.png" alt="" />

                        {/* sticker 2 */}
                        <img className=' sticker2 w-[16vw] z-[22] absolute top-[30%] left-[53%]' src="/images/Slider Frame/sticker2.png" alt="" />

                        {/* church  */}
                        <img className=' church h-full z-[20]  absolute top-0 left-[50%]' src="/images/Slider Frame/church.png" alt="" />

                        {/* ellipse  */}
                        <img className=' ellipse w-[30vw] opacity-30  absolute  top-[10%]  left-[12%]' src="/images/Slider Frame/Ellipse.png" alt="" />

                        {/* spiral  */}
                        <img className=' w-[100vw]  absolute  top-[50%]  translate-y-[-50%] left-[.5%]' src="/images/Slider Frame/spiral.png" alt="" />

                        {/* india gate */}
                        <img className=' india_gate w-[25vw] z-[9]  absolute -bottom-4 left-0' src="/images/Slider Frame/IndiaGate.png" alt="" />

                        {/* statue  */}
                        <img className=' w-[30vw]  absolute  top-[50%]  translate-y-[-50%] left-[12.5%]' src="/images/Slider Frame/statue.png" alt="" />

                        {/* car  */}
                        <img className=' car w-[40vw]  absolute z-[4]  bottom-[10%] left-[25%]' src="/images/Slider Frame/car.png" alt="" />

                        {/* pepsi  */}
                        <img className=' pepsi w-[15vw]  absolute z-[2] bottom-[34%] left-[25%]' src="/images/Slider Frame/pepsi.png" alt="" />

                        {/* sticker  */}
                        <img className=' sticker w-[7vw]  z-[9] absolute  bottom-[20%] left-[13%]' src="/images/Slider Frame/sticker.png" alt="" />

                        {/* birds  */}
                        <img className=' birds w-[70vw] z-[99]  absolute mix-blend-darken  top-[-5%] left-[-5%] opacity-40' src="/images/Slider Frame/Birds.png" alt="" />

                        {/* bridge  */}
                        <img className=' bridge w-[250vw]  z-[6] absolute mix-blend-darken  bottom-[-10%] left-0 ' src="/images/Slider Frame/Bridge.png" alt="" />

                        {/* 2025  */}
                        <img className=' w-[5vw] absolute  top-5 right-5 ' src="/images/Slider Frame/2025.png" alt="" />

                        {/* piran pic  */}
                        <img className=' piran_picc w-[32vw] z-[16] absolute mix-blend-plus-lighter  bottom-0 right-16 ' src="/images/Slider Frame/Piran.png" alt="" />

                        {/* piran txt  */}
                        <img className=' piran_txt w-[90vw] z-[16] absolute mix-blend-overlay  bottom-10 right-[4rem] ' src="/images/Slider Frame/PiranText.png" alt="" />

                        {/* footer  */}
                        <div className=" footer  w-[100vw] text-white right-0 absolute bottom-[-15vh] z-[9] bg-[#19334B] px-6 h-[15vh] flex items-center justify-between">
                            <div className="">

                                <h3 className='text-white  vvds_light' >Open to collaborations, commissions, or simply a meaningful conversation. </h3>
                                <h3 className='text-white  vvds_light' >Reach me at me@pirantee.com</h3>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="cursor-pointer  size-10 group hover:scale-90 transition duration-300 rounded-full text-[#19334B] center bg-[#D9D9D9]">
                                    <RiInstagramLine size={18} className='group-hover:scale-110 transition duration-300' />
                                </div>
                                <div className="cursor-pointer  size-10 group hover:scale-90 transition duration-300 rounded-full text-[#19334B] center bg-[#D9D9D9]">
                                    <RiLinkedinLine size={18} className='group-hover:scale-110 transition duration-300' />
                                </div>
                                <div className="cursor-pointer  size-10 group hover:scale-90 transition duration-300 rounded-full text-[#19334B] center bg-[#D9D9D9]">
                                    <RiBehanceLine size={18} className='group-hover:scale-110 transition duration-300' />
                                </div>
                            </div>
                            <div className=" ml-[8vh]  flex h-full items-center gap-5">
                                <h3 className='vvds_light' >Copyright © 2025 . All rights reserved.</h3>
                                <div className=" h-full center group cursor-pointer">
                                    <img className='absolute group-hover:-rotate-45 transition duration-300' src="/logos/arrow-right.svg" alt="" />
                                    <img className='rotate' src="/logos/contact_rotate.svg" alt="" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default DesktopHomeOld;
