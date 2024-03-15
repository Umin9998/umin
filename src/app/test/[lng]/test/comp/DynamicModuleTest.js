// DynamicModule.js
export const dynamicVar = 'I am a dynamically imported variable';

export function dynamicFunction() {
  return 'I am a dynamically imported function';
}

export class DynamicClass {
  static sayHello() {
    return 'Hello from a dynamically imported class';
  }
}
