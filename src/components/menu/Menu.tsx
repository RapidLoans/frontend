"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "./menu.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { GrClose } from "react-icons/gr";
import { useRouter } from "next/navigation";

// Dummy user & isAdmin variables (Replace with actual logic or props)
const user = null; // Replace with actual user state or context
const isAdmin = false; // Replace with actual admin logic

const menuLinks = [
  {
    path: "/",
    label: "HOME",
  },
  {
    path: "/events",
    label: "EVENTS",
  },
  {
    path: "/team",
    label: "TEAM",
  },
  {
    path: "/about",
    label: "ABOUT US",
  },
  {
    path: "/auth/login",
    label: "LOGIN",
  },
  {
    path: "/gallery",
    label: "GALLERY",
  },
];

const Menu = () => {
  const container = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tl = useRef(gsap.timeline({ paused: true }));
  const router = useRouter();

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

  const handleLogout = async () => {
    // Dummy logout function, replace with actual implementation
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating async logout
    router.refresh();
  };

  return (
    <div className="menu-container" ref={container}>
      <div className="menu-bar">
        <div className="menu-logo">
          <Link href={"/"}>
            RapidLoans
          </Link>
        </div>
        <div className="menu-open" onClick={toggleMenu}>
          <GiHamburgerMenu id={"open"} />
        </div>
      </div>

      <div className="menu-overlay">
        <div className="menu-overlay-bar">
          <div className="menu-logo">
            <Link href={"/"}>RapidLoans</Link>
          </div>
          <div className="menu-close" onClick={toggleMenu}>
            <GrClose id={"close"} />
          </div>
        </div>

        <div className="menu-links">
          {menuLinks.map((link, index) => (
            <div className="menu-link-item" key={index}>
              <div className="menu-link-item-holder" onClick={toggleMenu}>
                <Link
                  href={
                    link.label !== "LOGIN"
                      ? link.path
                      : !!user
                        ? "#"
                        : "/auth/login"
                  }
                  onClick={
                    link.label === "LOGIN" && !!user
                      ? handleLogout
                      : undefined
                  }
                  className="menu-link"
                >
                  {link.label !== "LOGIN"
                    ? link.label
                    : !!user
                      ? "LOGOUT"
                      : "LOGIN"}
                </Link>
              </div>
            </div>
          ))}
          {isAdmin && (
            <div className="menu-link-item">
              <div className="menu-link-item-holder" onClick={toggleMenu}>
                <Link href={"/admin"} className="menu-link">
                  ADMIN PANEL
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="menu-info">
          <div className="menu-info-col">
            <a href="#">X &#8599;</a>
            <a href="https://www.instagram.com/acm_abesec/">
              Instagram &#8599;
            </a>
            <a href="#">LinkedIn &#8599;</a>
            <a href="#">Facebook &#8599;</a>
          </div>
          <div className="menu-info-col">
            <p>acmwebsite.co.in</p>
            <p>987654321</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
