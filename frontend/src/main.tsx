import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// 1. Find the root DOM element.
// The '!' at the end is a non-null assertion, telling TypeScript that we are certain
// this element exists in our index.html file.
const rootElement = document.getElementById('root')!

// 2. Create a React root.
// This is the modern React 18 way to render the application,
// enabling concurrent features.
const root = ReactDOM.createRoot(rootElement)

// 3. Render the application.
root.render(
  // React.StrictMode is a developer tool that helps find potential problems
  // in an application. It activates additional checks and warnings for its descendants.
  // It does not impact the production build.
  <React.StrictMode>
    {/*
      BrowserRouter is the component that enables client-side routing.
      It must wrap the entire application to provide routing context
      to all child components, like the pages and links defined in App.tsx.
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

