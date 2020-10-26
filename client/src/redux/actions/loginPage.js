const resetLogin = () => ({
   type: 'RESET-LOGIN',
});

const startLogin = () => ({
   type: 'START-LOGIN',
});

const loginFailed = (errors) => ({
   type: 'LOGIN-FAILED',
   payload: errors,
});

export { resetLogin, startLogin, loginFailed };
