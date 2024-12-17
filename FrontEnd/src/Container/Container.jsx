import React from 'react'

function Container({children}) {
  return <div className=' flex flex-col max-w-7xl mx-auto px-4'>{children}</div>;
  
}

export default Container