import React from 'react'
import { useLocation } from 'react-router-dom'
import './SplashImage.css'

export default function SplashImage() {
    const { pathname } = useLocation();
console.log(pathname);

  return pathname === "/" || pathname === "/enroll-now" ?  (
    <div className='image-container'>

      <div className='main-image'></div>
    </div>
  ): null
}
