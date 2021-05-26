import React, {useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Button,
} from 'react-native';
import {MTextInput as MyTextInput} from './MyInput';
import {
  useField,
  useTrimMask,
  validateEmail,
  validateRequired,
  validateSameValue,
  useForm,
} from 'rtform';

export const ExampleScreen = () => {
  const nameField = useField('');
  const lastNameField = useField('');
  const emailField = useTrimMask(useField(''));
  const passField = useField('');
  const passField2 = useField('');

  // This is the way validation is executed
  const form = useForm(
    useCallback(() => {
      // Error messages provided by you, In this way if needed they can be translated.
      const reqText = 'Required.';
      const formatText = 'Invalid format.';

      let isFormValid = [
        validateRequired(nameField, reqText),
        validateRequired(lastNameField, reqText),
        // Dependent validation: we have to check if email is provided than check if it has valid format.
        validateRequired(emailField, reqText) &&
          validateEmail(emailField, formatText),
        // Dependent validation: we have to check if both passwords are provided than check if they are the same.
        [
          validateRequired(passField, reqText),
          validateRequired(passField2, reqText),
        ].every((x) => x) &&
          validateSameValue([passField, passField2], 'Passwords do not match.'),
      ].every((x) => x);

      // Return value is promise in case of any async validation logic.
      return Promise.resolve(isFormValid);
    }, [
      nameField.value,
      lastNameField.value,
      emailField.value,
      passField.value,
      passField2.value,
    ]),
  );

  const onSubmitBtnClick = async () => {
    if (await form.validate()) {
      try {
        Alert.alert(
          'Your form is invalid, please review and correct values before submittig again',
        );
      } catch (err) {
        Alert.alert(`Error happened ${err?.message}`);
      }
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <MyTextInput
            error={nameField.hasError}
            helperText={nameField.errorText}
            value={nameField.value}
            onChangeText={nameField.setValue}
            label="Name"
            placeholder="Your name"
          />
          <MyTextInput
            error={lastNameField.hasError}
            helperText={lastNameField.errorText}
            value={lastNameField.value}
            onChangeText={lastNameField.setValue}
            label="Surname"
            placeholder="Your surname"
          />
          <MyTextInput
            error={emailField.hasError}
            helperText={emailField.errorText}
            value={emailField.value}
            onChangeText={emailField.setValue}
            label="Email"
            placeholder="Your email address"
          />
          <MyTextInput
            error={passField.hasError}
            helperText={passField.errorText}
            value={passField.value}
            onChangeText={passField.setValue}
            label="Password"
            placeholder="Write your password"
            secureTextEntry={true}
          />
          <MyTextInput
            error={passField2.hasError}
            helperText={passField2.errorText}
            value={passField2.value}
            onChangeText={passField2.setValue}
            label="Repeat password"
            placeholder="Write same password again"
            secureTextEntry={true}
          />
        </ScrollView>

        <Button title="Submit form" onPress={onSubmitBtnClick} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
});

export default ExampleScreen;
