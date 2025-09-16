import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RAO Rentals Admin Portal",
    short_name: "RAO Admin",
    description: "Admin portal for the RAO Rentals app",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#EF4444",
    icons: [
      {
        src: "icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
