import { useContext, useEffect, useRef, useState } from "react";
import useVehicleValidator from "../../hooks/useVehicleValidator";

import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import Input from "../UI/Input";
import Button from "../UI/Button";
import VehiclesContext from "../../store/vehicles-context";

import classes from "./Form.module.css";

const VehicleForm = (props) => {
  const vehicleValidator = useVehicleValidator();
  const { vehicleCategories } = useContext(VehiclesContext);

  const [modelNameInputIsValid, setModelNameInputIsValid] = useState(true);
  const [registrationNumberInputIsValid, setRegistrationNumberInputIsValid] =
    useState(true);
  const [vinInputIsValid, setVinInputIsValid] = useState(true);
  const [yearOfProductionInputIsValid, setYearOfProductionInputIsValid] =
    useState(true);
  const [userInputIsValid, setUserInputIsValid] = useState(true);
  const [usersEmailInputIsValid, setUsersEmailInputIsValid] = useState(true);

  const [isPhotoUploadFinished, setIsPhotoUploadFinished] = useState(false);
  const [isCategoryInputFocused, setIsCategoryInputFocused] = useState(false);
  const [
    isTechnicallyEfficientInputFocused,
    setIsTechnicallyEfficientInputFocused,
  ] = useState(false);
  const [isAllowedToSubmit, setIsAllowedToSubmit] = useState(true);
  const [formValuesObject, setFormValuesObject] = useState();

  const isAddingVehicleMode = props.actionName === "Dodaj" ? true : false;

  const categoryInputRef = useRef();
  const modelNameInputRef = useRef();
  const registrationNumberInputRef = useRef();
  const vinInputRef = useRef();
  const yearOfProductionInputRef = useRef();
  const userInputRef = useRef();
  const usersEmailInputRef = useRef();
  const isTechnicallyEfficientInputRef = useRef();
  const photoUrlInputRef = useRef();

  const submitForm = (event) => {
    event.preventDefault();
    resetInputsValidation();
    prepareObjectToSend();
    const file = event.target.photoUrlInput.files[0];
    uploadFiles(file);
  };

  const resetInputsValidation = () => {
    setIsAllowedToSubmit(true);
    setModelNameInputIsValid(true);
    setRegistrationNumberInputIsValid(true);
    setVinInputIsValid(true);
    setYearOfProductionInputIsValid(true);
    setUserInputIsValid(true);
    setUsersEmailInputIsValid(true);
  };

  const onFocusCategoryInputHandler = () => {
    setIsCategoryInputFocused(true);
  };

  const onFocusTechnicallyEfficientInputHandler = () => {
    setIsTechnicallyEfficientInputFocused(true);
  };

  const prepareObjectToSend = () => {
    if (isCategoryInputFocused || isAddingVehicleMode) {
      setFormValuesObject((prevState) => ({
        ...prevState,
        category: categoryInputRef.current.value,
      }));
    }
    if (modelNameInputRef.current.value.length > 0) {
      let valueToCheck = modelNameInputRef.current.value.trim();
      if (
        !vehicleValidator.validateValue({
          modelName: valueToCheck,
        })
      ) {
        setModelNameInputIsValid(false);
      } else {
        setFormValuesObject((prevState) => ({
          ...prevState,
          modelName: valueToCheck,
        }));
      }
    } else if (isAddingVehicleMode) {
      setIsAllowedToSubmit(false);
    }
    if (registrationNumberInputRef.current.value.length > 0) {
      if (
        !vehicleValidator.validateValue({
          registrationNumber: registrationNumberInputRef.current.value,
        })
      ) {
        setRegistrationNumberInputIsValid(false);
      } else {
        setFormValuesObject((prevState) => ({
          ...prevState,
          registrationNumber: registrationNumberInputRef.current.value,
        }));
      }
    } else if (isAddingVehicleMode) {
      setIsAllowedToSubmit(false);
    }
    if (vinInputRef.current.value.length > 0) {
      if (!vehicleValidator.validateValue({ vin: vinInputRef.current.value })) {
        setVinInputIsValid(false);
      } else {
        setFormValuesObject((prevState) => ({
          ...prevState,
          vin: vinInputRef.current.value,
        }));
      }
    } else if (isAddingVehicleMode) {
      setIsAllowedToSubmit(false);
    }
    if (yearOfProductionInputRef.current.value.length > 0) {
      if (
        !vehicleValidator.validateValue({
          yearOfProduction: yearOfProductionInputRef.current.value,
        })
      ) {
        setYearOfProductionInputIsValid(false);
      } else {
        setFormValuesObject((prevState) => ({
          ...prevState,
          yearOfProduction: yearOfProductionInputRef.current.value,
        }));
      }
    } else if (isAddingVehicleMode) {
      setIsAllowedToSubmit(false);
    }
    if (userInputRef.current.value.length > 0) {
      let valueToCheck = userInputRef.current.value.trim();
      if (!vehicleValidator.validateValue({ user: valueToCheck })) {
        setUserInputIsValid(false);
      } else {
        setFormValuesObject((prevState) => ({
          ...prevState,
          user: valueToCheck,
        }));
      }
    } else if (isAddingVehicleMode) {
      setIsAllowedToSubmit(false);
    }
    if (usersEmailInputRef.current.value.length > 0) {
      if (
        !vehicleValidator.validateValue({
          usersEmail: usersEmailInputRef.current.value,
        })
      ) {
        setUsersEmailInputIsValid(false);
      } else {
        setFormValuesObject((prevState) => ({
          ...prevState,
          usersEmail: usersEmailInputRef.current.value,
        }));
      }
    } else if (isAddingVehicleMode) {
      setIsAllowedToSubmit(false);
    }
    if (isTechnicallyEfficientInputFocused || isAddingVehicleMode) {
      let technicalEfficiencyValue =
        isTechnicallyEfficientInputRef.current.value === "SPRAWNY"
          ? true
          : false;
      setFormValuesObject((prevState) => ({
        ...prevState,
        isTechnicallyEfficient: technicalEfficiencyValue,
      }));
    }
  };

  const uploadFiles = (file) => {
    if (!file || file["type"].split("/")[0] !== "image") {
      setIsPhotoUploadFinished(true);
      return;
    }
    props.onPictureUploading();
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFormValuesObject((prevState) => ({
            ...prevState,
            photoUrl: url,
          }));
          setIsPhotoUploadFinished(true);
        });
      }
    );
  };

  useEffect(() => {
    if (formValuesObject && isAllowedToSubmit && isPhotoUploadFinished) {
      if (
        modelNameInputIsValid &&
        registrationNumberInputIsValid &&
        vinInputIsValid &&
        yearOfProductionInputIsValid &&
        userInputIsValid &&
        usersEmailInputIsValid
      ) {
        props.onSubmitForm(formValuesObject);
      }
    }
  }, [formValuesObject]);

  return (
    <div className={classes.form}>
      <h1>{props.headName}</h1>
      <form onSubmit={submitForm}>
        <div className={classes.form_inputs_group}>
          {!isAllowedToSubmit && (
            <div className={classes.invalid_input}>
              <p>
                Wszystkie pola (za wyjątkiem zdjęcia) muszą zostać wypełnione.
              </p>
            </div>
          )}
          <Input
            label="Rodzaj:"
            ref={categoryInputRef}
            type="select"
            selectItems={vehicleCategories}
            onFocus={onFocusCategoryInputHandler}
          />
          <Input
            label="Model:"
            ref={modelNameInputRef}
            isValid={modelNameInputIsValid}
            errorMessage="Nazwa modelu powinna zawierać od 1 do 25 znaków."
          />
          <Input
            label="Numer rejestracyjny:"
            ref={registrationNumberInputRef}
            isValid={registrationNumberInputIsValid}
            errorMessage="Nieprawidłowy format numeru rejestracyjnego (Tylko duże litery,
              pamiętaj o spacji)."
          />
          <Input
            label="VIN:"
            ref={vinInputRef}
            isValid={vinInputIsValid}
            errorMessage="Nieprawidłowy format VIN (Tylko duże litery, dokładnie 17
                znaków, bez spacji oraz znaków specjalnych)."
          />
          <Input
            label="Rok produkcji:"
            ref={yearOfProductionInputRef}
            isValid={yearOfProductionInputIsValid}
            errorMessage="Rok produkcji musi zawierać się pomiędzy latami 1900 - 2100."
          />
          <Input
            label="Użytkownik:"
            ref={userInputRef}
            isValid={userInputIsValid}
            errorMessage="Nazwa użytkownika musi zawierać od 1 do 25 znaków."
          />
          <Input
            label="E-mail:"
            ref={usersEmailInputRef}
            isValid={usersEmailInputIsValid}
            errorMessage="Nieprawidłowy format adresu e-mail."
          />
          <Input
            label="Sprawny technicznie:"
            ref={isTechnicallyEfficientInputRef}
            type="select"
            selectItems={["SPRAWNY", "NIESPRAWNY"]}
            onFocus={onFocusTechnicallyEfficientInputHandler}
          />
          <Input
            label="Zdjęcie pojazdu:"
            ref={photoUrlInputRef}
            type="file"
            isValid={true}
            id="photoUrlInput"
          />
        </div>
        <div className={classes.form_actions}>
          <Button type="button" onClick={props.onCancel}>
            Anuluj
          </Button>
          <Button type="submit">{props.actionName}</Button>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;
