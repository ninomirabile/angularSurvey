#!/bin/bash

# 🚀 Angular 20 Survey Builder - Complete Publication Script
# This script automates the entire publication process for GitHub Pages

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Script configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR"
SURVEY_APP_DIR="$PROJECT_ROOT/survey-app"
SKIP_TESTS=false
SKIP_DEPLOY=false

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${PURPLE}================================${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${PURPLE}================================${NC}"
}

# Function to show help
show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --help         Show this help message"
    echo "  --skip-tests   Skip running tests"
    echo "  --skip-deploy  Skip manual deployment"
    echo ""
    echo "This script will:"
    echo "  1. Check prerequisites"
    echo "  2. Verify Git status"
    echo "  3. Install dependencies"
    echo "  4. Run tests (unless --skip-tests)"
    echo "  5. Build for production"
    echo "  6. Commit and push changes"
    echo "  7. Deploy to GitHub Pages (unless --skip-deploy)"
    echo ""
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --help)
            show_help
            exit 0
            ;;
        --skip-tests)
            SKIP_TESTS=true
            shift
            ;;
        --skip-deploy)
            SKIP_DEPLOY=true
            shift
            ;;
        *)
            print_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Function to check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 20+"
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 20 ]; then
        print_error "Node.js version 20+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js version: $(node --version)"
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        exit 1
    fi
    
    print_success "npm version: $(npm --version)"
    
    # Check Git
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed"
        exit 1
    fi
    
    print_success "Git version: $(git --version)"
    
    # Check if we're in the right directory
    if [ ! -f "$SURVEY_APP_DIR/package.json" ]; then
        print_error "package.json not found in $SURVEY_APP_DIR"
        print_error "Please run this script from the project root directory"
        exit 1
    fi
    
    print_success "Project structure verified"
}

# Function to check Git status
check_git_status() {
    print_header "Checking Git Status"
    
    cd "$PROJECT_ROOT"
    
    # Check if we're in a Git repository
    if [ ! -d ".git" ]; then
        print_error "Not in a Git repository"
        exit 1
    fi
    
    # Check current branch
    CURRENT_BRANCH=$(git branch --show-current)
    print_status "Current branch: $CURRENT_BRANCH"
    
    # Check for uncommitted changes
    if [ -n "$(git status --porcelain)" ]; then
        print_warning "There are uncommitted changes:"
        git status --short
        echo ""
        read -p "Do you want to continue? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_error "Publication cancelled"
            exit 1
        fi
    else
        print_success "Working directory is clean"
    fi
    
    # Check if we're up to date with remote
    git fetch origin
    LOCAL_COMMIT=$(git rev-parse HEAD)
    REMOTE_COMMIT=$(git rev-parse origin/$CURRENT_BRANCH)
    
    if [ "$LOCAL_COMMIT" != "$REMOTE_COMMIT" ]; then
        print_warning "Local branch is not up to date with remote"
        print_status "Local:  $LOCAL_COMMIT"
        print_status "Remote: $REMOTE_COMMIT"
        echo ""
        read -p "Do you want to continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_error "Publication cancelled"
            exit 1
        fi
    else
        print_success "Branch is up to date with remote"
    fi
}

# Function to install dependencies
install_dependencies() {
    print_header "Installing Dependencies"
    
    cd "$SURVEY_APP_DIR"
    
    print_status "Cleaning npm cache..."
    npm cache clean --force
    
    print_status "Removing node_modules and package-lock.json..."
    rm -rf node_modules package-lock.json
    
    print_status "Installing dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
}

# Function to run tests
run_tests() {
    if [ "$SKIP_TESTS" = true ]; then
        print_warning "Skipping tests (--skip-tests flag used)"
        return
    fi
    
    print_header "Running Tests"
    
    cd "$SURVEY_APP_DIR"
    
    # Run unit tests
    print_status "Running unit tests..."
    if npm run test:unit; then
        print_success "Unit tests passed"
    else
        print_error "Unit tests failed"
        exit 1
    fi
    
    # Run E2E tests
    print_status "Running E2E tests..."
    if npm run test:e2e; then
        print_success "E2E tests passed"
    else
        print_error "E2E tests failed"
        exit 1
    fi
}

