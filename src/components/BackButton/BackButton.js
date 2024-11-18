import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BackButton.css';

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [opacity, setOpacity] = useState(0.5);
  const [isVisible, setIsVisible] = useState(false);

  // Check if the screen width is greater than 600px and not on the homepage
  const checkVisibility = () => {
    const isDesktop = window.innerWidth > 600;
    const isNotHomePage = location.pathname !== '/';
    setIsVisible(isDesktop && isNotHomePage);
  };

  // Adjust opacity based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = window.innerHeight;
      const newOpacity = Math.max(0.2, 0.5 - (scrollTop / maxScroll) * 0.3);
      setOpacity(newOpacity);
    };

    const handleResize = () => checkVisibility();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    checkVisibility();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [location]);

  if (!isVisible) return null;

  return (
    <button
      className="back-button"
      style={{ opacity }}
      onClick={() => navigate('/')}
    >
      ← Return Home
    </button>
  );
}

export default BackButton;