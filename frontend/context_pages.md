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

#### Fertilizer Predictor (`src/pages/predictor/`)
- **`/predictor`** (`src/pages/predictor/index.tsx`):
  - Modern, modular agricultural telemetry dashboard for ML-driven fertilizer prediction and direct product ordering.
  - Built with an agronomy design language adhering strictly to `src/index.css` design tokens and typography.
  - Supported input parameters: `Temperature`, `Humidity`, `Moisture`, `Soil_Type`, `Crop_Type`, `Nitrogen`, `Potassium`, `Phosphorous`.
  - Supported 14-fertilizer model classification outputs: `Urea`, `TSP`, `Superphosphate`, `Potassium sulfate.`, `Potassium chloride`, `DAP`, `28-28`, `20-20`, `17-17-17`, `15-15-15`, `14-35-14`, `14-14-14`, `10-26-26`, `10-10-10`.
  - **Modular Components (`src/components/predictor/`)**:
    - **`PresetsBar.tsx`**: 1-click diagnostic test scenarios (*Wheat Winter Crop*, *Monsoon Paddy*, *Cotton Cash Crop*, *Maize / Corn Vigor*) for instant parameter pre-filling.
    - **`EnvironmentalMetrics.tsx`**: Dual-control precision sliders and numerical inputs for climate telemetry with live status chips (*Optimal*, *Arid/Favorable*, *Waterlogged*).
    - **`SoilCropSelector.tsx`**: Interactive soil profile cards (Sandy, Loamy, Black, Red, Clayey) with texture & drainage specs, plus categorized crop selector pills (Wheat, Paddy, Maize, Cotton, Sugarcane, etc.).
    - **`NutrientMatrix.tsx`**: Macro-nutrient assay with interactive sliders, precision step controls (+5/-5), real-time N:P:K ratio calculator, and proportional distribution balance bar.
    - **`PredictionResult.tsx`**: Diagnostic report display with 99.1% Model Confidence badge, NPK rating, benefits breakdown, studio product photography, live quantity calculator, and interactive **Buy Now** checkout workflow.
    - **`types.ts` & `presets.ts`**: TypeScript type definitions, preset scenario datasets, and comprehensive fertilizer catalog specifications.

## Routing Map

```typescript
<Routes>
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/signin" element={<SigninPage />} />
  <Route path="/predictor" element={<PredictorPage />} />
</Routes>
```

*(This file should be updated as new pages and routes are added to the application.)*

