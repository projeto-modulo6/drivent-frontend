export function formatCVC(value) {
  const clearValue = clearNumber(value);
  let maxLength = 3;

  return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
  let clearValue = clearNumber(value);

  if (clearValue.length >= 2) {
    let month = clearValue.slice(0, 2);

    if (month > 12) {
      clearValue = `12${clearValue.slice(2)}`;
    } else if (month == '00') {
      clearValue = `01${clearValue.slice(2)}`;
    }
  }

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}

export function clearNumber(value = '') {
  return value.replace(/\D+/g, '');
}

export function formatCreditCardNumber(value) {
  const clearValue = clearNumber(value);
  let nextValue;

  nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(
    12,
    19
  )}`;

  return nextValue.trim();
}

export function errors(objectError, card) {
  let errorBolean = false;
  let number = clearNumber(card.number);
  if (number.length === 0) {
    errorBolean = true;
    objectError.number = 'O campo está vazio.';
  } else if (number.length !== 16 && number.length !== 19) {
    errorBolean = true;
    objectError.number = 'O numero não existe.';
  }
  if (card.name.length === 0) {
    errorBolean = true;
    objectError.name = 'O campo está vazio.';
  }
  if (card.expiry.length === 0) {
    errorBolean = true;
    objectError.expiry = 'O campo está vazio.';
  } else if (clearNumber(card.expiry).length !== 4) {
    errorBolean = true;
    objectError.expiry = 'Data invalida.';
  }
  if (card.cvc.length === 0) {
    errorBolean = true;
    objectError.cvc = 'O campo está vazio.';
  } else if (card.cvc.length !== 3) {
    errorBolean = true;
    objectError.cvc = 'O cvc tem que ter 3 digitos.';
  }
  return errorBolean;
}
