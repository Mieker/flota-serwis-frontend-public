import useMalfunctionValidator from "../../hooks/useMalfunctionValidator";
import { useRef, useState, useEffect } from "react";

import Input from "../UI/Input";
import Button from "../UI/Button";

import classes from "./Form.module.css";

const MalfunctionForm = (props) => {
  const malfunctionValidator = useMalfunctionValidator();

  const [titleInputIsValid, setTitleInputIsValid] = useState(true);
  const [descriptionInputIsValid, setDescriptionInputIsValid] = useState(true);
  const [dateOfFailureInputIsValid, setDateOfFailureInputIsValid] =
    useState(true);
  const [actionTakenInputIsValid, setActionTakenInputIsValid] = useState(true);
  const [placeOfRepairInputIsValid, setPlaceOfRepairInputIsValid] =
    useState(true);
  const [
    expectedDateOfCompletionInputIsValid,
    setExpectedDateOfCompletionInputIsValid,
  ] = useState(true);
  const [isAllowedToSubmit, setIsAllowedToSubmit] = useState(true);
  const [formValuesObject, setFormValuesObject] = useState();

  const isAddingMalfunctionMode = props.actionName === "Dodaj" ? true : false;

  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const dateOfFailureInputRef = useRef();
  const actionTakenInputRef = useRef();
  const placeOfRepairInputRef = useRef();
  const expectedDateOfCompletionInputRef = useRef();

  const submitForm = (event) => {
    event.preventDefault();
    resetInputsValidation();
    prepareObjectToSend();
  };

  const resetInputsValidation = () => {
    setIsAllowedToSubmit(true);
    setTitleInputIsValid(true);
    setDescriptionInputIsValid(true);
    setDateOfFailureInputIsValid(true);
    setActionTakenInputIsValid(true);
    setPlaceOfRepairInputIsValid(true);
    setExpectedDateOfCompletionInputIsValid(true);
  };

  const prepareObjectToSend = () => {
    if (titleInputRef.current.value.length > 0) {
      let valueToCheck = titleInputRef.current.value.trim();
      if (
        !malfunctionValidator.validateValue({
          title: valueToCheck,
        })
      ) {
        setTitleInputIsValid(false);
      } else {
        setFormValuesObject((prevState) => ({
          ...prevState,
          title: valueToCheck,
        }));
      }
    } else if (isAddingMalfunctionMode) {
      setIsAllowedToSubmit(false);
    }
    if (descriptionInputRef.current.value.length > 0) {
      let valueToCheck = descriptionInputRef.current.value.trim();
      if (
        !malfunctionValidator.validateValue({
          description: valueToCheck,
        })
      ) {
        setDescriptionInputIsValid(false);
      } else {
        setFormValuesObject((prevState) => ({
          ...prevState,
          description: valueToCheck,
        }));
      }
    } else if (isAddingMalfunctionMode) {
      setIsAllowedToSubmit(false);
    }
    if (dateOfFailureInputRef.current.value.length > 0) {
      if (
        !malfunctionValidator.validateValue({
          dateOfFailure: dateOfFailureInputRef.current.value,
        })
      ) {
        setDateOfFailureInputIsValid(false);
      } else {
        setFormValuesObject((prevState) => ({
          ...prevState,
          dateOfFailure: dateOfFailureInputRef.current.value,
        }));
      }
    } else if (isAddingMalfunctionMode) {
      setIsAllowedToSubmit(false);
    }
    if (actionTakenInputRef.current.value.length > 0) {
      let valueToCheck = actionTakenInputRef.current.value.trim();
      if (
        !malfunctionValidator.validateValue({
          actionTaken: valueToCheck,
        })
      ) {
        setActionTakenInputIsValid(false);
      } else {
        setFormValuesObject((prevState) => ({
          ...prevState,
          actionTaken: valueToCheck,
        }));
      }
    } else if (isAddingMalfunctionMode) {
      setIsAllowedToSubmit(false);
    }
    if (placeOfRepairInputRef.current.value.length > 0) {
      let valueToCheck = placeOfRepairInputRef.current.value.trim();
      if (
        !malfunctionValidator.validateValue({
          placeOfRepair: valueToCheck,
        })
      ) {
        setPlaceOfRepairInputIsValid(false);
      } else {
        setFormValuesObject((prevState) => ({
          ...prevState,
          placeOfRepair: valueToCheck,
        }));
      }
    } else if (isAddingMalfunctionMode) {
      setIsAllowedToSubmit(false);
    }
    if (expectedDateOfCompletionInputRef.current.value.length > 0) {
      if (
        !malfunctionValidator.validateValue({
          expectedDateOfCompletion:
            expectedDateOfCompletionInputRef.current.value,
        })
      ) {
        setExpectedDateOfCompletionInputIsValid(false);
      } else {
        setFormValuesObject((prevState) => ({
          ...prevState,
          expectedDateOfCompletion:
            expectedDateOfCompletionInputRef.current.value,
        }));
      }
    } else if (isAddingMalfunctionMode) {
      setIsAllowedToSubmit(false);
    }
  };

  useEffect(() => {
    if (formValuesObject && isAllowedToSubmit) {
      if (
        titleInputIsValid &&
        descriptionInputIsValid &&
        dateOfFailureInputIsValid &&
        actionTakenInputIsValid &&
        placeOfRepairInputIsValid &&
        expectedDateOfCompletionInputIsValid
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
              <p>Wszystkie pola muszą zostać wypełnione.</p>
            </div>
          )}
          <Input
            label="Tytuł niesprawności:"
            ref={titleInputRef}
            isValid={titleInputIsValid}
            errorMessage="Tytuł niesprawności powinien zawierać od 3 do 25 znaków."
          />
          <Input
            label="Opis:"
            ref={descriptionInputRef}
            isValid={descriptionInputIsValid}
            errorMessage="Opis niesprawności powinien zawierać od 3 do 250 znaków."
          />
          <Input
            type="date"
            label="Data powstania:"
            ref={dateOfFailureInputRef}
            isValid={dateOfFailureInputIsValid}
            errorMessage="Data powstania niesprawności nie może być z przyszłości."
          />
          <Input
            label="Podjęte działania:"
            ref={actionTakenInputRef}
            isValid={actionTakenInputIsValid}
            errorMessage="Opis podjętych działań powinien zawierać od 3 do 250 znaków."
          />
          <Input
            label="Miejsce naprawy:"
            ref={placeOfRepairInputRef}
            isValid={placeOfRepairInputIsValid}
            errorMessage="Nazwa miejsca naprawy powinna zawierać od 3 do 250 znaków."
          />
          <Input
            type="date"
            label="Przewidywany czas zakończenia naprawy:"
            ref={expectedDateOfCompletionInputRef}
            isValid={expectedDateOfCompletionInputIsValid}
            errorMessage="Przewidywana data zakończenia naprawy nie może być z przeszłości."
          />
        </div>
        <div className={classes.form_actions}>
          <Button type="button" onClick={props.onCancel}>
            Anuluj
          </Button>
          <Button>{props.actionName}</Button>
        </div>
      </form>
    </div>
  );
};

export default MalfunctionForm;
