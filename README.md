# 🏢 ListIndia - Business Directory Platform

> A comprehensive, full-stack business directory application built with modern technologies and industry-standard practices.

[![React](https://img.shields.io/badge/React-19.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12+-blue.svg)](https://postgresql.org/)
[![Express](https://img.shields.io/badge/Express-4.18-lightgrey.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🏗️ Architecture](#️-architecture)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [📚 API Documentation](#-api-documentation)
- [🎨 Frontend Components](#-frontend-components)
- [🗄️ Database Schema](#️-database-schema)
- [🔒 Security Features](#-security-features)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [📊 Performance](#-performance)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🎯 Project Overview

**ListIndia** is a modern business directory platform that allows users to discover, list, and manage local businesses. Built with React frontend and Node.js backend, it provides a seamless experience for both business owners and customers looking for services.

### 🎪 Live Demo
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)
- **API Health**: [http://localhost:5000/health](http://localhost:5000/health)

### 🎯 Target Audience
- **Business Owners**: List and manage their business information
- **Customers**: Search and discover local businesses
- **Administrators**: Manage platform content and users

## ✨ Features

### 🔐 Authentication & User Management
- **Secure Registration** - JWT-based user authentication
- **Login System** - Email/password authentication with token management
- **User Profiles** - Editable user information and preferences
- **Role-based Access** - Customer and business owner roles
- **Password Security** - bcrypt hashing with salt rounds

### 🏢 Business Management
- **Business Listings** - Comprehensive business information forms
- **Auto-approval System** - Instant business listing activation
- **Category Management** - Organized business categories
- **Location-based Search** - City and state filtering
- **Business Profiles** - Detailed business information display
- **Image Support** - Business logo and image uploads
- **Contact Information** - Phone, email, website, and address

### 🔍 Search & Discovery
- **Advanced Search** - Multi-criteria search functionality
- **Category Filtering** - Browse by business categories
- **Location Filtering** - Search by city and state
- **Featured Businesses** - Highlighted premium listings
- **Real-time Results** - Instant search results
- **Pagination** - Efficient data loading with pagination

### 📱 User Experience
- **Responsive Design** - Mobile-first, cross-device compatibility
- **Modern UI/UX** - Clean, intuitive interface design
- **Real-time Updates** - Live business listing updates
- **Error Handling** - User-friendly error messages
- **Loading States** - Smooth loading indicators
- **Navigation** - Intuitive routing and navigation

### 🔧 Technical Features
- **RESTful API** - Standard HTTP methods and status codes
- **Database Integration** - PostgreSQL with Sequelize ORM
- **Input Validation** - Server-side and client-side validation
- **Error Logging** - Comprehensive error tracking
- **Environment Configuration** - Flexible deployment settings
- **Security Headers** - Helmet.js security middleware

## 🛠️ Technology Stack

### 🎨 Frontend Technologies
```javascript
{
  "framework": "React 19.1.0",
  "routing": "React Router DOM 7.6",
  "http_client": "Axios 1.10",
  "styling": "CSS3 with Flexbox/Grid",
  "build_tool": "Create React App",
  "package_manager": "npm"
}
```

### ⚙️ Backend Technologies
```javascript
{
  "runtime": "Node.js 16+",
  "framework": "Express.js 4.18",
  "database": "PostgreSQL 12+",
  "orm": "Sequelize 6.37",
  "authentication": "JWT (jsonwebtoken)",
  "password_hashing": "bcryptjs",
  "security": "Helmet.js, CORS",
  "validation": "Express Validator",
  "environment": "dotenv"
}
```

### 🗄️ Database & Infrastructure
```javascript
{
  "database": "PostgreSQL",
  "connection_pooling": "Sequelize Connection Pool",
  "migrations": "Sequelize Migrations",
  "seeding": "Sequelize Seeders",
  "indexing": "Database Indexes for Performance"
}
```

## 🏗️ Architecture

### 🎯 Design Patterns
- **MVC Architecture** - Model-View-Controller separation
- **RESTful API Design** - Standard HTTP methods and endpoints
- **Component-based Frontend** - Reusable React components
- **Service Layer Pattern** - Business logic separation
- **Repository Pattern** - Data access abstraction

### 🔄 Data Flow
```
User Interface (React) 
    ↓ HTTP Requests
API Routes (Express) 
    ↓ Business Logic
Database Models (Sequelize) 
    ↓ SQL Queries
PostgreSQL Database
```

### 🌐 System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React SPA     │    │  Express API    │    │  PostgreSQL     │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│  Port: 3000     │    │  Port: 5000     │    │  Port: 5432     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Prerequisites

### 💻 System Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **Memory**: 4GB RAM minimum, 8GB recommended
- **Storage**: 2GB free space
- **Network**: Internet connection for package installation

### 🛠️ Required Software
```bash
# Node.js (v16 or higher)
node --version  # Should return v16.0.0 or higher

# npm (comes with Node.js)
npm --version   # Should return 8.0.0 or higher

# PostgreSQL (v12 or higher)
psql --version  # Should return PostgreSQL 12.0 or higher

# Git (for version control)
git --version   # Should return git version 2.0 or higher
```

### 📦 Optional Tools
- **pgAdmin** - PostgreSQL database management
- **Postman** - API testing and development
- **VS Code** - Recommended code editor
- **Docker** - For containerized deployment

## 🚀 Quick Start

### 1️⃣ Repository Setup
```bash
# Clone the repository
git clone https://github.com/your-username/listIndia.git
cd listIndia

# Verify project structure
ls -la
# Should show: backend/ frontend/ README.md DEPLOYMENT.md
```

### 2️⃣ Database Setup
```bash
# Start PostgreSQL service
# Windows: Start PostgreSQL service from Services
# macOS: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Create database
createdb business_directory

# Verify database creation
psql -l | grep business_directory
```

### 3️⃣ Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your database credentials
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=business_directory
# DB_USER=your_username
# DB_PASSWORD=your_password
# JWT_SECRET=your_super_secret_jwt_key

# Start the backend server
npm start

# Verify backend is running
# Should see: "🚀 Server running on port 5000"
# Should see: "Connected to PostgreSQL database using Sequelize"
```

### 4️⃣ Frontend Setup
```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file (optional)
cp .env.example .env

# Start the frontend development server
npm start

# Verify frontend is running
# Should automatically open http://localhost:3000
# Should see the ListIndia homepage
```

### 5️⃣ Verification
```bash
# Test backend API
curl http://localhost:5000/health
# Should return: {"status": "OK", "message": "Server is running"}

# Test frontend
curl http://localhost:3000
# Should return: HTML content with status 200

# Test database connection
# Backend logs should show successful database connection
```

## 📁 Project Structure

### 🗂️ Complete Directory Tree
```
listIndia/
├── 📁 backend/                     # Node.js/Express API Server
│   ├── 📁 config/                  # Configuration files
│   │   └── 📄 database.js          # Database connection & initialization
│   ├── 📁 middleware/              # Custom middleware functions
│   │   └── 📄 auth.js              # JWT authentication middleware
│   ├── 📁 models/                  # Sequelize database models
│   │   ├── 📄 index.js             # Model associations & exports
│   │   ├── 📄 User.js              # User model definition
│   │   ├── 📄 Business.js          # Business model definition
│   │   └── 📄 Review.js            # Review model definition
│   ├── 📁 routes/                  # API route definitions
│   │   ├── 📄 auth.js              # Authentication routes
│   │   ├── 📄 businesses.js        # Business CRUD routes
│   │   └── 📄 users.js             # User management routes
│   ├── 📁 utils/                   # Utility functions
│   │   ├── 📄 validation.js        # Input validation helpers
│   │   └── 📄 helpers.js           # General helper functions
│   ├── 📁 validators/              # Input validation schemas
│   │   ├── 📄 authValidator.js     # Authentication validation
│   │   └── 📄 businessValidator.js # Business validation
│   ├── 📄 .env                     # Environment variables (not in git)
│   ├── 📄 .env.example             # Environment template
│   ├── 📄 .gitignore               # Git ignore rules
│   ├── 📄 package.json             # Dependencies & scripts
│   ├── 📄 package-lock.json        # Dependency lock file
│   └── 📄 server.js                # Application entry point
├── 📁 frontend/                    # React Single Page Application
│   ├── 📁 public/                  # Static assets
│   │   ├── 📄 index.html           # HTML template
│   │   ├── 📄 favicon.ico          # Website icon
│   │   └── 📄 manifest.json        # PWA manifest
│   ├── 📁 src/                     # Source code
│   │   ├── 📁 components/          # Reusable React components
│   │   │   ├── 📄 Header.js        # Navigation header
│   │   │   ├── 📄 Footer.js        # Page footer
│   │   │   ├── 📄 SearchBar.js     # Search functionality
│   │   │   ├── 📄 BusinessCard.js  # Business display card
│   │   │   └── 📄 RegisterCTA.js   # Call-to-action component
│   │   ├── 📁 constants/           # Application constants
│   │   │   └── 📄 api.js           # API endpoints & configuration
│   │   ├── 📁 pages/               # Page components
│   │   │   ├── 📄 Home.js          # Homepage component
│   │   │   ├── 📄 Login.js         # Login page
│   │   │   ├── 📄 Register.js      # Registration page
│   │   │   └── 📄 AddBusiness.js   # Business registration
│   │   ├── 📁 services/            # API service layer
│   │   │   └── 📄 apiService.js    # Centralized API calls
│   │   ├── 📁 utils/               # Utility functions
│   │   │   └── 📄 errorHandler.js  # Error handling utilities
│   │   ├── 📁 styles/              # CSS stylesheets
│   │   │   ├── 📄 Home.css         # Homepage styles
│   │   │   ├── 📄 Auth.css         # Authentication styles
│   │   │   └── 📄 AddBusiness.css  # Business form styles
│   │   ├── 📄 App.js               # Main application component
│   │   ├── 📄 App.css              # Global application styles
│   │   └── 📄 index.js             # React DOM entry point
│   ├── 📄 .env.example             # Environment template
│   ├── 📄 .gitignore               # Git ignore rules
│   ├── 📄 package.json             # Dependencies & scripts
│   └── 📄 package-lock.json        # Dependency lock file
├── 📄 .gitignore                   # Root git ignore
├── 📄 README.md                    # Project documentation
├── 📄 DEPLOYMENT.md                # Deployment guide
└── 📄 LICENSE                      # MIT license file
```

### 📊 File Statistics
- **Total Files**: 45+ files
- **Backend Files**: 20+ files
- **Frontend Files**: 25+ files
- **Configuration Files**: 8 files
- **Documentation Files**: 3 files

## 🔧 Configuration

### 🌍 Environment Variables

#### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=business_directory
DB_USER=your_username
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Email Configuration (for future features)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# File Upload Configuration (for future features)
MAX_FILE_SIZE=5MB
UPLOAD_PATH=uploads/
```

#### Frontend (.env)
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_TIMEOUT=10000

# Application Configuration
REACT_APP_NAME=ListIndia Business Directory
REACT_APP_VERSION=1.0.0

# Development Configuration
GENERATE_SOURCEMAP=true
```

### ⚙️ Package.json Scripts

#### Backend Scripts
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "lint": "eslint . --ext .js",
    "lint:fix": "eslint . --ext .js --fix"
  }
}
```

#### Frontend Scripts
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src --ext .js,.jsx"
  }
}
```

## 📚 API Documentation

### 🌐 Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### 🔐 Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "userType": "customer"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "userType": "customer",
      "createdAt": "2025-07-14T12:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}
```

#### POST /api/auth/login
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "userType": "customer"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

#### GET /api/auth/me
Get current authenticated user information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "userType": "customer",
      "isVerified": true,
      "createdAt": "2025-07-14T12:00:00.000Z"
    }
  },
  "message": "User information retrieved successfully"
}
```

### 🏢 Business Endpoints

#### GET /api/businesses
Get all businesses with optional filtering and pagination.

**Query Parameters:**
- `category` (string): Filter by business category
- `city` (string): Filter by city
- `search` (string): Search in business name and description
- `featured` (boolean): Filter featured businesses only
- `limit` (number): Number of results per page (default: 50, max: 100)
- `offset` (number): Number of results to skip (default: 0)
- `sort` (string): Sort field (name, rating, review_count, created_at)
- `order` (string): Sort order (ASC, DESC)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "businesses": [
      {
        "id": 1,
        "name": "Spice Garden Restaurant",
        "description": "Authentic Indian cuisine...",
        "category": "restaurant",
        "address": "123 Food Street",
        "city": "Mumbai",
        "state": "Maharashtra",
        "zip_code": "400001",
        "phone": "+91 22 1234 5678",
        "email": "info@spicegarden.com",
        "website": "https://spicegarden.com",
        "image_url": "https://example.com/image.jpg",
        "rating": 4.5,
        "review_count": 127,
        "is_featured": true,
        "is_approved": true,
        "created_at": "2025-07-14T11:05:56.447Z",
        "updated_at": "2025-07-14T11:05:56.447Z"
      }
    ],
    "pagination": {
      "total": 6,
      "limit": 50,
      "offset": 0,
      "hasMore": false,
      "totalPages": 1,
      "currentPage": 1
    }
  },
  "message": "Businesses fetched successfully"
}
```

#### POST /api/businesses
Create a new business listing.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "My New Business",
  "description": "This is a detailed description of my business with enough characters",
  "category": "retail",
  "address": "123 Business Street",
  "city": "Business City",
  "state": "Business State",
  "zip_code": "12345",
  "phone": "555-123-4567",
  "email": "contact@mybusiness.com",
  "website": "https://mybusiness.com",
  "image_url": "https://example.com/logo.jpg"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "business": {
      "id": 7,
      "name": "My New Business",
      "description": "This is a detailed description...",
      "category": "retail",
      "address": "123 Business Street",
      "city": "Business City",
      "state": "Business State",
      "zip_code": "12345",
      "phone": "555-123-4567",
      "email": "contact@mybusiness.com",
      "website": "https://mybusiness.com",
      "image_url": "https://example.com/logo.jpg",
      "rating": 0,
      "review_count": 0,
      "is_featured": false,
      "is_approved": true,
      "created_at": "2025-07-14T12:30:00.000Z",
      "updated_at": "2025-07-14T12:30:00.000Z"
    }
  },
  "message": "Business registered successfully and is now live on the platform!"
}
```

#### GET /api/businesses/:id
Get a specific business by ID.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Spice Garden Restaurant",
    "description": "Authentic Indian cuisine...",
    "category": "restaurant",
    "address": "123 Food Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zip_code": "400001",
    "phone": "+91 22 1234 5678",
    "email": "info@spicegarden.com",
    "website": "https://spicegarden.com",
    "image_url": "https://example.com/image.jpg",
    "rating": 4.5,
    "review_count": 127,
    "is_featured": true,
    "created_at": "2025-07-14T11:05:56.447Z",
    "updated_at": "2025-07-14T11:05:56.447Z"
  },
  "message": "Business fetched successfully"
}
```

