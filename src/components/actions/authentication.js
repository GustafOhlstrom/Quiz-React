export const SignIn = cred => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(cred.email, cred.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(errMsg => {
        dispatch({ type: "There was and error login in, err", errMsg });
      });
  };
};
