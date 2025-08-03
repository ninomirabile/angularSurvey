#!/bin/bash

# ⚡ Angular 20 Survey Builder - Quick Publication Script
# This script performs a fast publication for quick updates

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
    echo "Usage: $0"
    echo ""
    echo "This script performs a quick publication:"
    echo "  1. Quick checks"
    echo "  2. Production build"
    echo "  3. Commit and push"
    echo "  4. Automatic deployment via GitHub Actions"
    echo ""
    echo "Note: This script skips tests for faster execution"
    echo ""
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --help|-h)
            show_help
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Function to perform quick checks
quick_checks() {
    print_header "Quick Checks"
    
    # Check if we're in the right directory
    if [ ! -f "$SURVEY_APP_DIR/package.json" ]; then
        print_error "package.json not found in $SURVEY_APP_DIR"
        print_error "Please run this script from the project root directory"
        exit 1
    fi
    
    # Check if we're in a Git repository
    if [ ! -d "$PROJECT_ROOT/.git" ]; then
        print_error "Not in a Git repository"
        exit 1
    fi
    
    print_success "Quick checks passed"
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
    COMMIT_MESSAGE="⚡ Quick update - $TIMESTAMP
    
    - Production build completed
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

# Function to show final information
show_final_info() {
    print_header "Quick Publication Summary"
    
    echo -e "${CYAN}✅ Quick publication completed successfully!${NC}"
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
    print_header "⚡ Angular 20 Survey Builder - Quick Publication"
    print_status "Starting quick publication process..."
    echo ""
    
    quick_checks
    build_production
    commit_and_push
    show_final_info
    
    print_header "✅ Quick Publication Completed"
}

# Run main function
main "$@" 