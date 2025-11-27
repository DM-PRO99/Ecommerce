import { Chainable } from "cypress";

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<any>;
    }
  }
}

export {};
