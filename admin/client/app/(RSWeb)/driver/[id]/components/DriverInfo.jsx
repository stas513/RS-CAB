import React from 'react'

const DriverInfo = ({ title, value }) => {
  return (
      <div className="w-full flex">
        <div className="w-1/2">
          <p className="font-poppins">{title}</p>
        </div>
        <div>
          <p className="font-poppins">{value}</p>
        </div>
      </div>
    
  )
}

export default DriverInfo
