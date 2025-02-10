import { BsExclamationTriangle } from "react-icons/bs";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { FormProvider, useForm } from "react-hook-form";
import FormInputField from "../FormInputField";

const CreatePatient = ({ open, setOpen }) => {
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      maidenName: "",
      phoneNumber: "",
      email: "",
      gender: "",
    },
  });
  const selectedGender = methods.watch("gender");

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
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
                  <form className='grid grid-cols-2 gap-4 '>
                    {/* <div className='relative mt-2'>
                      <input
                        type='text'
                        id='firstName'
                        placeholder=' '
                        className='w-full border border-red-200 rounded-lg p-2 peer focus:outline-none focus:border-red-500'
                      />
                      <label
                        htmlFor='firstName'
                        className='absolute left-2 top-2 text-gray-500 bg-white px-1 transition-all duration-200 ease-in-out
               peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-500
               peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm'
                      >
                        First Name
                      </label>
                    </div>
                    <<div className='mt-2'>
                      <label htmlFor=''>Last Name</label>
                      <input
                        type='text'
                        className='w-full border rounded-lg p-2'
                      />
                    </div>>
                    <div className='mt-2'>
                      <label htmlFor=''>MaidenName</label>
                      <input
                        type='text'
                        className='w-full border rounded-lg p-2'
                      />
                    </div>
                    <div className='mt-2 flex flex-col justify-center  py-0'>
                      <label htmlFor=''>Gender</label>
                      <div className='flex gap-2'>
                        <input
                          type='radio'
                          value='Male'
                          {...register("gender", { required: true })}
                        />
                        <label htmlFor=''>Male</label>
                      </div>
                      <div className='flex gap-2'>
                        <input
                          type='radio'
                          value='Female'
                          {...register("gender", { required: true })}
                        />
                        <label htmlFor=''>Female</label>
                      </div>
                    </div>
                    <div className='mt-2'>
                      <label htmlFor=''>Email</label>
                      <input
                        type='text'
                        className='w-full border rounded-lg p-2'
                      />
                    </div>
                    <div className='mt-2'>
                      <label htmlFor=''>Marital Status</label>
                      <input
                        type='text'
                        className='w-full border rounded-lg p-2'
                      />
                    </div>
                    <div className='mt-2'>
                      <label htmlFor=''>Date of Birth</label>
                      <input
                        type='date'
                        className='w-full border rounded-lg p-2'
                      />
                    </div>
                    <div className='mt-2'>
                      <label htmlFor=''>Phone Number</label>
                      <input
                        type='text'
                        className='w-full border rounded-lg p-2'
                      />
                    </div> */}

                    <FormProvider {...methods}>
                      <FormInputField
                        id='firstName'
                        type='text'
                        required
                        label='First Name'
                      />
                      <FormInputField
                        id='lastName'
                        type='text'
                        required
                        label='Last Name'
                      />
                    </FormProvider>
                  </form>
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
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default CreatePatient;
