[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Usage Guide: `css` Function

The `css` function facilitates the creation of dynamic stylesheets within Web Components, using template literals. It allows for the interpolation of JavaScript variables directly into the CSS and is especially useful when used with the Shadow DOM and the `adoptedStyleSheets` API.

### When to Use

- **Reactive Styles**: Ideal for applying styles that depend on component variables or states.
- **Componentization with Shadow DOM**: The function generates stylesheets that are directly compatible with the Shadow DOM, providing style isolation.

### Structure

```javascript
/**
 * @param {TemplateStringsArray} strings - The literal parts of the template string.
 * @param {...any} values - The values interpolated into the template string.
 * @returns {CSSStyleSheet[]} An array containing the generated stylesheet.
 */
const css = (strings, ...values) => {
  const styleSheet = new CSSStyleSheet();
  const cssText = String.raw({ raw: strings }, ...values);
  styleSheet.replaceSync(cssText);
  return [styleSheet];
};
```

### Parameters

1. **strings**:
   - **Type:** `TemplateStringsArray`
   - **Description:** The literal parts of the CSS template string.

2. **values**:
   - **Type:** `any[]`
   - **Description:** The interpolated values in the string, which can be variables, expressions, or function results.

### Return

- **Type:** `CSSStyleSheet[]`
- **Description:** An array containing one or more stylesheets (`CSSStyleSheet`), which can be directly applied to the component with the Shadow DOM.

### Practical Example

**Example: Using `@paint` and `css` to Generate Dynamic Styles**

```javascript
import { define } from '@bake-js/-o-id';
import { css, html, paint } from '@bake-js/-o-id/dom';

// Function responsible for generating the component's HTML template
function component() {
  return html`
    <div>My Component</div>
  `;
}

// Function that returns the dynamic stylesheet with variable interpolation
function style() {
  return css`
    :host {
      display: block;
      background-color: ${this.backgroundColor};
      color: ${this.textColor};
    }
  `;
}

// Define the Web Component and associate the template and styles via @paint
@define('my-component')
@paint(component, style)
class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.backgroundColor = 'lightblue';
    this.textColor = 'black';
  }
}
```

### Explanation:

- **Function `component()`**: Defines the HTML content of the component, returning the template via `html`.
- **Function `style()`**: Returns the stylesheet generated by the `css` function. The `backgroundColor` and `textColor` variables are interpolated directly into the CSS, allowing styles to be dynamic and reactive.
- **Decorator `@paint`**: Applies the HTML and CSS to the component, automating the rendering and styling process.
- **Usage of `@define`**: Defines the native Web Component, connecting it to the DOM.

### Benefits

1. **Simplicity**: The use of template literals for CSS eliminates the need for direct string manipulation.
2. **Isolated Styles**: The `css` function returns stylesheets compatible with `adoptedStyleSheets`, making it easier to apply directly to the Shadow DOM and avoid global style conflicts.
3. **Variable Interpolation**: Allows for the insertion of variables and dynamic properties into the CSS, adapting to different component states.

### Final Considerations

- **Use in Web Components**: The function was designed to work well in environments that utilize Shadow DOM and `adoptedStyleSheets`.
- **Compatibility**: Make sure to check browser support for `CSSStyleSheet` and `adoptedStyleSheets`.
