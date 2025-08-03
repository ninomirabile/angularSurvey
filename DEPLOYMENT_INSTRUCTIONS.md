# 🚀 GitHub Pages Deployment Instructions

## 📋 Prerequisites

1. **GitHub Repository**: Ensure the repository is on GitHub
2. **Permissions**: You must have administrator permissions on the repository
3. **Production Build**: The project must compile correctly

## 🔧 GitHub Pages Configuration

### Step 1: Enable GitHub Pages

1. Go to GitHub in your repository
2. Click on **Settings**
3. Scroll to **Pages** in the sidebar
4. In **Source**, select **GitHub Actions**

### Step 2: Configure the Workflow

The `.github/workflows/deploy.yml` file is already configured and will activate automatically when you push to `main`.

## 📦 Deployment Preparation

### 🚀 Option 1: Automated Scripts (Recommended)

Two scripts are available to automate the entire process:

#### Complete Script (with tests)
```bash
./publish.sh
```

#### Quick Script (without tests)
```bash
./quick-publish.sh
```

**What the scripts do:**
- ✅ Prerequisites check
- ✅ Git status verification
- ✅ Dependency installation
- ✅ Production build
- ✅ Automatic commit and push
- ✅ Deployment via GitHub Actions

### Option 2: Manual Deployment

1. **Production build**:
   ```bash
   cd survey-app
   npm run build:prod
   ```

2. **Deploy with angular-cli-ghpages**:
   ```bash
   npm run deploy
   ```

### Option 3: Automatic Deployment via Git

1. **Commit changes**:
   ```bash
   git add .
   git commit -m "🚀 Prepare for GitHub Pages deployment"
   git push origin main
   ```

2. **Monitor the Workflow**:
   - Go to GitHub → Actions
   - Check that the "Deploy to GitHub Pages" workflow completed successfully

## 🌐 Deployment Verification

### Application URL

The application will be available at:
- **Main URL**: `https://ninomirabile.github.io/angularSurvey/`
- **Alternative URL**: `https://[username].github.io/angularSurvey/`

### Feature Testing

After deployment, verify that the following work:

1. ✅ **Dark/light theme** - Toggle in header
2. ✅ **Navigation** - All sections (Survey Builder, Analytics, etc.)
3. ✅ **Interactive demos** - Test buttons and educational features
4. ✅ **Responsive design** - Test on mobile and desktop
5. ✅ **Performance** - Fast loading and lazy loading

## 🔍 Troubleshooting

### Common Issues

1. **404 Error**:
   - Verify that `baseHref` is `/angularSurvey/` in `angular.json`
   - Check that the workflow points to `dist/survey-app/browser`

2. **Styles not loaded**:
   - Verify that Angular Material is included in `angular.json`
   - Check that Tailwind CSS is configured correctly

3. **Routing doesn't work**:
   - Verify that the `baseHref` is correct
   - Check that routes are configured for GitHub Pages

### Debug Logs

If there are issues, check:
- **GitHub Actions**: Go to Actions → Deploy to GitHub Pages
- **Browser console**: F12 → Console for JavaScript errors
- **Network tab**: For resource loading issues

## 📊 Performance Metrics

After deployment, verify:

- **Lighthouse Score**: Should be > 90
- **Bundle Size**: < 1MB initial
- **Lazy Loading**: Chunks loaded on-demand
- **First Contentful Paint**: < 2 seconds

## 🎯 Next Steps

1. **Share the URL** with colleagues and students
2. **Document features** in the README
3. **Collect feedback** for improvements
4. **Monitor performance** with Google Analytics (optional)

## 📞 Support

If you have problems:
1. Check GitHub Actions logs
2. Verify browser console
3. Check that all files are committed
4. Ensure the repository is public

---

**🎉 Congratulations!** Your Angular 20 educational project is now live on GitHub Pages! 