# Function to build for production
build_production() {
    print_header "Building for Production"
    
    cd "$SURVEY_APP_DIR"
    
    print_status "Building application..."
    if npm run build:prod; then
        print_success "Production build completed successfully"
        
        # Check build output
        if [ -d "dist/survey-app/browser" ]; then
            BUILD_SIZE=$(du -sh dist/survey-app/browser | cut -f1)
            print_success "Build size: $BUILD_SIZE"
        else
            print_error "Build output not found in expected location"
            exit 1
        fi
    else
        print_error "Production build failed"
        exit 1
    fi
}

# Function to commit and push changes
commit_and_push() {
    print_header "Committing and Pushing Changes"
    
    cd "$PROJECT_ROOT"
    
    # Add all changes
    print_status "Adding all changes to Git..."
    git add .
    
    # Check if there are changes to commit
    if [ -z "$(git status --porcelain)" ]; then
        print_warning "No changes to commit"
        return
    fi
    
    # Create commit message with timestamp
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    COMMIT_MESSAGE="🚀 Automated deployment - $TIMESTAMP
    
    - Production build completed
    - All tests passed
    - Ready for GitHub Pages deployment"
    
    print_status "Creating commit..."
    git commit -m "$COMMIT_MESSAGE"
    
    print_status "Pushing to remote repository..."
    if git push origin $(git branch --show-current); then
        print_success "Changes pushed successfully"
    else
        print_error "Failed to push changes"
        exit 1
    fi
}

# Function to perform manual deployment
manual_deploy() {
    if [ "$SKIP_DEPLOY" = true ]; then
        print_warning "Skipping manual deployment (--skip-deploy flag used)"
        print_status "Deployment will happen automatically via GitHub Actions"
        return
    fi
    
    print_header "Manual Deployment"
    
    cd "$SURVEY_APP_DIR"
    
    print_status "Deploying to GitHub Pages..."
    if npm run deploy; then
        print_success "Manual deployment completed successfully"
    else
        print_error "Manual deployment failed"
        print_warning "Deployment will still happen automatically via GitHub Actions"
    fi
}

# Function to perform final checks
final_check() {
    print_header "Final Verification"
    
    print_status "Checking build output..."
    if [ -d "$SURVEY_APP_DIR/dist/survey-app/browser" ]; then
        print_success "Build output verified"
    else
        print_error "Build output not found"
        exit 1
    fi
    
    print_status "Checking Git status..."
    cd "$PROJECT_ROOT"
    if [ -z "$(git status --porcelain)" ]; then
        print_success "Working directory is clean"
    else
        print_warning "There are uncommitted changes"
    fi
    
    print_success "All verifications completed"
}

# Function to show final information
show_final_info() {
    print_header "Publication Summary"
    
    echo -e "${CYAN}✅ Publication process completed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "1. Monitor GitHub Actions: https://github.com/ninomirabile/angularSurvey/actions"
    echo "2. Check deployment status in GitHub Pages settings"
    echo "3. Verify the live application: https://ninomirabile.github.io/angularSurvey/"
    echo ""
    echo -e "${YELLOW}Expected timeline:${NC}"
    echo "- GitHub Actions: 2-5 minutes"
    echo "- GitHub Pages deployment: 1-3 minutes"
    echo "- Total time: 3-8 minutes"
    echo ""
    echo -e "${GREEN}🎉 Your Angular 20 Survey Builder is being deployed!${NC}"
}

# Main execution
main() {
    print_header "🚀 Angular 20 Survey Builder - Complete Publication"
    print_status "Starting automated publication process..."
    echo ""
    
    check_prerequisites
    check_git_status
    install_dependencies
    run_tests
    build_production
    commit_and_push
    manual_deploy
    final_check
    show_final_info
    
    print_header "✅ Publication Process Completed"
}

# Run main function
main "$@" 