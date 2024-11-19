import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollFunction = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", scrollFunction);
    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      onClick={scrollToTop}
      style={{ display: isVisible ? "block" : "none" }}
      className="scroll-to-top"
      title="Go to top"
    >
     <FontAwesomeIcon icon={faArrowAltCircleUp} className="fa-2xl" />
    </button>
  );
};

export default ScrollToTopButton;
