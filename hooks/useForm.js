import { useEffect, useState } from 'react';

export default function useForm(initialState = {}) {
  //  create a state object for our inputs
  const [inputs, setInputs] = useState(initialState);

  const initialValues = Object.values(initialState).join('');

  useEffect(() => {
    // This function runs when things we are watching change
    setInputs(initialState);
  }, [initialValues]);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }

    setInputs((prevState) => ({
      // Copy the existing state
      ...prevState,
      // Override the current one dynamically
      [name]: value,
    }));
  }
  // Reset form
  function resetForm() {
    setInputs(initialState);
  }
  // Clear form
  function clearForm() {
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
