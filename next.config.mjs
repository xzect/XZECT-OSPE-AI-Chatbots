import mdx from "@next/mdx"

const withMDX = mdx()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optionally, add any other Next.js config below
}

export default withMDX(nextConfig)
