import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --text: #081815;
    --background: #f9fdfc;
    --primary: #4bc1a8;
    --secondary: #96a2db;
    --accent: #8576d0;

    --text-50: #ecf9f6;
    --text-100: #d9f2ee;
    --text-200: #b3e6dc;
    --text-300: #8cd9cb;
    --text-400: #66ccb9;
    --text-500: #40bfa8;
    --text-600: #339986;
    --text-700: #267365;
    --text-800: #194d43;
    --text-900: #0d2622;
    --text-950: #061311;

    --background-50: #ecf9f5;
    --background-100: #d9f2ec;
    --background-200: #b3e6d9;
    --background-300: #8cd9c6;
    --background-400: #66ccb3;
    --background-500: #40bf9f;
    --background-600: #339980;
    --background-700: #267360;
    --background-800: #194d40;
    --background-900: #0d2620;
    --background-950: #061310;

    --primary-50: #ecf8f6;
    --primary-100: #d9f2ed;
    --primary-200: #b3e5da;
    --primary-300: #8dd8c8;
    --primary-400: #67cbb5;
    --primary-500: #41bea3;
    --primary-600: #349882;
    --primary-700: #277262;
    --primary-800: #1a4c41;
    --primary-900: #0d2621;
    --primary-950: #071310;

    --secondary-50: #eceef8;
    --secondary-100: #d9ddf2;
    --secondary-200: #b3bbe5;
    --secondary-300: #8d9ad8;
    --secondary-400: #6778cb;
    --secondary-500: #4156be;
    --secondary-600: #344598;
    --secondary-700: #273472;
    --secondary-800: #1a224c;
    --secondary-900: #0d1126;
    --secondary-950: #070913;

    --accent-50: #eeecf8;
    --accent-100: #ddd9f2;
    --accent-200: #bbb3e5;
    --accent-300: #9a8dd8;
    --accent-400: #7867cb;
    --accent-500: #5641be;
    --accent-600: #453498;
    --accent-700: #342772;
    --accent-800: #221a4c;
    --accent-900: #110d26;
    --accent-950: #090713;


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

  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  a {
  color: inherit;
  text-decoration: none;
  }

  ul {
    list-style: none;
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
