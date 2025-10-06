/** @type {import('tailwindcss').Config} */
export default {
  // The 'content' array tells Tailwind where to look for class names.
  // It's configured to scan all relevant source files in your project.
  // Tailwind will then generate a CSS file containing only the classes you've used.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  // The 'theme' object is where you customize your design system.
  // You can override or extend Tailwind's default styles here.
  theme: {
    extend: {
      // It's a best practice to add your custom colors inside 'extend'.
      // This makes your custom colors available alongside Tailwind's default palette.
      colors: {
        // Example colors based on your UI mockups.
        // You would define your entire color palette here for consistency.
        'brand-dark': '#111827',     // Dark background
        'brand-surface': '#1F2937',  // Card background
        'brand-primary': '#06B6D4',  // Cyan/Primary accent
        'brand-primary-hover': '#0891B2',
        'brand-secondary': '#374151',// Borders and secondary elements
        'brand-success': '#10B981',  // Green for price drops
        'brand-text': '#F9FAFB',      // Primary text
        'brand-text-muted': '#9CA3AF',// Muted text
      },
      fontFamily: {
        // You could also define a custom font here to match your design.
        // sans: ['Inter', 'sans-serif'],
      }
    },
  },
  
  // The 'plugins' array allows you to add official or third-party plugins
  // to extend Tailwind's functionality, such as for forms or typography.
  plugins: [],
}
