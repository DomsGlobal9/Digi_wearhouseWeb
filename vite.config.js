// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    outDir: "dist"
  }
})

// import { defineConfig } from 'vite'
// import react from "@vitejs/plugin-react";
// import tailwindcss from '@tailwindcss/vite'
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     react()
//   ],
//   server: {
//     proxy: process.env.NODE_ENV === 'development' ? {
//       "/api": "http://localhost:3001" // Local dev server
//     } : {}
//   },
//   // server: {
//   //   proxy: {
//   //     "/api": "http://localhost:5000",
//   //   },
//   // },
//   build: {
//     outDir: "dist"
//   }
// })


// import { defineConfig } from "vite";


// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: "dist"
//   }
// });