import { useFormContext } from "react-hook-form";

const FormInputField = ({
  name,
  type,
  placeholder,
  className,

  label,
  required = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  //check if input has value

  return (
    <div className='relative mt-2'>
      <input
        type={type}
        name={name}
        placeholder='' // Keep placeholder to enable peer behavior
        className='w-full border border-red-200 rounded-lg p-2 peer focus:outline-none focus:border-red-500'
        {...register(name, { required: required && `${label} is required` })}
      />
      {label && (
        <label
          htmlFor={name}
          className='absolute left-2 top-2 text-gray-500 bg-white px-1 transition-all duration-200 ease-in-out
               peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-500
               peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-sm'
        >
          {label}
        </label>
      )}
      {errors[name] && (
        <p className='mt-1 text-sm text-red-500'>{errors[name].message}</p>
      )}
    </div>
  );
};

export default FormInputField;
