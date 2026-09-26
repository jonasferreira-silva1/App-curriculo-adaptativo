/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// Configuração principal do Vite para o projeto React + Tailwind v4 + Vitest
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Plugin oficial do Tailwind CSS v4 para Vite
  ],
  resolve: {
    alias: {
      // Alias '@' apontando para a pasta 'src' para facilitar as importações
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    // Configurações do Vitest para execução dos testes unitários
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
