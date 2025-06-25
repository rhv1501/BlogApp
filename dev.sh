#!/bin/bash

# Blog App Development Helper Script
# This script provides common development commands using pnpm

echo "🚀 Blog App Development Helper"
echo "=============================="
echo ""

case "$1" in
    "dev")
        echo "Starting development server..."
        pnpm dev
        ;;
    "build")
        echo "Building for production..."
        pnpm build
        ;;
    "start")
        echo "Starting production server..."
        pnpm start
        ;;
    "lint")
        echo "Running linter..."
        pnpm lint
        ;;
    "install")
        echo "Installing dependencies..."
        pnpm install
        ;;
    "clean")
        echo "Cleaning node_modules and reinstalling..."
        rm -rf node_modules pnpm-lock.yaml
        pnpm install
        ;;
    *)
        echo "Available commands:"
        echo "  ./dev.sh dev     - Start development server"
        echo "  ./dev.sh build   - Build for production"
        echo "  ./dev.sh start   - Start production server"
        echo "  ./dev.sh lint    - Run linter"
        echo "  ./dev.sh install - Install dependencies"
        echo "  ./dev.sh clean   - Clean and reinstall dependencies"
        ;;
esac
