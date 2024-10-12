import React, { forwardRef } from 'react';

interface InputFieldProps {
  label: string;
  type: 'email' | 'password';
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, type }, ref) => {
    return (
      <div className="flex flex-col mb-3">
        <label className="mb-1 text-center text-neutral-950 dark:text-neutral-300">{label}</label>
        <input 
          type={type} 
          required 
          ref={ref}
          className="p-2 border rounded text-center text-neutral-950 dark:text-neutral-300"
        />
      </div>
    );
  }
);

InputField.displayName = 'InputField';
export default InputField;