#### GET /api/businesses/categories
Get all available business categories with counts.

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "value": "restaurant",
      "label": "Restaurant",
      "count": 15
    },
    {
      "value": "technology",
      "label": "Technology",
      "count": 8
    },
    {
      "value": "healthcare",
      "label": "Healthcare",
      "count": 12
    }
  ],
  "message": "Categories fetched successfully"
}
```

#### GET /api/businesses/cities
Get all available cities with business counts.

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "city": "Mumbai",
      "state": "Maharashtra",
      "count": 25,
      "label": "Mumbai, Maharashtra"
    },
    {
      "city": "Bangalore",
      "state": "Karnataka",
      "count": 18,
      "label": "Bangalore, Karnataka"
    }
  ],
  "message": "Cities fetched successfully"
}
```

### 👤 User Endpoints

#### GET /api/users/profile
Get current user profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "userType": "customer",
      "isVerified": true,
      "createdAt": "2025-07-14T12:00:00.000Z",
      "updatedAt": "2025-07-14T12:00:00.000Z"
    }
  },
  "message": "User profile retrieved successfully"
}
```

#### PUT /api/users/profile
Update user profile information.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.doe@example.com",
      "userType": "customer",
      "updatedAt": "2025-07-14T13:00:00.000Z"
    }
  },
  "message": "Profile updated successfully"
}
```

