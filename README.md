# Frontend Project Setup & Operations Guide

## Table of Contents
- [Installation](#installation)
- [Environment Setup](#environment-setup)
---

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npm run dev
   ```

The application should now be running on `http://localhost:5173` (or your configured port).

---

## Environment Setup

### Create Environment File

Create a `.env` file in the root directory of your project:

```bash
cp .env.example .env
```

### Environment Variables

Add the following variables to your `.env` file:

```env
# API Configuration
VUE_APP_API_URL=http://localhost:5250/api/v1
```
---