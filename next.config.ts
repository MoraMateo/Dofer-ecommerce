/** @type {import('next').NextConfig} */
const nextConfig = {
  // Agrega los orígenes que necesites permitir durante el desarrollo
  allowedDevOrigins: ['http://localhost:3000', 'https://dofer.com.mx'],
  
  // Otras opciones de configuración de Next.js
  reactStrictMode: true,
};

module.exports = nextConfig;
