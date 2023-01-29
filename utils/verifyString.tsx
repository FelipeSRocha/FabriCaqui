export const isValidPassword = (password: string): boolean => {
    return password.length >= 8;
  }
export const isValidSpecialPassword = (password: string): boolean => {
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
return passwordRegex.test(password);
}
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }
export const isValidCEP = (cep: string): boolean => {
    const cepRegex = /^[0-9]{5}-[0-9]{3}$/;
    return cepRegex.test(cep);
}