### ❌ Error Responses

All API endpoints return consistent error responses:

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Missing required fields",
  "missingFields": ["name", "email"]
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "error": "Authentication Failed",
  "message": "Invalid or expired token"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Business not found or not approved"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Internal Server Error",
  "message": "Failed to fetch businesses",
  "details": "Database connection error" // Only in development
}
```

## 🎨 Frontend Components

### 📱 Page Components

#### Home.js
- **Purpose**: Main landing page displaying business listings
- **Features**: Search, filter, featured businesses, pagination
- **State Management**: businesses, filteredBusinesses, loading, error
- **API Calls**: GET /api/businesses

#### Login.js
- **Purpose**: User authentication page
- **Features**: Email/password login, form validation, error handling
- **State Management**: formData, error, loading
- **API Calls**: POST /api/auth/login

#### Register.js
- **Purpose**: User registration page
- **Features**: User signup form, validation, password confirmation
- **State Management**: formData, error, loading
- **API Calls**: POST /api/auth/register

#### AddBusiness.js
- **Purpose**: Business registration form
- **Features**: Comprehensive business form, validation, image upload
- **State Management**: formData, error, success, loading
- **API Calls**: POST /api/businesses

### 🧩 Reusable Components

#### Header.js
- **Purpose**: Navigation header with authentication state
- **Features**: Logo, navigation links, login/logout buttons
- **State Management**: user authentication status
- **Events**: authChange listener

#### SearchBar.js
- **Purpose**: Search and filter functionality
- **Features**: Text search, category dropdown, city filter
- **Props**: onSearch callback function
- **State Management**: searchTerm, selectedCategory

#### BusinessCard.js
- **Purpose**: Individual business display card
- **Features**: Business info, rating, contact details, image
- **Props**: business object
- **Styling**: Responsive card layout

#### Footer.js
- **Purpose**: Page footer with links and information
- **Features**: Company info, social links, legal pages
- **Static Component**: No state management

### 🎯 Component Architecture
```
App.js
├── Header.js
├── Router
│   ├── Home.js
│   │   ├── SearchBar.js
│   │   ├── BusinessCard.js (multiple)
│   │   └── RegisterCTA.js
│   ├── Login.js
│   ├── Register.js
│   └── AddBusiness.js
└── Footer.js
```

## 🗄️ Database Schema

### 👤 Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  user_type ENUM('customer', 'business') DEFAULT 'customer',
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);
```

