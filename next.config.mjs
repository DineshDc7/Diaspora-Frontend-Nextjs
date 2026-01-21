/** @type {import('next').NextConfig} */
const nextConfig = {
  // If your backend serves uploaded files like:
  //   http://localhost:8080/uploads/reports/<file>
  // this rewrite lets the frontend serve them from:
  //   http://localhost:3000/uploads/reports/<file>
  async rewrites() {
    const base = process.env.BACKEND_API_BASE_URL || "";
    const normalized = String(base).replace(/\/+$/, "");

    // If BACKEND_API_BASE_URL is not set, don't add rewrites.
    if (!normalized) return [];

    return [
      {
        source: "/uploads/:path*",
        destination: `${normalized}/uploads/:path*`,
      },
    ];
  },

  // Optional (only needed if you render these in <Image />)
  // It allows Next Image to load from your backend host.
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "your-backend-domain.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
