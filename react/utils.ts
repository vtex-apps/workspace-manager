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