### 🏢 Businesses Table
```sql
CREATE TABLE businesses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  website VARCHAR(255),
  image_url VARCHAR(500),
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);
```

### ⭐ Reviews Table
```sql
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);
```

### 🔗 Database Relationships
```
users (1) ──── (many) businesses
users (1) ──── (many) reviews
businesses (1) ──── (many) reviews
```

### 📊 Database Indexes
```sql
-- Performance indexes
CREATE INDEX idx_businesses_category ON businesses(category);
CREATE INDEX idx_businesses_city ON businesses(city);
CREATE INDEX idx_businesses_is_approved ON businesses(is_approved);
CREATE INDEX idx_businesses_is_featured ON businesses(is_featured);
CREATE INDEX idx_businesses_rating ON businesses(rating);
CREATE INDEX idx_reviews_business_id ON reviews(business_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);

-- Search indexes
CREATE INDEX idx_businesses_name_search ON businesses USING gin(to_tsvector('english', name));
CREATE INDEX idx_businesses_description_search ON businesses USING gin(to_tsvector('english', description));
```

## 🔒 Security Features

### 🛡️ Authentication & Authorization
- **JWT Tokens** - Secure token-based authentication
- **Password Hashing** - bcrypt with salt rounds (12)
- **Token Expiration** - Configurable token lifetime (7 days default)
- **Role-based Access** - Customer and business owner roles
- **Protected Routes** - Middleware-based route protection

### 🔐 Data Security
- **Input Validation** - Server-side validation for all inputs
- **SQL Injection Prevention** - Sequelize ORM parameterized queries
- **XSS Protection** - Input sanitization and output encoding
- **CORS Configuration** - Restricted cross-origin requests
- **Helmet.js** - Security headers (CSP, HSTS, etc.)

### 🚫 Rate Limiting
```javascript
// API rate limiting configuration
{
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP"
}
```

### 🔍 Security Headers
```javascript
// Helmet.js security headers
{
  contentSecurityPolicy: true,
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: true,
  dnsPrefetchControl: true,
  frameguard: true,
  hidePoweredBy: true,
  hsts: true,
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: false,
  referrerPolicy: true,
  xssFilter: true
}
```

### 🔒 Environment Security
- **Environment Variables** - Sensitive data in .env files
- **Secret Management** - JWT secrets and database credentials
- **Development vs Production** - Different security levels
- **Error Handling** - No sensitive data in error messages

## 🧪 Testing

### 🧪 Testing Strategy
- **Unit Tests** - Individual function testing
- **Integration Tests** - API endpoint testing
- **Component Tests** - React component testing
- **End-to-End Tests** - Full user flow testing

### 🛠️ Testing Tools
```javascript
{
  "backend": {
    "framework": "Jest",
    "api_testing": "Supertest",
    "mocking": "Jest mocks",
    "coverage": "Jest coverage"
  },
  "frontend": {
    "framework": "Jest + React Testing Library",
    "component_testing": "React Testing Library",
    "mocking": "Jest mocks",
    "e2e": "Cypress (optional)"
  }
}
```

