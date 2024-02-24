import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --text: #1f1f1f;
    --background: #fafdfb;
    --primary: #54bf7b;
    --secondary: #9daada;
    --accent: #7f6bc7;

    --text-50: #f2f2f2;
    --text-100: #e6e6e6;
    --text-200: #cccccc;
    --text-300: #b3b3b3;
    --text-400: #999999;
    --text-500: #808080;
    --text-600: #666666;
    --text-700: #4d4d4d;
    --text-800: #333333;
    --text-900: #1a1a1a;
    --text-950: #0d0d0d;

    --background-50: #edf8f0;
    --background-100: #dbf0e2;
    --background-200: #b6e2c5;
    --background-300: #92d3a8;
    --background-400: #6dc58a;
    --background-500: #49b66d;
    --background-600: #3a9257;
    --background-700: #2c6d42;
    --background-800: #1d492c;
    --background-900: #0f2416;
    --background-950: #07120b;

    --primary-50: #ecf8f1;
    --primary-100: #daf1e2;
    --primary-200: #b5e3c6;
    --primary-300: #8fd6a9;
    --primary-400: #6ac88c;
    --primary-500: #45ba70;
    --primary-600: #379559;
    --primary-700: #297043;
    --primary-800: #1c4a2d;
    --primary-900: #0e2516;
    --primary-950: #07130b;

    --secondary-50: #edeff8;
    --secondary-100: #dadff1;
    --secondary-200: #b5bfe3;
    --secondary-300: #909fd5;
    --secondary-400: #6b7fc7;
    --secondary-500: #465fb9;
    --secondary-600: #384c94;
    --secondary-700: #2a396f;
    --secondary-800: #1c264a;
    --secondary-900: #0e1325;
    --secondary-950: #070912;

    --accent-50: #efedf8;
    --accent-100: #dfdaf1;
    --accent-200: #bfb5e3;
    --accent-300: #9f90d5;
    --accent-400: #7f6bc7;
    --accent-500: #5f46b9;
    --accent-600: #4c3894;
    --accent-700: #392a6f;
    --accent-800: #261c4a;
    --accent-900: #130e25;
    --accent-950: #090712;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    background-color: var(--background);
    color: var(--text);
    font-family: system-ui, sans-serif;
  }

  button, input {
    font-family: inherit;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;
