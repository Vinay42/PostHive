// import React from 'react'
// import { Link } from 'react-router-dom'
// import Logo from '../Logo'

// function Footer() {
//   return (
//     <section className="relative overflow-hidden py-10 bg-teal-700 text-white border border-t-2 border-t-black">
//             <div className="relative z-10 mx-auto max-w-7xl px-4">
//                 <div className="-m-6 flex flex-wrap">
//                     <div className="w-full p-6 md:w-1/2 lg:w-5/12">
//                         <div className="flex h-full flex-col justify-between">
//                             <div className="mb-4 inline-flex items-center">
//                                 <Logo width="100px" />
//                             </div>
//                             <div className='mb-4 inline-flex items-center'>
//                                 <p className="text-sm text-white">
//                                     &copy; Copyright 2024
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-white">
//                                 Company
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-white hover:text-[#3498DB]"
//                                         to="/"
//                                     >
//                                         Features
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-white hover:text-[#3498DB]"
//                                         to="/"
//                                     >
//                                         Pricing
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-white hover:text-[#3498DB]"
//                                         to="/"
//                                     >
//                                         Affiliate Program
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-white hover:text-[#3498DB]"
//                                         to="/"
//                                     >
//                                         Press Kit
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-white">
//                                 Support
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-white hover:text-[#3498DB]"
//                                         to="/"
//                                     >
//                                         Account
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-white hover:text-[#3498DB]"
//                                         to="/"
//                                     >
//                                         Help
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-white hover:text-[#3498DB]"
//                                         to="/"
//                                     >
//                                         Contact Us
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-white hover:text-[#3498DB]"
//                                         to="/"
//                                     >
//                                         Customer Support
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-3/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-white">
//                                 Legals
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-white hover:text-[#3498DB]"
//                                         to="/"
//                                     >
//                                         Terms &amp; Conditions
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-white hover:text-[#3498DB]"
//                                         to="/"
//                                     >
//                                         Privacy Policy
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-white hover:text-[#3498DB]"
//                                         to="/"
//                                     >
//                                         Licensing
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//   )
// }

// export default Footer

import React from 'react'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-teal-700 to-teal-800 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1 flex flex-col justify-between space-y-4 md:space-y-0">
            <div>
              <div className="mb-4 md:mb-6">
                <Logo width="120px" className="mb-3 md:mb-4" />
                
              </div>
            </div>
            <div className="text-xs sm:text-sm text-teal-200">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </div>
          </div>

          {/* Footer Links */}
          <div className="md:col-span-3 grid grid-cols-3 gap-4 md:gap-6">
            {/* Company Column */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-200 mb-2 md:mb-4">
                Company
              </h4>
              <div className="space-y-1 sm:space-y-3">
                <p className="text-xs sm:text-sm text-teal-100">Features</p>
                <p className="text-xs sm:text-sm text-teal-100">Pricing</p>
                <p className="text-xs sm:text-sm text-teal-100">Affiliate Program</p>
                <p className="text-xs sm:text-sm text-teal-100">Press Kit</p>
              </div>
            </div>

            {/* Support Column */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-200 mb-2 md:mb-4">
                Support
              </h4>
              <div className="space-y-1 sm:space-y-3">
                <p className="text-xs sm:text-sm text-teal-100">Account</p>
                <p className="text-xs sm:text-sm text-teal-100">Help</p>
                <p className="text-xs sm:text-sm text-teal-100">Contact Us</p>
                <p className="text-xs sm:text-sm text-teal-100">Customer Support</p>
              </div>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-200 mb-2 md:mb-4">
                Legal
              </h4>
              <div className="space-y-1 sm:space-y-3">
                <p className="text-xs sm:text-sm text-teal-100">Terms &amp; Conditions</p>
                <p className="text-xs sm:text-sm text-teal-100">Privacy Policy</p>
                <p className="text-xs sm:text-sm text-teal-100">Licensing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-4 sm:mt-8 pt-4 sm:pt-8 border-t border-teal-600 flex flex-wrap justify-center space-x-4">
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs sm:text-sm text-teal-100 hover:text-white transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs sm:text-sm text-teal-100 hover:text-white transition-colors duration-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer