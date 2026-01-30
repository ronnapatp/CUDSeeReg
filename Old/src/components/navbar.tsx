"use client"
import { useState } from 'react';
import Link from 'next/link';
import Container from './container'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`p-4 bg-white ${
      isMenuOpen ? '' : 'shadow-md'
    } md:shadow-md`}>
      <Container>
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-slate-800 font-bold">
          <Link href="/">CUDSeeReg</Link>
        </div>
        <div className="hidden md:flex space-x-4 text-slate-800">
          <Link href="https://cudreg.com/cuds" target="_blank">
            <img src="/cudreg-logo.png" />
          </Link>
          <Link href="/">วิชาเลือก</Link>
          <Link href="/usage">วิธีใช้</Link>
          <Link href="/timetable">ตารางเรียน</Link>
          <Link href="/about">เกี่ยวกับเรา</Link>
        </div>
        <div className="md:hidden">
          <button
            className="text-slate-800 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        <div
          className={`md:hidden ${
            isMenuOpen ? 'block' : 'hidden'
          } absolute top-10 right-0 bg-white text-slate-800 w-full mt-0 rounded-md shadow-md`}
        >
          <div className="flex flex-col items-end p-6 mr-2">
            <Link href="https://cudreg.com/cuds">CUDReg</Link>
            <Link href="/">วิชาเลือก</Link>
            <Link href="/timetable">ตารางเรียน</Link>
            <Link href="/about">เกี่ยวกับเรา</Link>
          </div>
        </div>
      </div>
      </Container>
    </nav>
  );
};

export default Navbar;
