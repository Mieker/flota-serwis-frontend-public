const useMalfunctionValidator = () => {
  const validateValue = (valueToValidate) => {
    const key = Object.keys(valueToValidate)[0];
    const value = Object.values(valueToValidate)[0];
    let isValid = true;

    if (key === "title") {
      if (value.length < 3 || value.length > 25) {
        isValid = false;
      }
    }
    if (key === "description") {
      if (value.length < 3 || value.length > 250) {
        isValid = false;
      }
    }
    if (key === "dateOfFailure") {
      if (new Date(value) > new Date()) {
        isValid = false;
      }
    }
    if (key === "actionTaken") {
      if (value.length < 3 || value.length > 250) {
        isValid = false;
      }
    }
    if (key === "placeOfRepair") {
      if (value.length < 3 || value.length > 250) {
        isValid = false;
      }
    }
    if (key === "expectedDateOfCompletion") {
      if (new Date(value) < new Date().setHours(0, 0, 0, 0)) {
        isValid = false;
      }
    }

    return isValid;
  };

  return { validateValue };
};

export default useMalfunctionValidator;
