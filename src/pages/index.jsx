import AboutWork from '@/components/home/AboutWork'
import Gallery from '@/components/home/Gallery'
import GallerySwiper from '@/components/home/InfiniteCarousel'
import Hero from '@/components/home/Hero'
import ProjectsScroll from '@/components/home/ProjectsScroll'
import React from 'react'

const Home = () => {
  return (
    <>
      <Hero/>
      <AboutWork/>
      <ProjectsScroll/>
      <Gallery/>
      {/* <GallerySwiper/> */}
    </>
  )
}

export default Home