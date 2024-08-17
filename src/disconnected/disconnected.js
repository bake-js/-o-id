import intercept, { exec } from "../intercept";
import { disconnectedCallback } from "../interfaces";

/**
 * Decorator que adiciona lógica ao método `disconnectedCallback` de um Custom Element.
 *
 * @param target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param propertyKey - O nome do método decorado.
 * @returns Um decorator que intercepta a chamada do `disconnectedCallback`.
 */
const disconnected = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `disconnectedCallback`.
  const interceptor = intercept(disconnectedCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default disconnected;
