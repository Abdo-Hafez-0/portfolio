The OG/social preview image has already been created and configured, but it is currently failing to load when the website is shared.

I want you to DEBUG the existing implementation rather than redesigning or recreating it.

First, inspect the entire existing project and specifically investigate:

1. Where the OG image is stored.
2. Whether the file is actually included in the production build.
3. Whether the generated/deployed website can access the image through its public URL.
4. The exact value of the `og:image` meta tag.
5. Whether `og:image` uses a valid absolute HTTPS URL.
6. Whether the domain in the metadata matches the actual production domain.
7. Whether the image path is case-sensitive and matches the actual filename.
8. Whether Cloudflare Pages is correctly serving the image.
9. Whether the image format, dimensions, MIME type, or file size could prevent social crawlers from loading it.
10. Whether the HTML containing the OG metadata is available to crawlers without requiring JavaScript execution.
11. Whether Vite/build configuration is moving, ignoring, or modifying the image.
12. Whether there are redirects, security headers, robots rules, or other configuration issues preventing external crawlers from accessing it.

Do not assume the problem is with the image itself.

Trace the complete flow:

Local file
→ production build
→ Cloudflare Pages
→ public image URL
→ HTML `<meta property="og:image">`
→ social media crawler

Find exactly where the failure occurs.

Use the existing project and deployment configuration. Do not install unnecessary dependencies and do not recreate the OG image.

If possible, verify the production image URL directly and inspect the deployed HTML to confirm that the OG metadata is actually present.

After identifying the problem:

1. Explain the root cause briefly.
2. Make the smallest appropriate fix.
3. Verify that the fix works in the production build.
4. Tell me exactly what you changed and why.
5. If the issue is caused by social-media caching rather than the website itself, explain that separately and tell me how to refresh/test the cached preview.

Important: do not change the visual design of the OG image. The existing image is already designed and should remain unchanged unless you discover that the file itself is technically invalid.