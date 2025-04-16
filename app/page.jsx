
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  FaEnvelope, FaLinkedin, FaGithub, FaJava, FaPython, FaDatabase, FaBug, FaCogs, FaAws, FaComments, FaMoon, FaSun
} from 'react-icons/fa';
import {
  SiSelenium, SiPostman, SiJenkins, SiApacheairflow, SiMysql, SiSqlite, SiJavascript
} from 'react-icons/si';
import { Typewriter } from 'react-simple-typewriter';
import emailjs from 'emailjs-com';

// Projects to be displayed
const allProjects = [
  {
    title: 'Selenium Framework',
    description: 'Built a robust automation framework using Selenium WebDriver, TestNG, and Maven.',
    category: 'QA',
    color: 'text-indigo-400',
  },
  {
    title: 'API Test Suite',
    description: 'Automated REST API tests using Postman and Karate for banking and healthcare apps.',
    category: 'QA',
    color: 'text-pink-400',
  },
  {
    title: 'Data Pipeline with Airflow',
    description: 'Created an ETL pipeline using Apache Airflow and Python for data transformation and loading.',
    category: 'Data',
    color: 'text-green-400',
  },
];

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, type: 'spring', stiffness: 120 },
  }),
};

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [chatOpen, setChatOpen] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const theme = isDarkMode
    ? {
        bg: 'bg-[#0f0f10]',
        section: 'bg-[#1a1a1d]',
        text: 'text-white',
        subtext: 'text-gray-300',
        border: 'border-gray-800',
        navText: 'text-gray-400',
        projectCard: 'bg-[#262626]',
        buttonBg: 'bg-green-400 text-black hover:bg-green-500',
        linkHover: 'hover:text-green-400',
      }
    : {
        bg: 'bg-white',
        section: 'bg-gray-100',
        text: 'text-black',
        subtext: 'text-gray-700',
        border: 'border-gray-300',
        navText: 'text-gray-600',
        projectCard: 'bg-white border border-gray-200',
        buttonBg: 'bg-green-500 text-white hover:bg-green-600',
        linkHover: 'hover:text-green-600',
      };

  const categories = ['All', ...new Set(allProjects.map((p) => p.category))];
  const filteredProjects = filter === 'All' ? allProjects : allProjects.filter((p) => p.category === filter);

  const sendEmail = async (e) => {
    e.preventDefault();
    const form = e.target;
    const timestamp = new Date().toISOString();
    const pageURL = window.location.href;

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      timestamp,
      pageURL,
    };

    emailjs
      .sendForm('service_ky9ox1q', 'template_eni4juf', form, 'YuzyW4Zxp_NnXzoNp')
      .then(
        () => setThankYou(true),
        () => alert('Failed to send message.'),
      );

    try {
      await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error('Google Sheet submission failed:', err);
    }

    form.reset();
    setTimeout(() => setThankYou(false), 4000);
  };

  return (
    <motion.div className={`min-h-screen ${theme.bg} ${theme.text} font-mono scroll-smooth relative transition-all duration-500`}>
      {/* Your component JSX continues here... */}
    </motion.div>
  );
}
