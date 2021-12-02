import { useState } from 'react';

export default function useForm(initialState = {}) {
  //  create a state object for our inputs
  const [inputs, setInputs] = useState(initialState);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }

    setInputs({
      // Copy the existing state
      ...inputs,
      // Override the current one dynamically
      [name]: value,
    });
  }
  // Reset form
  function resetForm(e) {
    e.preventDefault();
    setInputs(initialState);
  }
  // Clear form
  function clearForm(e) {
    e.preventDefault();
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }
  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
