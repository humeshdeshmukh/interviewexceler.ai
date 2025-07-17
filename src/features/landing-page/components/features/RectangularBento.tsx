// @ts-nocheck
import { useState, useEffect } from "react";
import { AnimationProps, motion } from "framer-motion";
import { Laptop, Code, Github } from 'lucide-react';

// Icons related to the interview process, technology stack, and the purpose of InterviewExceler.Ai
import { BsFillPersonCheckFill } from "react-icons/bs";
import { FaLaptopCode, FaQuestionCircle } from "react-icons/fa";
import { SiReact, SiGithub } from "react-icons/si";
import { TbDatabase, TbShieldLockFilled } from "react-icons/tb";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";

// Custom Components for Bento
import { CardBentoIcon } from "./CardBentoIcon";
import { CardBentoWrapper } from "./CardBentoWrapper";

export const RectangularBento = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative h-full w-full bg-gradient-to-br from-brand-blue/20 to-brand-blue/5 rounded-xl p-6 group"
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-brand-blue/10 rounded-xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center space-x-3">
            <Laptop className="w-8 h-8 text-brand-blue" />
            <h3 className="text-xl font-bold text-white">Technical Excellence</h3>
          </div>

          <p className="text-white/70">
            Master technical interviews with our comprehensive coding platform and real-world challenges.
          </p>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-brand-blue" />
              <span className="text-white/80">Live coding environment</span>
            </div>
            <div className="flex items-center space-x-2">
              <Github className="w-5 h-5 text-brand-blue" />
              <span className="text-white/80">GitHub integration</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative h-full min-h-[200px] rounded-lg overflow-hidden"
        >
          {/* Code Editor Animation */}
          <motion.div
            className="absolute inset-0 bg-gray-900 rounded-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="h-full flex flex-col space-y-2"
              animate={{ y: [-200, 0] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <span className="text-brand-blue/50">{i + 1}</span>
                  <span className="text-brand-blue/80">{'function example() {'}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-4 right-4"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" className="text-brand-blue/30">
          <rect x="5" y="5" width="30" height="30" stroke="currentColor" strokeWidth="2" fill="none" />
          <rect x="15" y="15" width="10" height="10" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

const SpinningLogos = () => {
  const { width } = useWindowSize();

  const [sizes, setSizes] = useState({
    radiusToCenterOfIcons: RADIUS_TO_CENTER_OF_ICONS.lg,
    iconWrapperWidth: ICON_WRAPPER_WIDTH.lg,
    ringPadding: RING_PADDING.lg,
    logoFontSize: LOGO_FONT_SIZE.lg,
  });

  useEffect(() => {
    if (!width) return;

    if (width < BREAKPOINTS.sm) {
      setSizes({
        radiusToCenterOfIcons: RADIUS_TO_CENTER_OF_ICONS.sm,
        iconWrapperWidth: ICON_WRAPPER_WIDTH.sm,
        ringPadding: RING_PADDING.sm,
        logoFontSize: LOGO_FONT_SIZE.sm,
      });
    } else if (width < BREAKPOINTS.md) {
      setSizes({
        radiusToCenterOfIcons: RADIUS_TO_CENTER_OF_ICONS.md,
        iconWrapperWidth: ICON_WRAPPER_WIDTH.md,
        ringPadding: RING_PADDING.md,
        logoFontSize: LOGO_FONT_SIZE.md,
      });
    } else {
      setSizes({
        radiusToCenterOfIcons: RADIUS_TO_CENTER_OF_ICONS.lg,
        iconWrapperWidth: ICON_WRAPPER_WIDTH.lg,
        ringPadding: RING_PADDING.lg,
        logoFontSize: LOGO_FONT_SIZE.lg,
      });
    }
  }, [width]);

  return (
    <div
      style={{
        width:
          sizes.radiusToCenterOfIcons +
          sizes.iconWrapperWidth +
          sizes.ringPadding,
        height:
          sizes.radiusToCenterOfIcons +
          sizes.iconWrapperWidth +
          sizes.ringPadding,
      }}
      className="absolute right-0 top-0 z-0 grid translate-x-1/3 place-content-center rounded-full bg-neutral-900/50 shadow-inner"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={TRANSITION}
        style={{
          width:
            sizes.radiusToCenterOfIcons - sizes.iconWrapperWidth - sizes.ringPadding,
          height:
            sizes.radiusToCenterOfIcons - sizes.iconWrapperWidth - sizes.ringPadding,
        }}
        className="relative grid place-items-center rounded-full shadow"
      >
        {ICON_DATA.map((icon, idx) => {
          const degrees = (360 / ICON_DATA.length) * idx;
          return (
            <motion.div
              key={idx}
              style={{
                marginTop:
                  sizes.radiusToCenterOfIcons *
                  Math.sin(degreesToRadians(degrees)),
                marginLeft:
                  sizes.radiusToCenterOfIcons *
                  Math.cos(degreesToRadians(degrees)),
                width: sizes.iconWrapperWidth,
                height: sizes.iconWrapperWidth,
              }}
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={TRANSITION}
              className="absolute grid place-content-center rounded-full bg-gradient-to-br from-[#f38ba3] to-[#f38ba3]/80 text-foreground shadow-lg"
            >
              <icon.Icon
                style={{
                  fontSize: sizes.logoFontSize,
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

interface Size {
  width: number | undefined;
  height: number | undefined;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const degreesToRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

const ICON_DATA = [
  {
    Icon: SiGithub,
  },
  {
    Icon: RiNextjsFill,
  },
  {
    Icon: SiReact,
  },
  {
    Icon: RiTailwindCssFill,
  },
  {
    Icon: TbShieldLockFilled,
  },
  {
    Icon: TbDatabase,
  },
  {
    Icon: FaLaptopCode,
  },
  {
    Icon: BsFillPersonCheckFill,
  },
];

const RADIUS_TO_CENTER_OF_ICONS = {
  sm: 150,
  md: 225,
  lg: 325,
};

const ICON_WRAPPER_WIDTH = {
  sm: 40,
  md: 65,
  lg: 80,
};

const RING_PADDING = {
  sm: 8,
  md: 12,
  lg: 24,
};

const LOGO_FONT_SIZE = {
  sm: 18,
  md: 24,
  lg: 36,
};

const BREAKPOINTS = {
  sm: 480,
  md: 768,
};

const TRANSITION: AnimationProps["transition"] = {
  repeat: Infinity,
  repeatType: "loop",
  duration: 50,
  ease: "linear",
};

export default RectangularBento;
