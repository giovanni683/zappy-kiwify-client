// Importação corrigida para evitar erro SSR e garantir uso client-side
let zdk: any = null;
if (typeof window !== 'undefined') {
  const { ZDK } = require('zdk');
  zdk = new ZDK({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });
}

export default zdk;
