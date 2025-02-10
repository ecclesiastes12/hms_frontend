import { Link } from "react-router-dom";
import { MenuItem } from "@headlessui/react";

const DropdownItems = ({ itemName, to = null, onClick = null }) => {
  return (
    <MenuItem>
      {to ? (
        <Link
          to={to}
          className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden'
        >
          {itemName}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        >
          {itemName}
        </button>
      )}
    </MenuItem>
  );
};

export default DropdownItems;
