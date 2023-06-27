import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='bg-black-secondary text-light-grey p-8 text-center text-xl absolute w-full z-50' ><Link to="/">To Do List App</Link></nav>
  )
}

export default NavBar