import React from 'react'
import  { useEffect, useState } from "react";
import HeroSection from '../components/Sections/HeroSection'
import Section2nd from '../components/Sections/Section2nd'
import Section3nd from '../components/Sections/Section3rd'
import Section4th from '../components/Sections/Section4th'
import Section5th from '../components/Sections/Section5th'
import Section6th from '../components/Sections/Section6th'
import Section7th from '../components/Sections/Section7th'
import '../components/Sections/style/Scroolbutton.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
import Section8th from '../components/Sections/Section8th';


function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / windowHeight) * 100;

      setScrollProgress(scrollPercentage);

      if (scrollTop > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
     <div>
      {isVisible && (
        <div className="progress-wrap active-progress" onClick={scrollToTop}>
          <div className="progress-border" style={{ background: `conic-gradient(#6C60FE ${scrollProgress}%, #e0e0e0 ${scrollProgress}%)` }}>
          <FontAwesomeIcon icon={faArrowUp} className="fa-icon" />  {/* Using FontAwesome icon */}
          </div>
        </div>
      )}
    </div>
    <HeroSection/>
    <Section2nd/>
    <Section3nd/>
    <Section4th/>
    <Section5th/>
    <Section6th/>
    <Section7th/>
    <Section8th/>
    </>
  )
}

export default Home