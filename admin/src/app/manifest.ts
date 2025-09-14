import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RAO Rentals Admin",
    short_name: "RAO Admin",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    icons: [
      {
        src: "",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
