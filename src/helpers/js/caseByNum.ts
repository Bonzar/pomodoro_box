export const caseByNum =
  (textForms: [string, string, string]) => (n: number) => {
    const tens = Math.abs(n) % 100;
    const units = tens % 10;

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
