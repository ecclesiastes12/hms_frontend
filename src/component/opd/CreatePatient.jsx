import { BsExclamationTriangle } from "react-icons/bs";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { FormProvider, useForm } from "react-hook-form";
import FormInputField from "../FormInputField";
import Gender from "./Gender";
import Dropdown from "../Dropdown";
import { useEffect, useState } from "react";
import SelectOption from "../SelectOption";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";

const CreatePatient = ({ open, setOpen }) => {
  //const patientApi = createApiInstance("patient");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      maidenName: "",
      gender: "",
      email: "",
      maritalStatus: "",
      address: "",
      socialSecurityNumber: "",
      phoneNumber: "",
    },
  });

  const handlePatientSubmission = async (data) => {
    console.log("Sending data:", data);
    const {
      firstName,
      lastName,
      maidenName,
      email,
      gender,
      dateOfBirth,
      maritalStatus,
      address,
      socialSecurityNumber,
      phoneNumber,
    } = data;

    const sendData = {
      firstName,
      lastName,
      maidenName,
      email,
      gender,
      dateOfBirth,
      maritalStatus,
      address,
      socialSecurityNumber,
      phoneNumber,
    };

    try {
      setLoading(true);
      console.log("Sending request to API:", sendData);

      const response = await api.post("/api/v1/patients", sendData);
      toast.success("Patient Successfully created!");
      //resizeTo();
      if (response.data) {
        navigate("/view-users");
      }
    } catch (error) {
      console.error("Error creating patient:", error);
      toast.error("Failed to create patient");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    methods.watch((data, { name }) => {
      if (name === "maritalStatus") {
        setOpen(true); // Prevent modal from closing on selection change
      }
    });
  }, [methods, setOpen]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      // initialFocus={null} // Prevents focus trapping issues
      className='relative z-10'
    >
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in '
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto '>
        <div className='flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel
            transition
            className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 border border-red-300 '
          >
            <FormProvider {...methods}>
              <form>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    {/* <div className='mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10'>
                  <BsExclamationTriangle
                    aria-hidden='true'
                    className='size-6 text-red-600'
                  />
                </div> */}

                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                      <DialogTitle
                        as='h3'
                        className='text-3xl font-semibold text-gray-900 mb-3'
                      >
                        Patient Registration
                      </DialogTitle>
                      <h3 className='font-semibold'>Personal Information</h3>
                      <div
                        onSubmit={methods.handleSubmit(handlePatientSubmission)}
                        className='grid grid-cols-2 gap-4 '
                      >
                        <FormInputField
                          name='firstName'
                          type='text'
                          required
                          label='First Name'
                        />
                        <FormInputField
                          name='lastName'
                          type='text'
                          required
                          label='Last Name'
                        />
                        <FormInputField
                          name='maidenName'
                          type='text'
                          required
                          label='Maiden Name'
                        />
                        <Gender />
                        <FormInputField
                          name='dateOfBirth'
                          type='date'
                          required
                          label='Date of Birth'
                        />

                        <SelectOption
                          name='maritalStatus'
                          myText='Marital Status'
                          required
                        />
                        <FormInputField
                          name='email'
                          type='email'
                          required
                          label='Email'
                        />

                        <FormInputField
                          name='address'
                          type='text'
                          required
                          label='Address'
                        />
                        <FormInputField
                          name='socialSecurity'
                          type='text'
                          required
                          label='Social Security number'
                        />
                        <FormInputField
                          name='phoneNumber'
                          type='text'
                          required
                          label='Phone Number'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-red-200/30 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center'>
                  <button
                    type='button'
                    onClick={() => setOpen(false)}
                    className='inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto cursor-pointer'
                  >
                    Save
                  </button>
                  <button
                    type='button'
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-400 sm:mt-0 sm:w-auto cursor-pointer'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </FormProvider>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default CreatePatient;
