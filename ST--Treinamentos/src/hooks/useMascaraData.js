/**
 * Aplica a máscara DD/MM/AAAA a um valor de input de texto.
 * Extraído para evitar duplicação entre ContatoInstrutor.jsx e SuporteSistema.jsx.
 */
export function mascararData(valorBruto) {
  let value = valorBruto.replace(/\D/g, '');
  if (value.length > 8) value = value.slice(0, 8);

  if (value.length > 4) {
    value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
  } else if (value.length > 2) {
    value = `${value.slice(0, 2)}/${value.slice(2)}`;
  }

  return value;
}

/** Validação simples: exige o formato completo DD/MM/AAAA (10 caracteres). */
export function dataEhValida(data) {
  return typeof data === 'string' && data.length === 10;
}
