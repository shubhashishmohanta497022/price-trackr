export default {
  plugins: {
    // The Tailwind CSS plugin.
    // This scans your HTML and JS files for Tailwind classes and processes
    // directives like `@tailwind base`, `@tailwind components`, and `@tailwind utilities`
    // in your main CSS file.
    tailwindcss: {},
    
    // The Autoprefixer plugin.
    // This automatically adds vendor prefixes to CSS rules, which is a best practice
    // for ensuring browser compatibility. For example, it might turn `user-select: none`
    // into `-webkit-user-select: none; user-select: none;`.
    autoprefixer: {},
  },
}
