import { paintCallback } from "../interfaces";

/**
 * Decorator para chamar o callback de pintura após a execução do método ou atualização de propriedade original.
 *
 * O decorator garante que o callback `paintCallback` seja chamado após a execução do método original
 * ou após a atribuição de um novo valor para uma propriedade, caso o elemento esteja conectado ao DOM.
 * É útil para garantir que ações de pintura sejam feitas no momento certo do ciclo de vida do componente.
 *
 * @param {Object} _target - O alvo do decorator (classe ou protótipo).
 * @param {string} _propertyKey - O nome da propriedade/método decorado.
 * @param {Object} descriptor - O descritor de propriedade/método.
 * @returns {void}
 *
 * @description
 * O decorator `repaint` é utilizado para assegurar que, após a execução de um método decorado
 * ou a atualização de uma propriedade decorada, o callback `paintCallback` seja chamado se o
 * elemento estiver conectado ao DOM. Isso permite que a lógica de pintura do componente seja invocada
 * de forma automática e no momento certo, garantindo a consistência visual e comportamental do Custom Element.
 *
 * Esse decorator é especialmente útil em cenários onde o componente precisa atualizar sua interface
 * visual ou realizar outras ações relacionadas à pintura, sempre que um método específico ou propriedade
 * for atualizado.
 *
 * @example
 * class MyComponent extends HTMLElement {
 *   paintCallback() {
 *     console.log('Callback de pintura chamado');
 *   }
 *
 *   // Usando em um método
 *   @repaint
 *   handlePaint() {
 *     console.log('Método original executado');
 *   }
 *
 *   // Usando em uma propriedade
 *   #color;
 *
 *   @repaint
 *   set color(value) {
 *     this.#color = value;
 *   }
 *
 *   get color() {
 *     return this.#color;
 *   }
 * }
 */
const repaint = (_target, _propertyKey, descriptor) => {
  if (descriptor.value) {
    // Caso seja um método
    const originalMethod = descriptor.value;

    Object.assign(descriptor, {
      async value(...args) {
        // Executa o método original
        await Reflect.apply(originalMethod, this, args);

        // Se o elemento estiver conectado, chama o callback de pintura
        if (this.isPainted) {
          await this[paintCallback]?.();
        }

        // Retorna a instância do componente
        return this;
      },
    });
  }

  if (descriptor.set) {
    // Caso seja um setter
    const originalSetter = descriptor.set;

    Object.assign(descriptor, {
      async set(value) {
        // Chama o setter original
        await Reflect.apply(originalSetter, this, [value]);

        // Se o elemento estiver conectado, chama o callback de pintura
        if (this.isPainted) {
          await this[paintCallback]?.();
        }
      },
    });
  }
};

export default repaint;
