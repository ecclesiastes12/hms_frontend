import { useEffect, useState, useRef } from "react";
import { useFormContext } from "react-hook-form";

const SelectOption = ({ name, myText, required = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  //const [selectedOption, setSelectedOption] = useState("");
  const maritalStatus = ["Single", "Married", "Divorce", "Complicated"];
  const dropdownRef = useRef(null);
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedOption = watch(name, ""); // Watches for changes
  useEffect(() => {
    register(name, { required });

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [register, name, required]);

  //function that handles option select
  const handleSelect = (status) => {
    setValue(name, status, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    setIsDropdownOpen(false);
  };

  useEffect(() => {
    register(name, { required });
  }, [register, name, required]);

  return (
    <div className='border mt-2 rounded-lg border-red-200  '>
      <button
        type='button'
        onClick={(e) => {
          e.stopPropagation(); // Prevents click event from bubbling up
          setIsDropdownOpen((prev) => !prev);
        }}
        className='flex px-4 py-2 text-gray-500 rounded-lg focus:outline-none cursor-pointer w-full justify-between'
      >
        {selectedOption || myText}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m19.5 8.25-7.5 7.5-7.5-7.5'
          />
        </svg>
      </button>
      {isDropdownOpen && (
        <div
          className='absolute mt-2 w-48 bg-white border border-red-500 rounded-lg shadow-lg z-20'
          onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the dropdown
        >
          <ul className='py-2'>
            {maritalStatus.map((status, index) => (
              <li
                key={index}
                onClick={() => handleSelect(status)}
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
              >
                {status}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hidden input field for react-hook-form */}
      <input type='hidden' {...register(name)} value={selectedOption} />

      {/* Display validation error */}
      {errors[name] && (
        <p className='text-red-500 text-sm mt-1'>{errors[name].message}</p>
      )}
    </div>
  );
};

export default SelectOption;
