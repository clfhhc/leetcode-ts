# Deployment

## GitHub Pages Setup

The repository is configured for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages** in your repository settings
2. **Set source** to "GitHub Actions"
3. **Update the site URL** in `apps/site/astro.config.mjs`:
   ```javascript
   site: 'https://your-username.github.io/leetcode-ts',
   ```
4. **Push to main branch** - the site will build and deploy automatically

The site will be available at: `https://your-username.github.io/leetcode-ts`

## CI/CD Pipeline

### GitHub Actions Workflow

The repository includes two GitHub Actions workflows:

1. **CI Workflow** (`.github/workflows/ci.yml`):
   - Runs on all branches and pull requests
   - Installs dependencies with Mise and pnpm
   - Runs type checking, linting, and tests
   - Builds data and site for pull requests

2. **Deploy Workflow** (`.github/workflows/deploy.yml`):
   - Runs only on main branch pushes
   - Builds the complete site
   - Deploys to GitHub Pages

### Build Process

1. **Data Generation**: Processes all problem files and generates JSON data
2. **Site Build**: Creates static HTML pages with SolidJS components
3. **Deployment**: Uploads built files to GitHub Pages

## Alternative Hosting Options

- **Cloudflare Pages** - Faster builds, better analytics, edge functions
- **Vercel** - Excellent DX, preview deployments for PRs
- **Netlify** - Good free tier, form handling

## Environment Variables

No environment variables are required for basic deployment. The site is fully static and self-contained.
