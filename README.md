# Element

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4dde8b4952684a35affc3a4116db149a)](https://app.codacy.com/gh/bake-js/element?utm_source=github.com&utm_medium=referral&utm_content=bake-js/element&utm_campaign=Badge_Grade)

Element é uma biblioteca leve e poderosa para criar Web Components personalizados com eficiência e simplicidade. Utilizando Vanilla JavaScript, o Element é otimizado para desempenho, garantindo que seus componentes sejam rápidos e leves. Com uma arquitetura intuitiva e o uso de decorators inovadores, como paint e repaint, o desenvolvimento de componentes reativos e modulares se torna simples e direto.

## Instalação

Instale o Element com npm:

```bash
npm install @bake-js/element
```

> **Nota:** Também funciona com `yarn` e `bun`.

## Exemplo de Uso

```javascript
import { define, html, on, paint, repaint } from '@bake-js/element';

function component(self) {
  return html`
    <button>Increment ${self.number}</button>
  `;
}

@define('element-counter')
@paint(component)
class Counter extends HTMLElement {
  #number;

  get number() {
    return (this.#number ??= 0);
  }

  set number(value) {
    this.#number = value;
  }

  @on.click('button')
  @repaint
  increment() {
    this.number += 1;
    return this;
  }
}
```

## Quick Start

Para começar um novo projeto com o Element, utilize o degit para clonar o template:

```bash
bunx degit bake-js/element-template my-project
cd my-project
bun install
bun dev
```

## Documentação

Explore a documentação detalhada de cada parte do projeto:

- [adopted](https://github.com/bake-js/element/blob/main/src/adopted/README.md)
- [attributeChanged](https://github.com/bake-js/element/blob/main/src/attributeChanged/README.md)
- [connected](https://github.com/bake-js/element/blob/main/src/connected/README.md)
- [define](https://github.com/bake-js/element/blob/main/src/define/README.md)
- [didPaint](https://github.com/bake-js/element/blob/main/src/didPaint/README.md)
- [disconnected](https://github.com/bake-js/element/blob/main/src/disconnected/README.md)
- [on](https://github.com/bake-js/element/blob/main/src/on/README.md)
- [paint](https://github.com/bake-js/element/blob/main/src/paint/README.md)
- [repaint](https://github.com/bake-js/element/blob/main/src/repaint/README.md)
- [trait](https://github.com/bake-js/element/blob/main/src/trait/README.md)
- [willPaint](https://github.com/bake-js/element/blob/main/src/willPaint/README.md)

## Contribua

Ajude a melhorar o Element reportando problemas, sugerindo funcionalidades ou enviando pull requests. Veja mais na [página de issues](https://github.com/bake-js/element/issues).

## Suporte

Entre em contato pelo e-mail cleber.demgoncalves@gmail.com ou junte-se ao nosso canal no Discord.

## Licença

Distribuído sob a licença [MIT](https://choosealicense.com/licenses/mit/).
