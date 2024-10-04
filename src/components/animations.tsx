"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useInView, useAnimation, motion } from 'framer-motion';
import { gsap } from "gsap";

export function Heading({text}: {text: string}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
    return () => {
      mainControls.stop();
      slideControls.stop();
    };
  }, [isInView, mainControls, slideControls]);

  return (
    <h1 ref={ref} className="text-4xl sm:text-7xl font-bold text-white py-8">{text}</h1>
  )
}

export function SubHeading({text}: {text: string}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const animateHeading = useCallback(() => {
    if (ref.current) {
      const animation = gsap.fromTo(
        ref.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: hasAnimated ? 0 : 1.5,
          duration: 1.5,
          ease: 'power3.out',
          onComplete: () => setHasAnimated(true),
        }
      );
      return () => animation.kill();
    }
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) {
      const cleanup = animateHeading();
      return () => {
        if (cleanup) cleanup();
      };
    }
  }, [hasAnimated, animateHeading]);

  return (
    <h2 ref={ref} className="text-4xl sm:text-4xl font-bold text-white py-8 flex flex-col gap-8 items-center w-full justify-center">{text}</h2>
  )
}

export function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-black relative flex flex-col items-center grid-background"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedContent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInAnimation({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export function HoverScaleAnimation({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
}

export const BackgroundOverlay = React.memo(() => (
  <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
));

BackgroundOverlay.displayName = 'BackgroundOverlay';

export const MenuOverlay: React.FC<{
  toggleMenu: () => void;
  handleLinkClick: (path: string, requiresAuth: boolean) => void;
}> = ({ toggleMenu, handleLinkClick }) => (
  <motion.div
    initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
    animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    exit={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
    transition={{ duration: 0.5 }}
    className="menu-overlay"
  >
    {/* ... content ... */}
  </motion.div>
);

export const AnimatedMenuLink: React.FC<{
  index: number;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ index, onClick, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.3 }}
    className="menu-link-item"
  >
    <div className="menu-link-item-holder">
      <button onClick={onClick} className="menu-link">
        {children}
      </button>
    </div>
  </motion.div>
);
