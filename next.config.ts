import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  compiler: {
    removeConsole: !isDev,
  },
  images: {
    remotePatterns: [
      // this a example
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
        pathname: "/my-bucket/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
