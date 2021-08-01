import React from 'react';
import {emailReg, onlyLettersReg} from '../../utils';

export const checkErrors = (
  setErrors: React.Dispatch<
    React.SetStateAction<Record<string, string | null>>
  >,
  password: string,
  repeatedPassword: string,
  email: string,
  firstName: string,
  lastName: string,
): boolean => {
  let errorOccured;
  if (password.length < 6) {
    setErrors(prev => ({...prev, password: 'Password too short'}));
    errorOccured = true;
  } else if (password !== repeatedPassword) {
    const errorMsg = 'Passwords not matched';
    setErrors(prev => ({
      ...prev,
      password: errorMsg,
      repeatedPassword: errorMsg,
    }));
    errorOccured = true;
  } else {
    setErrors(prev => ({...prev, password: null, repeatedPassword: null}));
  }
  if (email.length < 5 || !emailReg.test(email)) {
    setErrors(prev => ({
      ...prev,
      email: 'Email not valid',
    }));
    errorOccured = true;
  } else {
    setErrors(prev => ({
      ...prev,
      email: null,
    }));
  }
  if (firstName.length < 2 || !onlyLettersReg.test(firstName)) {
    setErrors(prev => ({
      ...prev,
      firstName: 'First name not valid',
    }));
    errorOccured = true;
  } else {
    setErrors(prev => ({
      ...prev,
      firstName: null,
    }));
  }
  if (lastName.length < 2 || !onlyLettersReg.test(lastName)) {
    setErrors(prev => ({
      ...prev,
      lastName: 'First name not valid',
    }));
    errorOccured = true;
  } else {
    setErrors(prev => ({
      ...prev,
      lastName: null,
    }));
  }

  return errorOccured;
};
