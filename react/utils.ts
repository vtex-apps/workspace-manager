export const makeid = (length: Number) => {
  let result = ''
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

// new RegExp("[A-Z]")

export const checkWorkspaceName = (name: string) => {
  const noSpecialChars = new RegExp(
    '^.*[-!$%^&*()_+|~=`{}[\\]:";\'<>?,./]+.*$'
  );
  const noMayusc = new RegExp('[A-Z]');
  if (!noSpecialChars.test(name) && !noMayusc.test(name)) {
    return true;
  } else {
    return false;
  }
};
