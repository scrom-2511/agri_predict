# AgriPredict Frontend - Context Pages

This document outlines the current page structure, routing, and key components of the AgriPredict frontend application.

## Application Structure

The application is built using React (Vite) and uses `react-router` for navigation. Styling is handled via TailwindCSS and Shadcn UI components.

### 1. Main Entry (`src/App.tsx`)
- Wraps the application in a `ThemeProvider` (for dark/light mode support) and `BrowserRouter`.
- Defines the main `Routes` for the application.
- Includes a global `ModeToggle` component.

### 2. Pages (`src/pages/`)

#### Home Page (`src/pages/home/`)
- **`/` & `/home`** (`src/pages/home/index.tsx`):
  - High-impact, agronomic landing page engineered with modern design tokens and rich telemetry aesthetics.
  - **Live Model Telemetry Sandbox (Hero)**: Interactive scenario switcher (Wheat Loam, Cotton Black, Monsoon Paddy, Maize Sandy) showing real-time inference recalculation, climate sensor metrics, and N-P-K nutrient bar with 99.1% match score.
  - **Telemetry & Impact Metrics Strip**: Highlights key capabilities (14 target compounds, 99.1% accuracy, 5 soil classes, zero nitrogen runoff target).
  - **4-Stage Prescriptive Pipeline**: Comprehensive breakdown of micro-climate sensing, geological bio-profiling, chemical assay, and neural decision output.
  - **Interactive Soil Profile Spectrum**: Dynamic explorer for Loamy, Black, Sandy, Clayey, and Red soils showcasing moisture retention indices, drainage profiles, high-affinity crops, and agronomic care rules.
  - **14-Compound Fertilizer Catalog Preview**: Category-filtered card grid (High Nitrogen, Phosphatic, Potassium, Balanced NPK) displaying real specifications from `FERTILIZER_DATABASE` with chemical formulas, NPK badges, and application rates.
  - **Field Provenance & Agronomist Testimonials**: Empirical farmer case studies highlighting yield gains and nutrient efficiency.
  - **Conversion Call-to-Action & Full Footer**: Seamless navigation across the platform with links to `/predictor`, `/signin`, and `/signup`.

#### Authentication (`src/pages/auth/`)
- **`AuthLayout`** (`src/pages/auth/common/auth-layout.tsx`):
  - Split-screen telemetry authentication frame with responsive desktop/mobile optimization and balanced spatial proportions.
  - Features a dynamic agricultural showcase panel with dark gradient overlays, brand navigation, live model status (`v2.4 Active`), platform capability stats (14 Verified Fertilizers, 99.1% Inference Precision, 0.0% Target Runoff Waste), and agronomist credibility testimonial.
  - Includes top navigation breadcrumb (`← Back to AgriPredict`), mode-switcher (`Sign in` / `Create account`), and security compliance footer (`256-bit SSL encrypted`).
- **`/signup`** (`src/pages/auth/signup.tsx`): 
  - Form container widened to `max-w-[480px]` with balanced padding, eliminating awkward dead space.
  - Interactive profile type selector pills (*Grower / Farm*, *Agronomist*, *Researcher*).
  - Enhanced tactile inputs with inset leading icons (`User`, `Mail`, `Lock`).
  - Interactive, real-time password strength meter with 4-level colored progress bar and criteria checklist (8+ chars, numbers, symbols).
  - Password show/hide toggle and terms agreement checkbox.
  - Polished Google and GitHub OAuth authentication buttons.
- **`/signin`** (`src/pages/auth/signin.tsx`): 
  - Form container widened to `max-w-md` (460px) with balanced horizontal padding.
  - 1-Click Demo Login Banner allowing instant test credentials autofill (`agronomist@agripredict.org`).
  - Tactile inputs with leading icons (`Mail`, `Lock`) and password visibility toggle.
  - Remember session checkbox, forgot password link, and Google/GitHub OAuth integrations.

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
  <Route path="/" element={<HomePage />} />
  <Route path="/home" element={<HomePage />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/signin" element={<SigninPage />} />
  <Route path="/predictor" element={<PredictorPage />} />
</Routes>
```

*(This file should be updated as new pages and routes are added to the application.)*

