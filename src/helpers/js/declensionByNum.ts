export const declensionByNum = (
  textForms: [string, string, string] | [string, string]
) => {
  const isUseThirdForm = textForms[2] !== undefined;

  return (n: number) => {
    const tens = Math.abs(n) % 100;
    const units = tens % 10;

    if (!isUseThirdForm) {
      if (units === 1) {
        return textForms[0];
      }

      return textForms[1];
    }

    if (tens > 10 && tens < 20) {
      return textForms[2];
    }

    if (units === 1) {
      return textForms[0];
    }

    if (units > 1 && units < 5) {
      return textForms[1];
    }

    return textForms[2];
  };
};
