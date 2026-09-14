# AgriPredict Frontend - Context Pages

This document outlines the current page structure, routing, and key components of the AgriPredict frontend application.

## Application Structure

The application is built using React (Vite) and uses `react-router` for navigation. Styling is handled via TailwindCSS and Shadcn UI components.

### 1. Main Entry (`src/App.tsx`)
- Wraps the application in a `ThemeProvider` (for dark/light mode support) and `BrowserRouter`.
- Defines the main `Routes` for the application.
- Includes a global `ModeToggle` component.

### 2. Pages (`src/pages/`)

#### Authentication (`src/pages/auth/`)
- **`/signup`** (`src/pages/auth/signup.tsx`): 
  - A responsive, split-screen signup page following an editorial design language.
  - Features an agricultural-themed visual on the left side (desktop).
  - Uses a clean, form-integrated layout on the right side without heavy card borders.
  - Supports standard email/password registration and includes placeholder buttons for Google and Facebook OAuth login.
- **`/signin`** (`src/pages/auth/signin.tsx`): 
  - A responsive, split-screen signin page mirroring the aesthetic of the signup page.
  - Includes standard email/password login fields, a "Forgot password" link, and OAuth placeholders.

## Routing Map

```typescript
<Routes>
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/signin" element={<SigninPage />} />
</Routes>
```

*(This file should be updated as new pages and routes are added to the application.)*
