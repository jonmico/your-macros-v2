import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    // Tailwind colors for new scheme
    // Slate
    --color-slate-100: #f1f5f9;
    --color-slate-200: #e2e8f0;
    --color-slate-300: #cbd5e1;
    --color-slate-400: #94a3b8;
    --color-slate-500: #64748b;
    --color-slate-600: #475569;
    --color-slate-700: #334155;
    --color-slate-800: #1e293b;
    --color-slate-900: #0f172a;

    // Gray
    --color-gray-100: #f3f4f6;
    --color-gray-200: #e5e7eb;
    --color-gray-300: #d1d5db;
    --color-gray-400: #9ca3af;
    --color-gray-500: #6b7280;
    --color-gray-600: #4b5563;
    --color-gray-700: #374151;
    --color-gray-800: #1f2937;
    --color-gray-900: #111827;

    // Zinc
    --color-zinc-100: #f4f4f5;
    --color-zinc-200: #e4e4e7;
    --color-zinc-300: #d4d4d8;
    --color-zinc-400: #a1a1aa;
    --color-zinc-500: #71717a;
    --color-zinc-600: #52525b;
    --color-zinc-700: #3f3f46;
    --color-zinc-800: #27272a;
    --color-zinc-900: #18181b;

    // Red
    --color-red-100: #fee2e2;
    --color-red-200: #fecaca;
    --color-red-300: #fca5a5;
    --color-red-400: #f87171;
    --color-red-500: #ef4444;
    --color-red-600: #dc2626;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;
    --color-red-900: #7f1d1d;

    // Yellow
    --color-yellow-100: #fef9c3;
    --color-yellow-200: #fef08a;
    --color-yellow-300: #fde047;
    --color-yellow-400: #facc15;
    --color-yellow-500: #eab308;
    --color-yellow-600: #ca8a04;
    --color-yellow-700: #a16207;
    --color-yellow-800: #854d0e;
    --color-yellow-900: #713f12;

    // Green
    --color-green-100: #dcfce7;
    --color-green-200: #bbf7d0;
    --color-green-300: #86efac;
    --color-green-400: #4ade80;
    --color-green-500: #22c55e;
    --color-green-600: #16a34a;
    --color-green-700: #15803d;
    --color-green-800: #166534;
    --color-green-900: #14532d;

    // Blue
    --color-blue-100: #dbeafe;
    --color-blue-200: #bfdbfe;
    --color-blue-300: #93c5fd;
    --color-blue-400: #60a5fa;
    --color-blue-500: #3b82f6;
    --color-blue-600: #2563eb;
    --color-blue-700: #1d4ed8;
    --color-blue-800: #1e40af;
    --color-blue-900: #1e3a8a;

    // Indigo
    --color-indigo-100: #e0e7ff;
    --color-indigo-200: #c7d2fe;
    --color-indigo-300: #a5b4fc;
    --color-indigo-400: #818cf8;
    --color-indigo-500: #6366f1;
    --color-indigo-600: #4f46e5;
    --color-indigo-700: #4338ca;
    --color-indigo-800: #3730a3;
    --color-indigo-900: #312e81;

    // Violet
    --color-purple-100: #f3e8ff;
    --color-purple-200: #e9d5ff;
    --color-purple-300: #d8b4fe;
    --color-purple-400: #c084fc;
    --color-purple-500: #a855f7;
    --color-purple-600: #9333ea;
    --color-purple-700: #7e22ce;
    --color-purple-800: #6b21a8;
    --color-purple-900: #581c87;

    // Border radius variables
    --sm-radius: .25rem;
    --md-radius: 0.5rem;
    --lg-radius: 0.75rem;
    --xlg-radius: 1rem;

  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    background-color: var(--color-slate-100);
    color: var(--color-gray-900);
    font-family: 'Ubuntu', system-ui, sans-serif;
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
