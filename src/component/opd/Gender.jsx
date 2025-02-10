import { useFormContext } from "react-hook-form";

const Gender = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor=''>Gender</label>
      <div className='mt-1 flex  py-0 gap-2'>
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
    </div>
  );
};

export default Gender;
