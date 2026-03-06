# Notisaver Appstore

Static marketing site for Notisaver. This folder is isolated from the Android app so it can be deployed independently with GitHub and Netlify.

## Folder map

- `index.html` - landing page
- `privacy.html` - privacy policy
- `terms.html` - terms of service
- `support.html` - support page
- `contact.html` - hosted contact form page
- `contact-success.html` - form success page
- `assets/css/styles.css` - shared styling
- `assets/js/site.js` - nav, FAQ, and carousel behavior
- `assets/icons/` - logo and favicon SVGs
- `assets/images/` - preview artwork and screenshots
- `downloads/notisaver-v1.0.0.apk` - direct Android download served by the site

## Deploy

### Cloudflare Pages

1. Push the repository to GitHub.
2. In Cloudflare Pages, connect the repository.
3. Use:
   - Framework preset: `None`
   - Build command: `exit 0`
   - Build output directory: `.`
   - Root directory: leave empty
4. Deploy from branch `main`.

The repo includes `_redirects` and `_headers` files for Cloudflare Pages.

## Contact form

- The contact page uses `formsubmit.co` to forward submissions to `peakliterature@gmail.com`.
- The first live submission may trigger a confirmation email from FormSubmit before forwarding is fully active.

### Netlify

The repo also keeps `netlify.toml` if you ever want Netlify as a backup host.

## Notes

- The five promotional screenshots from `Downloads` are now wired into the screenshot carousel.
- The current release APK is copied into the site so Netlify can serve it directly.
- If you publish a new app version later, replace `downloads/notisaver-v1.0.0.apk` and update the filename in `index.html`.
