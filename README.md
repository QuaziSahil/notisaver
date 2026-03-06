# Notisaver Appstore

Static marketing site for Notisaver. This folder is isolated from the Android app so it can be deployed independently with GitHub and Netlify.

## Folder map

- `index.html` - landing page
- `privacy.html` - privacy policy
- `terms.html` - terms of service
- `support.html` - support page
- `assets/css/styles.css` - shared styling
- `assets/js/site.js` - nav, FAQ, and carousel behavior
- `assets/icons/` - logo and favicon SVGs
- `assets/images/` - preview artwork and screenshots
- `downloads/notisaver-v1.0.0.apk` - direct Android download served by the site

## Deploy

1. Push the repository to GitHub.
2. In Netlify, connect the repository.
3. Set the publish directory to `notisaver-appstore`.
4. Leave the build command empty.

If you keep the root `netlify.toml` file, Netlify should pick up the publish directory automatically.

## Notes

- The five promotional screenshots from `Downloads` are now wired into the screenshot carousel.
- The current release APK is copied into the site so Netlify can serve it directly.
- If you publish a new app version later, replace `downloads/notisaver-v1.0.0.apk` and update the filename in `index.html`.
