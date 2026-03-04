# QuickHire - Job Search Platform

QuickHire represents a state-of-the-art job search platform built for enthusiasts, professionals, and startups. Our platform bridges the gap between top talent and amazing companies with a seamless, high-performance user experience.

## ✨ Features

- **Dynamic Job Listings**: Explore latest and featured jobs with real-time updates.
- **Advanced Filtering**: Filter jobs by category, type (Full-time, Contract), and location.
- **Category Explorer**: Beautifully designed category section with mobile-optimized horizontal layouts.
- **Seamless Applications**: Professional job application system with Zod validation.
- **Premium UI/UX**: Built with Tailwind CSS 4, Lucide icons, and modern design principles.
- **Mobile First**: Fully responsive design with optimized grid layouts for all screen sizes.
- **Interactive Feedback**: Success modals, loading states, and toast notifications for better UX.

## 🚀 Tech Stack

- **Frontend**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Logic**: [React 19](https://reactjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query/latest)
- **HTTP Client**: [Axios](https://axios-http.com/)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd quick-hire-user-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   Create a `.env` file in the root and add your API URL:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Folder Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components (Navbar, Footer, Modals, etc.).
- `src/services`: Service layer for API calls using Axios and React Query.
- `src/types`: TypeScript interfaces and types.
- `src/app/jobs/schemas`: Validation schemas for forms.

## 📄 License

This project is licensed under the MIT License.
