import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!baseURL) throw new Error('A variável de ambiente NEXT_PUBLIC_API_BASE_URL não está definida. Verifique seu arquivo .env e reinicie o servidor.');

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});
