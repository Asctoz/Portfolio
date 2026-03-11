import { useState, useEffect, useRef, useCallback } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar.jsx";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconMail,
  IconBrandGithub,
  IconBrandInstagram,
  IconMenu2,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../components/lib/utils.js";

const links = [
  {
    label: "Dashboard",
    icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-6 w-6 sm:h-5 sm:w-5" />,
  },
  {
    label: "About",
    icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-6 w-6 sm:h-5 sm:w-5" />,
  },
  {
    label: "Goals/Progress",
    icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-6 w-6 sm:h-5 sm:w-5" />,
  },
  {
    label: "Viewable Projects",
    icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-6 w-6 sm:h-5 sm:w-5" />,
  },
];

const statsVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
  hover: {
    scale: 1.03,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.2 },
  },
};

const activityVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
  hover: {
    scale: 1.02,
    backgroundColor: "rgba(229, 231, 235, 0.3)",
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
  hover: {
    scale: 1.05,
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const progressVariants = {
  hidden: { width: 0 },
  visible: (percentage) => ({
    width: `${percentage}%`,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  }),
};

const buttonVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  hover: { 
    backgroundColor: "#3B82F6",
    scale: 1.05,
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.95, transition: { duration: 0.2 } },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
  hover: { scale: 1.1, transition: { duration: 0.2 } },
};

function App() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);


  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 640;
      setIsMobile(newIsMobile);
      if (!newIsMobile) {
        setOpen(false); 
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSectionChange = useCallback((section) => {
    setActiveSection(section);
    setOpen(false); 
  }, []);

  return (
    <div className="relative flex flex-col sm:flex-row w-screen h-screen overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-900">
      {isMobile && (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
          <button onClick={() => setOpen(true)} className="text-neutral-700 dark:text-neutral-200">
            <IconMenu2 className="h-8 w-8" />
          </button>
          <h1 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 font-poppins">
            {activeSection}
          </h1>
        </div>
      )}

      <Sidebar open={open} setOpen={setOpen} isMobile={isMobile}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open || !isMobile ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={{
                    ...link,
                    onClick: () => handleSectionChange(link.label),
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Made By Asctoz",
                onClick: () => handleSectionChange("Made By Asctoz"),
                icon: (
                  <img
                    src="/IMG_5519.jpeg"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      <AnimatePresence mode="wait">
        <motion.div
          layout
          key={activeSection}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-1 h-full w-full overflow-y-auto sm:min-w-0"
        >
          {activeSection === "Dashboard" && <Dashboard />}
          {activeSection === "About" && <About />}
          {activeSection === "Goals/Progress" && <GoalsProgress />}
          {activeSection === "Viewable Projects" && <ViewableProjects />}
          {activeSection === "Made By Asctoz" && <About />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const Logo = () => {
  return (
    <div className="relative z-20 flex items-center space-x-2 text-sm font-normal text-black">
      <img
        src="/logo.png"
        alt="Logo"
        className="h-12 w-12 sm:h-15 sm:w-20 rounded-full object-cover"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white font-poppins text-sm sm:text-base"
      >
        Asctoz Productions
      </motion.span>
    </div>
  );
};

const LogoIcon = () => {
  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black px-4">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl sm:border sm:border-neutral-200 bg-white p-4 sm:p-12 dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex flex-col sm:flex-row gap-4">
        <motion.div
          className="h-24 w-full rounded-xl bg-gray-100 dark:bg-neutral-800 p-4 flex items-center justify-between shadow-lg"
          variants={statsVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          custom={0}
        >
          <div>
            <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 font-poppins">
              Name
            </h3>
            <p className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white font-poppins">
              Asctoz's Portfolio
            </p>
          </div>
          <div className="text-2xl">🤑</div>
        </motion.div>
        <motion.div
          className="h-24 w-full rounded-xl bg-gray-100 dark:bg-neutral-800 p-4 flex items-center justify-between shadow-lg"
          variants={statsVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          custom={1}
        >
          <div>
            <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 font-poppins">
              Total Projects
            </h3>
            <p className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white font-poppins">
              9 | few not mentioned
            </p>
          </div>
          <div className="text-2xl">📃</div>
        </motion.div>
        <motion.div
          className="h-24 w-full rounded-xl bg-gray-100 dark:bg-neutral-800 p-4 flex items-center justify-between shadow-lg"
          variants={statsVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          custom={2}
        >
          <div>
            <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 font-poppins">
              Active Projects
            </h3>
            <p className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white font-poppins">
              3
            </p>
          </div>
          <div className="text-2xl">⚒️</div>
        </motion.div>
        <motion.div
          className="h-24 w-full rounded-xl bg-gray-100 dark:bg-neutral-800 p-4 flex items-center justify-between shadow-lg"
          variants={statsVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          custom={3}
        >
          <div>
            <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 font-poppins">
              Projects Completed
            </h3>
            <p className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white font-poppins">
              4
            </p>
          </div>
          <div className="text-2xl">⚒️</div>
        </motion.div>
      </div>
      <div className="flex flex-col sm:flex-row flex-1 gap-4">
        <div className="h-auto sm:h-full w-full rounded-xl bg-gray-100 dark:bg-neutral-800 p-4 sm:p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-neutral-800 dark:text-neutral-200 font-poppins">
             Recent Activity
            </h3>
          </div>

          {/*
            Activity data with explicit status
          */}
          {(() => {
            const activities = [
              {
                text: "AI WEBSITE CREATOR - (PYTHON)",
                status: "Completed",
              },
              {
                text: "Made/Helped making school PDC website - (CSS|JS[REACT])",
                status: "Completed",
              },
              {
                text: "Made AI education chat bot - (PYTHON)",
                status: "Completed",
              },
              {
                text: "Made AI education chat bot - (PYTHON)",
                status: "Completed",
              },
              {
                text: "Project RBLX : Find The AI - (PYTHON|LUA)",
                status: "Ongoing",
              },
              {
                text: "Project RBLX : The Button Game - (LUA)",
                status: "Ongoing",
              }, 
              {
                text: "Gesture Control Glass Mousepad - (C++/PYTHON)",
                status: "Ongoing",
              },
              {
                text: "TaskManager TaskFlows - (JS/HTML/CSS)",
                status: "Abandoned",
              },
              {
                text: "Roblox Fading FootSteps - (LUA)",
                status: "Abandoned",
              },
            ];

            return (
              <ul className="space-y-3">
                {activities.map((activity, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center justify-between gap-3 p-2 rounded-md"
                    variants={activityVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    custom={idx}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-700 dark:text-neutral-300">➔</span>

                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-poppins">
                        {activity.text}
                      </p>
                    </div>

                    {/* Status Bubble */}
                    <span
                      className={`px-2 py-1 text-[10px] sm:text-xs font-semibold rounded-full ${
                        activity.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : activity.status === "Ongoing"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-red-100 text-red-800 dark:bg-red-500 dark:text-red-100"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </motion.li>
                ))}
              </ul>
            );
          })()}
        </div>
        <div className="h-auto sm:h-full w-full rounded-xl bg-gray-100 dark:bg-neutral-800 p-4 sm:p-6 shadow-lg">
          <h3 className="text-base sm:text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4 font-poppins">
            Project Overview
          </h3>
          {[
            { name: "Project PDC", percentage: 100, color: "bg-green-500" },
            { name: "Project Edu-ChatBot", percentage: 100, color: "bg-green-500" },
            { name: "Project AI WEBDEV", percentage: 100, color: "bg-green-500" },
            { name: "Project Roblox : Find the AI", percentage: 30, color: "bg-red-400" },
            { name: "Gesture Control Glass Mousepad", percentage: 25, color: "bg-red-400" },
            { name: "Project Roblox : The Button Game", percentage: 10, color: "bg-red-400" },
            { name: <>Project Roblox : Fading Footsteps <span className="text-red-500">* Abandoned</span></>, percentage:75, color: "bg-red-200" },
            { name: <>Project TaskFlows <span className="text-red-500">* Abandoned</span></>, percentage: 25, color: "bg-red-400" },
            
          ].map((project, idx) => (
            <div key={idx} className="space-y-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 font-poppins">
                  {project.name}
                </span>
                <span
                  className={`text-xs sm:text-sm font-semibold ${
                    project.percentage === 0 ? "text-gray-500" : project.color.replace("bg-", "text-")
                  } font-poppins`}
                >
                  {project.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2 shadow-inner">
                <div
                  className={`h-2 rounded-full ${project.color}`}
                  style={{ width: `${project.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const [copied, setCopied] = useState(false);
  const skillsRef = useRef(null);
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSkillsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText("oanother065@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl sm:border sm:border-neutral-200 bg-white p-4 sm:p-12 dark:border-neutral-700 dark:bg-neutral-900 overflow-y-auto">
      <motion.h1
        className="text-2xl sm:text-3xl font-semibold text-neutral-800 dark:text-neutral-200 font-poppins"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        About Me
      </motion.h1>
      <motion.p
        className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 font-poppins"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      >
        Hi! I’m Asctoz - 'Online Name | Persona', a passionate developer who loves programming, trying out new stuff, creating cool projects, playing video games and etc.. This portfolio showcases my work, journey and skills. I’m always looking to learn and grow, so feel free to reach out if you want to collaborate or just chat!
        <pre className="mt-2">
          <i className="text-sm">honorable mention - Chatgpt</i>
        </pre>
      </motion.p>

      
      <motion.div
        className="rounded-xl bg-gray-100 dark:bg-neutral-800 p-4 sm:p-6 shadow-lg"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        custom={0}
      >
        <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-neutral-200 font-poppins mb-3">
          My Journey
        </h2>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-poppins">
          I started coding around 4th grade with basic LUA, building simple games for fun. Over time, I discovered CSS and fell in love with its customization, using it for everything from designing frontend projects to making animations. I also started with intermediate Python - Later, I dived into JavaScript and React, which opened up a whole new world of interactive web development. Now, I’m currently learning more about Computer engeneering starting off with C++ and some personal IOT projects. Also a quick note that not all my projects will be mentioned here b ecause i've had too many small projects and experiments, but the ones listed here are the ones I’m most proud of and want to showcase!
        </p>
      </motion.div>

      
      <motion.div
        ref={skillsRef}
        className="rounded-xl bg-gray-100 dark:bg-neutral-800 p-4 sm:p-6 shadow-lg"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        custom={1}
      >
        <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-neutral-200 font-poppins mb-3">
          Skills
        </h2>
        <div className="space-y-3">
          {[
            { name: "React", level: 70 },
            { name: "Next", level: 40 },
            { name: "C++", level: 35 },
            { name: "Python", level: 85 },
            { name: "HTML/CSS", level: 100 },
            { name: "JavaScript", level: 65 },
            { name: "Lua", level: 95 },
          ].map((skill, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 font-poppins">
                  {skill.name}
                </span>
                <span className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-poppins">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full bg-blue-500"
                  initial="hidden"
                  animate={isSkillsVisible ? "visible" : "hidden"}
                  custom={skill.level}
                  variants={progressVariants}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="rounded-xl bg-gray-100 dark:bg-neutral-800 p-4 sm:p-6 shadow-lg"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        custom={2}
      >
        <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-neutral-200 font-poppins mb-3">
          Hobbies
        </h2>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-poppins">
          When I’m not coding, I enjoy playing video games or building self targetted projects meant to help my daily life. I also love watching & reading sci-fi novels & movies and editing videos.
        </p>
      </motion.div>

      
      <motion.div
        className="rounded-xl bg-gray-100 dark:bg-neutral-800 p-4 sm:p-6 shadow-lg"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        custom={3}
      >
        <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-neutral-200 font-poppins mb-3">
          Contact Me
        </h2>
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <IconMail className="text-neutral-700 dark:text-neutral-300 h-5 w-5" />
              <span className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-poppins">
                oanother065@gmail.com
              </span>
            </div>
            <motion.button
              onClick={handleCopyEmail}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm font-poppins"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? "Copied!" : "Copy Email"}
            </motion.button>
          </div>
          <div className="flex gap-4">
            <motion.a
              href="https://github.com/asctoz"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconBrandGithub className="text-neutral-700 dark:text-neutral-300 h-6 w-6" />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/abhahahuhu"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconBrandInstagram className="text-neutral-700 dark:text-neutral-300 h-6 w-6" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const GoalsProgress = () => {
  const learningGoals = [
    "Solidify my javascript concepts",
    "Advance more in Python",
    "Started Backend already with Python. Use the same for webdev.",
    "Fully grasp IOT with various physics concepts and robotics.",
    "Swap to Typescript",
    "Learn C++ to an mastered level",
    "Use C++ to get into game development and systems programming",
    "Complete more projects and have fun.",
  ];

  const achievements = [
    "Built our school's PDC website.",
    "Created an AI education chatbot with Python and Gemini AI.",
    "Made multiple IOT and chemistry/physics based projects.",
    "Used Lua to create game mechanics in Roblox.",
    "Created my own capacitive touch layer.",
  ];

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl sm:border sm:border-neutral-200 bg-white p-4 sm:p-12 dark:border-neutral-700 dark:bg-neutral-900 overflow-y-auto">
      <motion.h1
        className="text-2xl sm:text-3xl font-semibold text-neutral-800 dark:text-neutral-200 font-poppins"
        initial={{ y: 20, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        My Goals & Progress
      </motion.h1>

      
      <motion.div
        className="rounded-xl bg-gray-100 dark:bg-neutral-800 p-4 sm:p-6 shadow-lg"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        custom={0}
      >
        <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-neutral-200 font-poppins mb-3">
          My Future Plans
        </h2>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-poppins mb-4">
          I’m passionate about growing as a developer, and I have a clear roadmap for the skills I want to learn next. Here’s what I’m planning to focus on:
        </p>
        <ul className="space-y-2">
          {learningGoals.map((goal, idx) => (
            <motion.li
              key={idx}
              className="flex items-center gap-2 p-2 rounded-md"
              variants={activityVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              custom={idx}
            >
              <span className="text-neutral-700 dark:text-neutral-300">➔</span>
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-poppins">
                {goal}
              </p>
            </motion.li>
          ))}
        </ul>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-poppins mt-4">
          I want to learn these skills because I believe they’ll make me a more versatile developer. With a goal  of being an independent developer who can create IOT, Webdev, Gamedev, AppDev and try making servers and systems.
        </p>
      </motion.div>

    
      <motion.div
        className="rounded-xl bg-gray-100 dark:bg-neutral-800 p-4 sm:p-6 shadow-lg"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        custom={1}
      >
        <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-neutral-200 font-poppins mb-3">
          My Aspirations
        </h2>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-poppins">
          My ultimate goal is to become a independent developer who can do WEBDEV, Game Development, App Development, and AI. I want to create projects that not only showcase my skills but also make fun things that others can enjoy aswell. I’m excited about the journey ahead and can’t wait to see where it takes me!
        </p>
      </motion.div>

      
      <motion.div
        className="rounded-xl bg-gray-100 dark:bg-neutral-800 p-4 sm:p-6 shadow-lg"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        custom={2}
      >
        <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 dark:text-neutral-200 font-poppins mb-3">
          What I’ve Achieved So Far
        </h2>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 font-poppins mb-4">
          The proud of the milestones I’ve reached on my coding journey.
        </p>
        <ul className="space-y-2">
          {achievements.map((achievement, idx) => (
            <motion.li
              key={idx}
              className="flex items-center gap-2 p-2 rounded-md"
              variants={activityVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              custom={idx}
            >
              <span className="text-neutral-700 dark:text-neutral-300">✔</span>
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-poppins">
                {achievement}
              </p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

const ViewableProjects = () => {
  const projects = [
    {
      title: "School PDC Website",
      description: "A professional website for my school’s PDC, featuring a modern design and smooth animations.",
      tech: ["React", "Tailwind CSS", "Framer Motion"],
      link: "https://dism-pdc.pages.dev",
      status: "Completed",
      emoji: "🌐",
    },
    {
      title: "AI Education Chatbot",
      description: "An AI-powered chatbot to assist with education, using speech recognition and text-to-speech.",
      tech: ["Python", "Gemini AI", "SpeechRecognition"],
      link: "https://github.com/Asctoz/Bot",
      status: "Completed",
      emoji: "🤖",
    },
    {
      title: "Fading Footsteps",
      description: "A Roblox game mechanic that creates fading footsteps using Lua scripting.",
      tech: ["Lua", "Roblox Studio"],
      link: "https://www.roblox.com/games/70901698559394/Fading-Footsteps",
      status: "Abandoned",
      emoji: "👣",
    },

  ];

  return (
    <div className="relative flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl sm:border sm:border-neutral-200 bg-gradient-to-br from-black to-gray-500 p-4 sm:p-12 dark:border-neutral-700 dark:from-neutral-800: dark:bg-neutral-900 dark:to-neutral-800 overflow-y-auto">
      
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "linear-gradient(45deg, #1a1a1a, #3a3f5c)",
            "linear-gradient(45deg, #3a3f5c, #1a1a1a)",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.h1
        className="relative text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-200 font-poppins z-10"
        initial={{ y: 20, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        Viewable Projects
      </motion.h1>
      <motion.p
        className="relative text-base sm:text-lg text-neutral-700 dark:text-neutral-300 font-poppins mb-6 z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      >
        Check out my public projects! Click on any project to visit its live demo or repository. <hr className="my-4" />Note: Not all projects are listed here as many are still private or on my local system but more should come in the future.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            className="relative rounded-xl bg-gradient-to-br from-gray-50 to-gray-200 dark:from-neutral-800 dark:to-neutral-700 p-6 shadow-lg border border-transparent hover:border-blue-500 transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            custom={idx}
          >
            
            <div className="text-4xl mb-4">{project.emoji}</div>
            
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 font-poppins mb-2">
              {project.title}
            </h2>
            
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-poppins mb-4">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, techIdx) => (
                <motion.span
                  key={techIdx}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full font-poppins"
                  variants={tagVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  custom={techIdx}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            
            <motion.span
              className={`absolute top-4 right-4 px-2 py-1 text-xs font-semibold rounded-full ${
                project.status === "Completed"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : project.status === "Ongoing"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              } font-poppins`}
              variants={tagVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              {project.status}
            </motion.span>
            
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg font-poppins text-sm"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              Visit Project
            </motion.a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default App;