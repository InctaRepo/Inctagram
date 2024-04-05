import '@testing-library/jest-dom'
import 'cross-fetch/polyfill'

// global.matchMedia =
//   global.matchMedia ||
//   function (query) {
//     return {
//       matches: false,
//       media: query,
//       onchange: null,
//       addListener: () => {}, // deprecated
//       removeListener: () => {}, // deprecated
//       addEventListener: () => {},
//       removeEventListener: () => {},
//       dispatchEvent: () => {},
//     }
//   }
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
