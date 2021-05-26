import React, { useCallback } from 'react';
import { MTextInput as MyTextInput } from './MyInput';
import { useField, useTrimMask, validateEmail, validateRequired, validateSameValue, useForm } from 'rtform';

export const ExampleForm = () => {
  const nameField = useField('');
  const lastNameField = useField('');
  const emailField = useTrimMask(useField(''));
  const passField = useField('');
  const passField2 = useField('');

  const form = useForm(
    useCallback(() => {
      const reqText = 'Required.';
      const formatText = 'Invalid format.';

      let isFormValid = [
        validateRequired(nameField, reqText),
        validateRequired(lastNameField, reqText),
        validateRequired(emailField, reqText) && validateEmail(emailField, formatText),
        [validateRequired(passField, reqText), validateRequired(passField2, reqText)].every((x) => x) &&
          validateSameValue([passField, passField2], 'Passwords do not match.'),
      ].every((x) => x);

      return Promise.resolve(isFormValid);
    }, [nameField.value, lastNameField.value, emailField.value, passField.value, passField2.value]),
  );

  const onSubmitBtnClick = async () => {
    if (!(await form.validate())) {
      alert('Your form is invalid, please review and correct values before submittig again');
      return;
    }

    var formValues = {
      name: nameField.value,
      lastname: lastNameField.value,
      email: emailField.value,
      pass: passField.value,
      passRepeat: passField2.value,
    };
    alert(`Your form is valid ${JSON.stringify(formValues)}`);
  };

  return (
    <>
      <MyTextInput
        error={nameField.hasError}
        helperText={nameField.errorText}
        value={nameField.value}
        onChange={(e) => nameField.setValue(e.target.value)}
        label="Name"
        placeholder="Your name"
      />
      <MyTextInput
        error={lastNameField.hasError}
        helperText={lastNameField.errorText}
        value={lastNameField.value}
        onChange={(e) => lastNameField.setValue(e.target.value)}
        label="Surname"
        placeholder="Your surname"
      />
      <MyTextInput
        error={emailField.hasError}
        helperText={emailField.errorText}
        value={emailField.value}
        onChange={(e) => emailField.setValue(e.target.value)}
        label="Email"
        placeholder="Your email address"
      />
      <MyTextInput
        error={passField.hasError}
        helperText={passField.errorText}
        value={passField.value}
        onChange={(e) => passField.setValue(e.target.value)}
        label="Password"
        placeholder="Write your password"
        type="password"
      />
      <MyTextInput
        error={passField2.hasError}
        helperText={passField2.errorText}
        value={passField2.value}
        onChange={(e) => passField2.setValue(e.target.value)}
        label="Repeat password"
        placeholder="Write same password again"
        type="password"
      />
      <input type="button" value="Submit form" onClick={onSubmitBtnClick} />
    </>
  );
};
