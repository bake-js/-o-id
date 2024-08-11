import intercept from "./intercept";
import {
  abortController,
  connectedCallback,
  disconnectedCallback,
} from "./interfaces";

const event = new Proxy(
  {},
  {
    get: (_, type) => (query) => (target, propertyKey) => {
      intercept(connectedCallback)
        .in(target)
        .then(function () {
          const controller = (this[abortController] ??= new AbortController());
          const options = { signal: controller.signal };
          const listener = (event) =>
            event.target.matches(query) && this[propertyKey](event);

          this.addEventListener(type, listener, options);
          this.shadowRoot?.addEventListener(type, listener, options);
        });

      intercept(disconnectedCallback)
        .in(target)
        .then(function () {
          this[abortController].abort();
        });
    },
  },
);

export default event;
