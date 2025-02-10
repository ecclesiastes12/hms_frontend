import { FiFilePlus } from "react-icons/fi";
import { useState } from "react";
import CreatePatient from "./CreatePatient";

const ViewPatient = () => {
  // Sample data
  const data = [
    {
      id: 1,
      firstName: "John ",
      lastName: "Doe",
      maidenName: "Sampa",
      email: "example@same.com",
      address: "Blue Navy Street 234",
      phoneNumber: "035564433",
    },
    {
      id: 2,
      firstName: "John ",
      lastName: "Doe",
      maidenName: "Sampa",
      email: "example@same.com",
      address: "Blue Navy Street 234",
      phoneNumber: "035564433",
    },
    {
      id: 3,
      firstName: "John ",
      lastName: "Doe",
      maidenName: "Sampa",
      email: "example@same.com",
      address: "Blue Navy Street 234",
      phoneNumber: "035564433",
    },
    {
      id: 4,
      firstName: "John ",
      lastName: "Doe",
      maidenName: "Sampa",
      email: "example@same.com",
      address: "Blue Navy Street 234",
      phoneNumber: "035564433",
    },
    {
      id: 5,
      firstName: "John ",
      lastName: "Doe",
      maidenName: "Sampa",
      email: "example@same.com",
      address: "Blue Navy Street 234",
      phoneNumber: "035564433",
    },
  ];

  const [open, setOpen] = useState(false);

  const handleCreatePatientDialog = () => {
    setOpen(true);
  };

  return (
    <div className='min-h-[cal(100vh -20px)]  flex justify-center items-center'>
      <div className='w-4/5  rounded-lg border border-red-300 flex flex-col items-center justify-center '>
        <h3 className='font-semibold text-3xl'>Patients List</h3>
        <div className='flex justify-between w-[90%] mb-2 '>
          <button
            onClick={handleCreatePatientDialog}
            className='flex items-center space-x-1 bg-amber-300 p-2 rounded-lg cursor-pointer'
          >
            <FiFilePlus /> <span>Create New Patient</span>
          </button>

          <input
            type='text'
            className='border rounded-lg p-2 border-red-300'
            placeholder='search'
          />
        </div>
        <div className='flex items-center justify-center rounded-lg'>
          <table className='min-w-full leading-normal  mb-4 '>
            <thead>
              <tr>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  ID
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  First Name
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Last Name
                </th>

                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Maiden Name
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Email
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Address
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                  Phone Number
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {item.id}
                    </p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {item.firstName}
                    </p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {item.lastName}
                    </p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {item.maidenName}
                    </p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {item.email}
                    </p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {item.address}
                    </p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>
                      {item.phoneNumber}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pass open and setOpen to the dialog */}
      <CreatePatient open={open} setOpen={setOpen} />
    </div>
  );
};

export default ViewPatient;
