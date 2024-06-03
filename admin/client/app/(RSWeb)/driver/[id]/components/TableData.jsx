import Image from "next/image";
import React from "react";

const TableData = () => {
  return (
    <div class="w-full overflow-x-auto mt-8">
      <table class="w-full border-collapse ">
        <thead class="items-start justify-start">
          <tr>
            <th class="border-b border-r border-gray-100 py-2">Name</th>
            <th class="border-b border-r border-gray-100 py-2">From</th>
            <th class="border-b border-r border-gray-100 py-2">To</th>
            <th class="border-b  border-gray-100 py-2">Price</th>
          </tr>
        </thead>
        <tbody className="">
          <tr className="">
            <td class=" py-2 px-4 flex items-center ">
              <Image
                src="/webAssets/images/placeholder/avatar.png"
                alt=""
                srcset=""
                width={25}
                height={25}
                class="mr-2"
              />
              <span className="text-xs">Jerry John</span>
            </td>
            <td class="py-2 px-4">
              <span className="text-xs">7958 Swift village Street</span>
            </td>
            <td class="py-2 px-4">
              <span className="text-xs">105 villa ,St.Chicago,Street</span>
            </td>
            <td class="py-2 px-4">$10.00</td>
          </tr>
          <tr className="my-3">
            <td class=" py-2 px-4 flex items-center">
              <Image
                src="/webAssets/images/placeholder/avatar.png"
                alt=""
                srcset=""
                width={25}
                height={25}
                class="mr-2"
              />
              <span className="text-xs">Jerry John</span>
            </td>
            <td class=" py-2 px-4">
              <span className="text-xs">7958 Swift village Street</span>
            </td>
            <td class=" py-2 px-4">
              <span className="text-xs">105 villa ,St.Chicago,Street</span>
            </td>
            <td class=" py-2 px-4">$15.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
