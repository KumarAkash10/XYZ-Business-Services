# Business Directory API - Industry Standard MVC Architecture

A professional-grade REST API built with Node.js, Express.js, and PostgreSQL following industry best practices and MVC architecture pattern.

## 🏗️ Architecture Overview

This API follows the **Model-View-Controller (MVC)** pattern with clear separation of concerns:

```
backend/
├── config/          # Database and application configuration
├── controllers/     # Business logic and request handling
├── middleware/      # Custom middleware (auth, validation, etc.)
├── models/          # Sequelize ORM models and database schema
├── routes/          # API route definitions
├── services/        # Business logic and data processing
├── utils/           # Utility functions and helpers
├── validators/      # Input validation schemas
└── logs/           # Application logs (auto-generated)
```

## 🚀 Features

### Core Features
- **RESTful API Design** - Clean, predictable endpoints
- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - User, Business Owner, Admin roles
- **Input Validation** - Comprehensive request validation
- **Error Handling** - Centralized error management
- **Rate Limiting** - API abuse prevention
- **Request Logging** - Detailed request/response logging
- **Security Headers** - Helmet.js security middleware
- **CORS Protection** - Cross-origin request handling
- **Data Compression** - Response compression for performance

### Database Features
- **PostgreSQL with Sequelize ORM** - Type-safe database operations
- **Model Associations** - Proper foreign key relationships
- **Data Validation** - Model-level validation rules
- **Connection Pooling** - Optimized database connections
- **Migration Support** - Database schema versioning

### Enterprise Features
- **Health Monitoring** - System health endpoints
- **Graceful Shutdown** - Proper process termination
- **Environment Configuration** - Multi-environment support
- **API Documentation** - Self-documenting endpoints
- **Audit Logging** - User action tracking
- **Performance Monitoring** - Request timing and metrics

## 📋 API Endpoints

### Authentication (`/api/auth`)
```
POST   /register           # User registration
POST   /login              # User login
GET    /me                 # Get current user
POST   /change-password    # Change password
POST   /forgot-password    # Password reset request
POST   /reset-password     # Password reset
POST   /refresh-token      # Refresh JWT token
POST   /logout             # User logout
```

### Businesses (`/api/businesses`)
```
GET    /                   # List businesses (with filters)
GET    /:id                # Get business by ID
POST   /                   # Create new business
PUT    /:id                # Update business
DELETE /:id                # Delete business
GET    /categories         # Get business categories
GET    /cities             # Get business cities
GET    /featured           # Get featured businesses
```

### Users (`/api/users`)
```
GET    /profile            # Get user profile
PUT    /profile            # Update user profile
GET    /businesses         # Get user's businesses
GET    /reviews            # Get user's reviews
GET    /dashboard          # Get user dashboard data
PUT    /preferences        # Update user preferences
DELETE /account            # Delete user account
```

### Reviews (`/api/reviews`)
```
POST   /                   # Create review
GET    /:id                # Get review by ID
PUT    /:id                # Update review
DELETE /:id                # Delete review
GET    /business/:id       # Get business reviews
GET    /business/:id/stats # Get review statistics
GET    /user/my-reviews    # Get current user's reviews
POST   /:id/report         # Report a review
POST   /:id/like           # Like/unlike review
```

### System (`/health`, `/api`)
```
GET    /health             # Basic health check
GET    /api/health/detailed # Detailed system health
GET    /api                # API documentation
GET    /                   # Welcome message
```

## 🛠️ Technology Stack

### Backend Framework
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Sequelize** - PostgreSQL ORM

### Database
- **PostgreSQL** - Primary database
- **pgAdmin** - Database administration tool

### Security & Validation
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Helmet.js** - Security headers
- **express-validator** - Input validation
- **express-rate-limit** - Rate limiting

### Development Tools
- **nodemon** - Development server
- **morgan** - HTTP request logger
- **compression** - Response compression
- **cors** - Cross-origin resource sharing

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- pgAdmin (optional, for database management)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the backend directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=business_directory
DB_USER=postgres
DB_PASSWORD=your_password_here

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
```

### 3. Database Setup
1. Create PostgreSQL database:
```sql
CREATE DATABASE business_directory;
```

2. The application will automatically:
   - Create all necessary tables
   - Set up relationships and indexes
   - Insert sample data

### 4. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📊 Database Schema

### Users Table
- `id` (Primary Key)
- `first_name`, `last_name`
- `email` (Unique)
- `password_hash`
- `user_type` (customer, business, admin)
- `is_verified`
- `created_at`, `updated_at`

### Businesses Table
- `id` (Primary Key)
- `name`, `description`, `category`
- `address`, `city`, `state`, `zip_code`
- `phone`, `email`, `website`, `image_url`
- `rating`, `review_count`
- `is_featured`, `is_approved`
- `owner_id` (Foreign Key → Users)
- `created_at`, `updated_at`

### Reviews Table
- `id` (Primary Key)
- `business_id` (Foreign Key → Businesses)
- `user_id` (Foreign Key → Users)
- `rating` (1-5)
- `comment`
- `created_at`, `updated_at`

## 🔒 Security Features

### Authentication & Authorization
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Token expiration and refresh

### Input Validation
- Request body validation
- SQL injection prevention
- XSS protection
- CSRF protection

### Rate Limiting
- General API: 100 requests/15 minutes
- Authentication: 5 requests/15 minutes
- Business creation: 3 requests/hour
- Search: 30 requests/minute

### Security Headers
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy
- And more via Helmet.js

## 📝 Logging & Monitoring

### Application Logs
- Request/response logging
- Error tracking
- Performance metrics
- User action auditing

### Health Monitoring
- Database connection status
- System resource usage
- API response times
- Error rates

## 🧪 Testing

### API Testing
Use tools like Postman, Insomnia, or curl to test endpoints:

```bash
# Health check
curl http://localhost:5000/health

# Get API documentation
curl http://localhost:5000/api

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"SecurePass123!"}'
```

## 🚀 Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Configure production database
3. Set secure JWT secret
4. Enable HTTPS
5. Configure reverse proxy (nginx)

### Production Considerations
- Use PM2 for process management
- Set up database backups
- Configure log rotation
- Monitor system resources
- Set up SSL certificates

## 📚 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5,
    "hasMore": true
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🤝 Contributing

1. Follow the established MVC pattern
2. Add proper validation for new endpoints
3. Include error handling
4. Update documentation
5. Test thoroughly before submitting

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using industry-standard practices and modern Node.js technologies.**