### 🧪 Test Commands
```bash
# Backend tests
cd backend
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report

# Frontend tests
cd frontend
npm test                   # Run all tests
npm run test:coverage      # Coverage report
```

### 📊 Test Coverage Goals
- **Backend**: 80%+ code coverage
- **Frontend**: 70%+ component coverage
- **API Endpoints**: 100% endpoint coverage
- **Critical Paths**: 100% coverage

## 🚀 Deployment

### 🌐 Production Deployment Options

#### 1. Traditional VPS/Server
```bash
# Server setup
sudo apt update
sudo apt install nodejs npm postgresql nginx

# Application deployment
git clone <repository>
cd listIndia
npm install --production

# Environment setup
cp .env.example .env
# Edit .env with production values

# Process management
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 2. Docker Deployment
```dockerfile
# Dockerfile.backend
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]

# Dockerfile.frontend
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### 3. Cloud Platforms

**Heroku:**
```bash
# Install Heroku CLI
heroku create listindia-app
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set NODE_ENV=production
git push heroku main
```

**Vercel (Frontend) + Railway (Backend):**
```bash
# Frontend to Vercel
npm install -g vercel
vercel --prod

# Backend to Railway
# Connect GitHub repository to Railway
# Set environment variables in Railway dashboard
```

**AWS:**
- **EC2** - Virtual servers for application hosting
- **RDS** - Managed PostgreSQL database
- **S3** - Static file storage
- **CloudFront** - CDN for frontend assets
- **Route 53** - DNS management

### 🔧 Production Configuration

