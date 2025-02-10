import React from "react";
import DropdownItems from "./DropdownItems";
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";

const Dropdown = ({
  menuName,
  items = [],
  isFormDropdown = false,
  onSelect,
}) => {
  return (
    <Menu as='div' className='relative group'>
      <MenuButton className='flex group-hover:text-orange-500 hover:text-orange-500 cursor-pointer  '>
        {menuName}
        <BiChevronDown className='ml-2 h-5 w-0.5' />
      </MenuButton>
      <Transition
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <MenuItems className='absolute right-0 z-10 mt-2 w-30 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in t duration-300 '>
          {items.map((item, index) => (
            <DropdownItems
              key={index}
              itemName={item.name}
              to={!isFormDropdown ? item.to : null}
              onClick={isFormDropdown ? () => onSelect(item) : null}
            />
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
