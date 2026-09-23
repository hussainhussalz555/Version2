# Storefront image assets

Put the brand logo at `public/logo.png`. Use a transparent PNG with a dark wordmark for the light header; a wide landscape image (roughly 3:1) works best. The footer automatically presents the same logo in a light treatment on its dark background.

Product photos belong in `public/products/`:

- `product1.png` — Matte Black concealed shower set
- `product2.png` — Brushed Gold concealed shower set
- `product3.png` — Polished Chrome concealed shower set

Use clear, high-resolution product photography with a neutral/transparent background. Keep the filenames and capitalization exactly as shown. Next.js serves these files from the site root, so `public/products/product1.png` is referenced in code as `/products/product1.png`.

The storefront includes intentional branded fallbacks until these optional files are added. After uploading images, run `npm run build` from `Version2/` and check the deployed site to confirm each image loads and crops as intended.
