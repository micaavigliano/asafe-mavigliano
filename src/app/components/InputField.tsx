import React, { forwardRef } from 'react';

interface InputFieldProps {
  label: string;
  type: 'email' | 'password';
  id: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, type, id }, ref) => {
    return (
      <div className="flex flex-col mb-3">
        <label 
          className="mb-1 text-center text-neutral-950 dark:text-neutral-300"
          htmlFor={id}
        >
          {label}
        </label>
        <input 
          type={type} 
          required 
          ref={ref}
          id={id}
          className="p-2 border rounded text-center text-neutral-950 dark:text-neutral-300"
        />
      </div>
    );
  }
);

InputField.displayName = 'InputField';
export default InputField;