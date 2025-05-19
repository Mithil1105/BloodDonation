import { Link } from 'react-router-dom'

import React from 'react'

const AdminNavbar = () => {
  return (
    <div>
      <div className='max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 flex items-center justify-between h-12'>
      <div className="ml-10 flex items-baseline space-x-3">
                   <Link to="/admin/dash" className="bg-gray-300 px-3 py-2 rounded-md text-lg font-semibold">
                                            Dashboard
                    </Link>
                    <Link to="/admin/sendmsg" className="bg-gray-300 px-3 py-2 rounded-md text-lg font-semibold">
                                            CreateRequest
                    </Link>
                    <Link to="/admin/newdon" className="bg-gray-300 px-3 py-2 rounded-md text-lg font-semibold">
                                            AddDonation
                    </Link>
          </div>

      </div>
         
    </div>
  )
}

export default AdminNavbar