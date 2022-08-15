const useVehicleValidator = () => {
  const validateValue = (valueToValidate) => {
    const key = Object.keys(valueToValidate)[0];
    const value = Object.values(valueToValidate)[0];
    let isValid = true;

    if (key === "modelName") {
      if (value.length < 1 || value.length > 25) {
        isValid = false;
      }
    }
    if (key === "registrationNumber") {
      if (value.length < 5 || value.length > 9) {
        isValid = false;
      }
      if (!/^[A-Z0-9\u0020]+$/.test(value)) {
        isValid = false;
      }
      let i = 0;
      let numberOfWhitespaces = 0;
      value.split("").map((char) => {
        if (char === " ") {
          numberOfWhitespaces++;
        }
        if (char === " " && (i === 0 || i >= 4)) {
          isValid = false;
        }
        if (i === 0 && /^[0-9]/.test(char)) {
          isValid = false;
        }
        i++;
        return isValid;
      });
      if (numberOfWhitespaces > 1 || numberOfWhitespaces === 0) {
        isValid = false;
      }
      // check if whitespace is placed on 2,3,4th place; check if value contains only one space; check if first char is leter;
    }
    if (key === "vin") {
      if (value.length !== 17) {
        isValid = false;
      }
      if (!/^[A-Z0-9]+$/.test(value)) {
        isValid = false;
      }
    }
    if (key === "yearOfProduction") {
      if (+value < 1900 || +value > 2100 || !/^[0-9]+$/.test(value)) {
        isValid = false;
      }
    }
    if (key === "user") {
      if (value.length < 1 || value.length > 25) {
        isValid = false;
      }
    }
    if (key === "usersEmail") {
      const emailValidationRegex =
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailValidationRegex.test(value)) {
        isValid = false;
      }
    }

    return isValid;
  };

  return { validateValue };
};

export default useVehicleValidator;
