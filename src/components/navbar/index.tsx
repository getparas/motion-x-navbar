"use client";

import { useState } from "react";
import Container from "../container";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
} from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navItems = [
    { title: "About", href: "/about" },
    { title: "Projects", href: "/projects" },
    { title: "Contact", href: "/contact" },
    { title: "Blog", href: "/blog" },
    { title: "Resume", href: "/resume" },
  ];

  const [hovered, setHovered] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Container>
      <motion.nav
        animate={{
          boxShadow: scrolled ? "var(--shadow-aceternity)" : "none",
          width: scrolled
            ? typeof window !== "undefined" && window.innerWidth < 768
              ? "90%"
              : "50%"
            : "100%",
          y: scrolled ? 10 : 0,
          backdropFilter: "blur(8px)",
        }}
        transition={{
          duration: 0.3,
          ease: "linear",
        }}
        className="fixed inset-x-0 top-0 z-50 mx-auto flex max-w-4xl items-center justify-between rounded-full bg-white/80 px-3 py-2 backdrop-blur-md dark:bg-neutral-900/80"
      >
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10 border-2 border-neutral-200 dark:border-neutral-700">
            <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
            <AvatarFallback className="bg-neutral-200 font-medium dark:bg-neutral-800">
              MX
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
            Motion X
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex md:gap-3">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="relative px-2 py-1 text-sm font-medium transition-colors"
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {hovered === idx && (
                <motion.span
                  layoutId="hovered-span"
                  className="absolute inset-0 h-full w-full rounded-md bg-neutral-100 dark:bg-neutral-800"
                />
              )}
              <span className="relative z-10 font-medium">{item.title}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 mx-auto max-w-4xl rounded-b-2xl bg-white/95 px-4 py-6 shadow-lg backdrop-blur-md dark:bg-neutral-900/95"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Navbar;
