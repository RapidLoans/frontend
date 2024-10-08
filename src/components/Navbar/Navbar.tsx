"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "./menu.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { gsap } from "gsap";
import { GrClose } from "react-icons/gr";
import { WalletActionButton } from "@tronweb3/tronwallet-adapter-react-ui";

const menuLinks = [
  {
    path: "/",
    label: "HOME",
  },
  {
    path: "/lendingpool",
    label: "LIQUIDITY POOL",
  },
  {
    path: "/flashloan",
    label: "FLASH LOAN",
  },
  { 
    path: "/addressbook",
     label: "ADDRESS BOOK" 
  },
  { 
    path: "/termsandconditions",
    label: "T&C" 
  },
];

const Navbar = () => {
  const container = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tl = useRef(gsap.timeline({ paused: true }));

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Initialize GSAP animations
  useEffect(() => {
    gsap.set(".menu-link-item-holder", { y: 75 });
    tl.current = gsap
      .timeline({ paused: true })
      .to(".menu-overlay", {
        duration: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.inOut",
      })
      .to(".menu-link-item-holder", {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.inOut",
        delay: -0.75,
      });
  }, []);

  // Play/reverse animation on menu toggle
  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  return (
    <div className="menu-container" ref={container}>
      <div className="menu-bar">
        <div className="menu-logo font-bold text-xl">
          <Link href={"/"}>RapidLoans</Link>
        </div>
        <div className=" flex gap-2 items-center justify-center">
          <WalletActionButton className="rounded-3xl" />
          <div className="menu-open" onClick={toggleMenu}>
            <GiHamburgerMenu id={"open"} />
          </div>
        </div>
      </div>

      <div className="menu-overlay">
        <div className="menu-overlay-bar">
          <div className="menu-logo font-bold text-xl text-black">
            <Link href={"/"}>RapidLoans</Link>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <WalletActionButton className="rounded-3xl" />
            <div className="menu-close" onClick={toggleMenu}>
              <GrClose id={"close"} className="items-self-baseline" />
            </div>
          </div>
        </div>

        <div className="menu-links">
          {menuLinks.map((link, index) => (
            <div className="menu-link-item" key={index}>
              <div className="menu-link-item-holder" onClick={toggleMenu}>
                <Link href={link.path} className="menu-link">{link.label}</Link>
              </div>
            </div>
          ))}
        </div>

        <div className="menu-info">
          <div className="menu-info-col">
            <a
              href="https://github.com/RapidLoans"
              className="text-black text-lg font-semibold"
            >
              Github &#8599;
            </a>
            <br />
            <a
              href="https://rapidloans.vercel.app"
              className="text-black text-lg font-semibold"
            >
              rapidloans.vercel.app &#8599;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