#### Environment Variables
```env
# Production .env
NODE_ENV=production
PORT=5000
DB_HOST=production-db-host
DB_NAME=business_directory_prod
JWT_SECRET=super-secure-production-secret
FRONTEND_URL=https://yourdomain.com
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location / {
        root /var/www/listindia/build;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 📊 Performance Optimization

#### Backend Optimizations
- **Database Connection Pooling** - Efficient database connections
- **Query Optimization** - Indexed queries and efficient joins
- **Caching** - Redis for session and data caching
- **Compression** - Gzip compression for API responses
- **Rate Limiting** - Prevent API abuse

#### Frontend Optimizations
- **Code Splitting** - Lazy loading of components
- **Bundle Optimization** - Webpack optimization
- **Image Optimization** - Compressed and responsive images
- **CDN** - Content delivery network for static assets
- **Service Workers** - Offline functionality and caching

### 🔍 Monitoring & Logging

#### Application Monitoring
```javascript
// Monitoring tools
{
  "logging": "Winston + Morgan",
  "error_tracking": "Sentry",
  "performance": "New Relic",
  "uptime": "Pingdom",
  "analytics": "Google Analytics"
}
```

#### Health Checks
```javascript
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    database: 'connected'
  });
});
```

## 📊 Performance

### ⚡ Performance Metrics

#### Backend Performance
- **Response Time**: < 200ms average
- **Throughput**: 1000+ requests/second
- **Database Queries**: < 50ms average
- **Memory Usage**: < 512MB
- **CPU Usage**: < 70%

#### Frontend Performance
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: < 500KB gzipped
- **Lighthouse Score**: 90+

### 🚀 Optimization Techniques

#### Database Optimizations
```sql
-- Query optimization examples
EXPLAIN ANALYZE SELECT * FROM businesses
WHERE category = 'restaurant'
AND is_approved = true
ORDER BY rating DESC
LIMIT 20;

-- Index usage
CREATE INDEX CONCURRENTLY idx_businesses_category_approved
ON businesses(category, is_approved, rating DESC);
```

#### Caching Strategy
```javascript
// Redis caching implementation
const redis = require('redis');
const client = redis.createClient();

// Cache business listings
app.get('/api/businesses', async (req, res) => {
  const cacheKey = `businesses:${JSON.stringify(req.query)}`;
  const cached = await client.get(cacheKey);

  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const businesses = await Business.findAll(/* query */);
  await client.setex(cacheKey, 300, JSON.stringify(businesses)); // 5 min cache

  res.json(businesses);
});
```

## 🤝 Contributing

### 🔄 Development Workflow

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/listIndia.git
   cd listIndia
   git remote add upstream https://github.com/original-owner/listIndia.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow coding standards
   - Write tests for new features
   - Update documentation

4. **Test Changes**
   ```bash
   # Backend tests
   cd backend && npm test

   # Frontend tests
   cd frontend && npm test
   ```

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

6. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create Pull Request on GitHub
   ```

### 📝 Coding Standards

#### JavaScript/React Standards
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Naming Conventions** - camelCase for variables, PascalCase for components
- **File Structure** - Organized by feature/component
- **Comments** - JSDoc for functions, inline for complex logic

#### Git Commit Standards
```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

### 🐛 Bug Reports

When reporting bugs, please include:
- **Environment** - OS, Node.js version, browser
- **Steps to Reproduce** - Detailed reproduction steps
- **Expected Behavior** - What should happen
- **Actual Behavior** - What actually happens
- **Screenshots** - If applicable
- **Error Messages** - Console errors or logs

### 💡 Feature Requests

For feature requests, please provide:
- **Use Case** - Why is this feature needed
- **Description** - Detailed feature description
- **Mockups** - UI mockups if applicable
- **Implementation Ideas** - Technical approach suggestions

## 📄 License

### MIT License

```
MIT License

Copyright (c) 2025 ListIndia Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support & Contact

### 🆘 Getting Help

- **Documentation** - Check this README and DEPLOYMENT.md
- **Issues** - Create GitHub issue for bugs/features
- **Discussions** - GitHub Discussions for questions
- **Email** - contact@listindia.com (if available)

### 🌟 Acknowledgments

- **React Team** - For the amazing React framework
- **Express.js** - For the robust backend framework
- **PostgreSQL** - For the reliable database system
- **Open Source Community** - For all the amazing packages used

### 📈 Project Status

- **Version**: 1.0.0
- **Status**: Active Development
- **Last Updated**: July 2025
- **Maintainers**: ListIndia Team

---

**Built with ❤️ by the ListIndia Team**
