import { cn } from "../../components/lib/utils";
import React, { useState, createContext, useContext, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// Animation variants for sidebar link labels
const labelVariants = {
  hidden: { opacity: 0, x: -10, display: "none" },
  visible: {
    opacity: 1,
    x: 0,
    display: "inline-block",
    transition: {
      delay: 0.1,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({ children, open, setOpen, isMobile, animate }) => {
  const handleBodyScroll = useCallback((isOpen) => {
    if (isMobile) {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobile]);

  useEffect(() => {
    handleBodyScroll(open);
    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [open, handleBodyScroll]);

  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      <motion.div
        className={cn(
          "fixed sm:static inset-y-0 left-0 z-50 sm:z-0 flex flex-col w-3/4 sm:w-auto",
          "bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700",
          "transition-transform duration-300 ease-in-out shadow-lg sm:shadow-none"
        )}
        initial={{ x: isMobile ? "-100%" : 0 }}
        animate={{
          x: isMobile ? (open ? 0 : "-100%") : 0, // Slide on mobile, static on desktop
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        {isMobile && (
          <div className="flex justify-end p-4">
            <button
              onClick={() => setOpen(false)}
              className="text-neutral-700 dark:text-neutral-200"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
        {children}
      </motion.div>
      {/* Overlay for mobile when sidebar is open */}
      {open && isMobile && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setOpen(false)}
        />
      )}
    </SidebarProvider>
  );
};

export const SidebarBody = (props) => {
  return <DesktopSidebar {...props} />;
};

export const DesktopSidebar = ({ className, children, ...props }) => {
  const { open, setOpen, animate } = useSidebar();
  const timeoutRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  }, [setOpen]);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200); // 200ms delay before closing
  }, [setOpen]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current); // Cleanup timeout on unmount
  }, []);

  return (
    <motion.div
      layout // Automatically adjust layout of parent/children
      className={cn(
        "h-full px-3 py-4 flex flex-col w-full shrink-0", // Reduced padding to px-3 (12px)
        className
      )}
      animate={{
        width: !animate ? "300px" : open ? "300px" : "65px", // Increased collapsed width to 72px
      }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const SidebarLink = ({ link, className, ...props }) => {
  const { open, animate } = useSidebar();
  const iconRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!animate) return;

    const icon = iconRef.current;
    const label = labelRef.current;

    if (icon && label) {
      const iconHover = gsap.to(icon, {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: "power2.out",
        paused: true,
      });

      const labelHover = gsap.to(label, {
        x: 2,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        paused: true,
      });

      const handleMouseEnter = () => {
        iconHover.play();
        labelHover.play();
      };

      const handleMouseLeave = () => {
        iconHover.reverse();
        labelHover.reverse();
      };

      icon.addEventListener("mouseenter", handleMouseEnter);
      icon.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        icon.removeEventListener("mouseenter", handleMouseEnter);
        icon.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [animate]);

  return (
    <a
      onClick={link.onClick}
      className={cn(
        "flex items-center justify-start gap-3 sm:gap-2 group/sidebar py-3 sm:py-2 cursor-pointer px-2", // Reduced padding to px-2
        className
      )}
      {...props}
    >
      <div ref={iconRef} className="flex-shrink-0">{link.icon}</div>
      <motion.span
        ref={labelRef}
        variants={labelVariants}
        initial="hidden"
        animate={open ? "visible" : "hidden"}
        className="text-neutral-700 dark:text-neutral-200 text-base sm:text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 font-poppins"
      >
        {link.label}
      </motion.span>
    </a>
  );
};