import { Icon } from '@iconify/react';
import React, { useState } from 'react';

const BookingTable = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (id) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="p-2 border-b border-l border-gray">Booking Date</th>
          <th className="p-2 border-b border-l border-gray">Destination</th>
          <th className="p-2 border-b border-l border-gray">Total Distance</th>
          <th className="p-2 border-b border-l border-gray">Total Bill</th>
          <th className="p-2 border-b border-l border-gray">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <React.Fragment key={item.id}>
            <tr className="transition-all duration-300 ease-in-out hover:bg-gray-100 text-center">
              <td className="p-2 border-l border-gray">{new Date(item.bookingDate).toLocaleDateString()}</td>
              <td className="p-2 border-l border-gray">{item.destination}</td>
              <td className="p-2 border-l border-gray">{item.totalDistance}</td>
              <td className="p-2 border-l border-gray">{item.totalBill}</td>
              <td className="p-2 border-l border-gray">
                <button
                  onClick={() => toggleRow(item.id)}
                  className="text-blue-500 hover:underline focus:outline-none"
                >
                    <Icon icon="carbon:task-view" className='text-2xl' />
                  {/* {expandedRows[item.id] ? 'Collapse' : 'Expand'} */}
                </button>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default BookingTable;
