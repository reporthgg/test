/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ограничиваем параллелизм сборки: на shared-хостинге иначе падает с EAGAIN
  // (нехватка ресурсов при порождении процессов).
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
