# Alexandros Phardis — Personal Portfolio

A responsive portfolio for mathematics research, data science, quantitative work, and software engineering. The interface combines restrained comic-panel framing with clear typography and a professional reading flow.

## Deployment target

- **Repository:** `AlexPha45/alexpha45.github.io`
- **Website:** <https://alexpha45.github.io/>
- **Hosting:** GitHub Pages, deployed with GitHub Actions
- **Vite base:** `/`

This is an account-level GitHub Pages site. Keep the repository name `alexpha45.github.io` so the website opens at the root address, with no repository-name path. No custom domain or `CNAME` file is required.

## Stack

- React and TypeScript
- Vite
- Tailwind CSS
- Native anchor navigation and IntersectionObserver
- Self-hosted fonts, original technical SVG illustrations, and responsive WebP photographs

Content is local and typed. Visitors do not need a GitHub API connection, and there is no backend or contact-form service.

## Local development

Use a current Node.js LTS release with npm. Install the exact dependencies recorded in the lockfile:

```sh
npm ci
npm run dev
```

The development command prints the local preview address. Available commands:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run typecheck` | Check TypeScript |
| `npm run lint` | Check code quality |
| `npm run check` | Run the project’s validation checks |
| `npm run build` | Create the production output in `dist/` |
| `npm run preview` | Serve the production build locally |

Before publishing, run the checks and inspect the production build:

```sh
npm run check
npm run preview
```

## Editing content

Edit `src/data/portfolio.ts` to update contact details, project descriptions, experience, leadership, and gallery entries. Project records include a summary, tags, highlights, source links, and optional context or collaboration credit.

Use the linked project materials as the source for technical claims:

- [No-Limit Pokerbots](https://github.com/AlexPha45/No-Limit-Pokerbots): eight archived Python strategies. Evaluation statistics describe a selected run; sub-1ms latency is a competition constraint, not a measured benchmark. The current strategies use fixed policies and action-conditioned equity estimates.
- [Numerical Methods in Scientific Computing](https://github.com/AlexPha45/Numerical-Methods-in-Scientific-Computing): directed-reading presentations and LaTeX sources covering Monte Carlo integration, SVD, and Gaussian quadrature.
- [Trefoil Divisibility](https://github.com/AlexPha45/Canadian-Undergraduate-Mathematics-Conference-2025): joint mathematical research. Preserve collaborator credits and distinguish polynomial-divisibility results from connected-sum decomposition.

Professional experience and education are based on the supplied résumé. Avoid presenting completed internships as current roles.

## Updating assets

- Replace `public/resume/alexandros-phardis-resume.pdf` to update the résumé without changing its public address.
- Keep optimized gallery photographs in `public/images/` using the `at-work`, `community`, and `briefing` names with `640`, `960`, and `1440` width variants.
- When changing photographs, update their alternative text, `srcSet`, and intrinsic dimensions in the content file. Preserve the group photograph’s full composition.
- Keep font files self-hosted and retain their license information.
- Update the social preview image and metadata when changing the site’s identity or introduction.

Original full-resolution photographs, the original résumé file, and the `Comic theme images` reference folder remain local source material. The production site uses the optimized assets under `public/`. Copyrighted character and comic-cover artwork is excluded from the published site.

`python scripts/prepare-assets.py` regenerates the photos, illustrations, social preview, favicon, and résumé copy when the original local files are present. It requires Pillow; FontTools and Brotli allow the social preview to use the installed web fonts. Font licenses are included in `public/licenses/`.

## Publishing with GitHub Pages

1. Reuse or create `AlexPha45/alexpha45.github.io`. A new repository is public with `main` as its default branch; preserve the history and default branch of an existing repository.
2. Push the website source and its GitHub Actions workflow to the repository. Never commit credentials or tokens.
3. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
4. The deployment workflow validates and builds the site, then publishes `dist/`. It runs when the configured default branch is updated and can also be run manually from the Actions tab.
5. If the repository’s default branch changes, update the workflow’s push-branch filter to match.
6. Confirm that HTTPS is enabled and that the site opens at <https://alexpha45.github.io/>.

Keep the canonical URL, social metadata, sitemap, and asset paths aligned with this root address. Do not add a repository subdirectory to Vite’s `base` setting.

## Verification checklist

- Type checking, linting, and production build pass.
- Inspect the production preview at 360px, 768px, and 1440px.
- Check keyboard navigation, mobile-menu dismissal and focus, visible focus states, and reduced-motion behavior.
- Test direct section links and browser history; headings must clear the sticky header.
- Verify every project resource, email link, social link, and résumé view/download action.
- Check photo composition, long email wrapping, contrast, horizontal overflow, and font/image layout shifts.
- After publishing, check the root URL and its assets in a fresh browser session.

## Maintenance

Keep the lockfile committed. Review dependency updates locally before deployment, and rerun validation after content or styling changes. All contact links work directly; no API keys or environment secrets are needed for the portfolio itself.

At initial release, npm reports a moderate [minimatch advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249) in the lint toolchain. This dependency is not shipped to visitors, and the inspected lint consumers do not enable the affected `optimizationLevel >= 2` mode. Track the upstream fix rather than applying a cross-major override or npm's suggested toolchain downgrade blindly.
