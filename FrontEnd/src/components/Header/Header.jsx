import React, { useState,useCallback } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  // console.log("is there :: ",authStatus)
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prevState => !prevState)
  }, [])

  const handleNavigation = useCallback((slug) => {
    navigate(slug)
    setIsMenuOpen(false)
  }, [navigate])


  return (
    <header className='py-4 bg-teal-700 text-white shadow-lg'>
      <Container>
        <nav className='flex items-center justify-between relative'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />

            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className='md:hidden'>
            <button
              onClick={toggleMenu}
              className='text-white focus:outline-none'
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className='hidden md:flex space-x-6 ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-4 py-2 text-lg text-white font-medium rounded-full duration-200 hover:bg-[#3498DB] transition-colors '
                  >{item.name}</button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className='absolute top-full left-0 w-full bg-teal-700 md:hidden z-50'>
              <ul className='flex flex-col items-center space-y-4 py-6'>
                {navItems.map((item) =>
                  item.active ? (
                    <li key={item.name} className='w-full text-center'>
                      <button
                        onClick={() => handleNavigation(item.slug)}
                        className='w-full px-6 py-3 text-white font-medium hover:bg-teal-600 transition-colors'
                      >
                        {item.name}
                      </button>
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li className='w-full text-center'>
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </div>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header