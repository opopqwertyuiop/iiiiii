const resetRegister = () => ({
   type: 'RESET-REGISTER',
});

const startRegister = () => ({
   type: 'START-REGISTER',
});

const registerSuccess = () => ({
   type: 'REGISTER-SUCCESS',
});

const registerFailed = (errors) => ({
   type: 'REGISTER-FAILED',
   payload: errors,
});

export { resetRegister, startRegister, registerFailed, registerSuccess };
