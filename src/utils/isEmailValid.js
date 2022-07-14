export default function isEmailValid(email) {
  const regex = /\S+@\S+com/;
  return regex.test(email);
}
