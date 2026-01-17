# Media Actions - Complete Functionality Documentation

## Project Overview
Media Actions is a comprehensive media marketplace platform that allows users to upload, browse, and purchase digital media content (images). The project consists of:
- **Web Application**: Node.js/Express backend with EJS templating
- **Android Application**: Native Android mobile app
- **API**: RESTful API for mobile/third-party integration

---

## 1. USER AUTHENTICATION & AUTHORIZATION

### 1.1 Local Authentication
- **User Registration**
  - Create account with email, username, and password
  - Password encryption using AES256 cipher (reversed password as cipher key)
  - Password confirmation validation
  - Form validation for all required fields
  - Automatic login after successful registration
  - Routes: `GET /register`, `POST /register`

- **User Login**
  - Username and password authentication
  - Session management with Express sessions
  - Password verification using AES256 decryption
  - Passport.js Local Strategy implementation
  - Routes: `GET /login`, `POST /login`

- **User Logout**
  - Session termination
  - Redirect to home page
  - Route: `GET /logout`

### 1.2 OAuth2 Authentication
- **Google OAuth2 Integration**
  - Sign in with Google account
  - Automatic user profile creation from Google data
  - OAuth2 callback handling
  - Google user data storage (profile information)
  - Client ID: `276874932016-c92hlcs1csbs06vsim60gslhbjb2duv2.apps.googleusercontent.com`
  - Routes: `GET /auth/google`, `GET /auth/google/callback`

### 1.3 Session Management
- Express session with cookie-based authentication
- Session secret: "keyboard cat"
- Persistent sessions across requests
- User data serialization/deserialization

---

## 2. IMAGE UPLOAD & MANAGEMENT SYSTEM

### 2.1 Web Upload Interface
- **Hub Upload Page** (`/hub`)
  - Protected route (requires authentication)
  - Multi-file upload support using Multer
  - Upload destination: `public/uploads/`
  - File metadata capture:
    - Original filename
    - MIME type
    - File size
    - Upload destination
    - Generated filename
    - Upload timestamp
  
- **Image Information Fields**
  - Visible name (display name for users)
  - Description (optional)
  - Price (in euros)
  - Automatic path generation: `/uploads/{filename}`

### 2.2 API Upload Endpoint
- **Endpoint**: `POST /api/upload`
  - Accepts multipart form data
  - Returns file information in JSON format
  - Error handling with 400 status codes
  - Mobile-compatible upload interface

- **Image Data Storage**: `POST /api/imgData`
  - Stores complete image metadata in MongoDB
  - Associates upload information with user-provided details
  - JSON response with success/error status

### 2.3 Storage & Database
- **MongoDB Storage** (mLab hosted)
  - Database: `db_media_actions`
  - Connection: `mongodb://admin:admin@ds239117.mlab.com:39117/db_media_actions`
  - Collection: `hubs`
  - Schema fields:
    - originalname (String)
    - mimetype (String)
    - destination (String)
    - filename (String)
    - path (String)
    - size (String)
    - date (Date)
    - visibleName (String)
    - description (String)
    - price (Number)

---

## 3. GALLERY & IMAGE BROWSING

### 3.1 Web Gallery
- **Gallery Page** (`GET /gallery`)
  - Protected route (requires login)
  - Displays all uploaded images in grid format
  - Image information shown:
    - Image thumbnail
    - Visible name
    - Description (or "DESCRIPTION" placeholder)
    - Price in euros
  - Responsive image display (300px max height)
  - EJS template rendering with dynamic data

### 3.2 Image Details
- **Image Details Page** (`POST /details`)
  - Individual image information view
  - Displays full image details
  - Shows Stripe payment button
  - Retrieves price from database
  - Passes Stripe publishable key to view

### 3.3 API Gallery Endpoint
- **Endpoint**: `GET /api/gallery`
  - Returns all images in JSON format
  - Mobile/API-friendly response structure
  - Fields returned:
    - Path (relative URL to image)
    - Name (visible name)
    - Description
    - Price
  - Null descriptions converted to "null" string

---

## 4. PAYMENT PROCESSING (STRIPE INTEGRATION)

### 4.1 Stripe Configuration
- **Test Environment**
  - Publishable Key: `pk_test_ZJLG415DZJo8y12cI829uctz`
  - Secret Key: `sk_test_VUqtqxDUiVKKvNjw4nKX0vqf`
  - Currency: EUR (Euros)

### 4.2 Payment Flow
- **Payment Page** (`GET /stripe`)
  - Protected route (requires authentication)
  - Displays Stripe checkout form
  - Shows amount to be charged
  - Stripe Elements integration
  
- **Payment Processing** (`POST /stripe/charge`)
  - Creates Stripe customer from email and token
  - Processes payment charge
  - Handles payment amount from request
  - Customer metadata:
    - Customer name: "Pangolin"
    - Customer ID: "adqfg56nk98dsd"
  - Success redirect to charge confirmation page
  - Error handling for failed payments

### 4.3 Payment Confirmation
- **Charge Success Page**
  - Displays payment confirmation
  - Shows transaction details
  - User-friendly success message

### 4.4 Purchase Records
- **Purchases Model**
  - MongoDB collection for purchase history
  - Schema: originalname field
  - (Currently minimal implementation)

---

## 5. CONTACT SYSTEM

### 5.1 Contact Form
- **Contact Page** (`GET /contact`)
  - Public contact form
  - Fields:
    - Name
    - Email address
    - Message (max 1337 characters)
  - Email validation using regex
  - Message length validation

### 5.2 Email Sending
- **Email Configuration**
  - SMTP server: `mail.media-actions.eu`
  - Port: 587 (STARTTLS)
  - Credentials:
    - User: `contact@media-actions.eu`
    - Password: `contact`
  - Uses Nodemailer for email delivery

- **Contact Form Submission** (`POST /contact`)
  - Validates email format
  - Validates message length (≤1337 characters)
  - Sends email to: `contact@media-actions.eu`
  - Email format:
    - From: Sender name and email
    - Subject: "Formulaire de contact - Media Actions"
    - Body: Sender details and message
  - Response handling:
    - Success: "ok" status
    - Error: "error" status
    - Message too large: "tooLarge" status

---

## 6. USER PROFILE MANAGEMENT

### 6.1 Profile Page
- **Profile View** (`GET /profil`)
  - Protected route
  - Displays user information
  - Shows user data from database
  - EJS template rendering

### 6.2 User Data Model
- **User Schema** (MongoDB)
  - email (String, unique)
  - username (String, unique)
  - password (String, encrypted)
  - provider (String: 'local', 'google', 'local-android')
  - google (Object: Google OAuth data)

- **Password Management**
  - Encryption: AES256
  - Cipher key: reversed password string
  - Password validation method: `validPassword()`
  - Passport-local-mongoose plugin integration

---

## 7. API ENDPOINTS (Mobile/Third-Party Integration)

### 7.1 Authentication API
- **Login** (`POST /api/login`)
  - Accepts username and password
  - Returns user object in JSON
  - Session creation
  - Passport authentication

- **Register** (`POST /api/register`)
  - Accepts email, username, password, passwordConf
  - Password matching validation
  - User creation with 'local-android' provider
  - AES256 password encryption
  - Returns success message and user object
  - Error responses:
    - 401: Password mismatch
    - 401: Empty fields
    - 401: Registration errors

### 7.2 Image Management API
- **Upload Image** (`POST /api/upload`)
  - Multipart file upload
  - Returns file metadata JSON
  - Error handling with 400 status

- **Store Image Data** (`POST /api/imgData`)
  - Accepts JSON image data
  - Fields: file, name, description, price
  - Creates Hub document in MongoDB
  - Returns "OK" or error response

- **Get Gallery** (`GET /api/gallery`)
  - Returns all images array
  - JSON response with image objects
  - Fields: Path, Name, Description, Price

---

## 8. ANDROID APPLICATION

### 8.1 Basic Structure
- **Package**: `com.mediaactions.ma_androidapp`
- **Main Activity**: `MainActivity.java`
  - Extends `AppCompatActivity`
  - Basic launcher activity setup
  - Content view: `R.layout.activity_main`

### 8.2 Application Configuration
- **App Name**: "Media Actions"
- **Package**: `com.mediaactions.ma_androidapp`
- **Features**:
  - Launcher icon
  - Round icon support
  - RTL (Right-to-Left) support enabled
  - Material design theme

### 8.3 Intended API Integration
- Designed to consume REST API endpoints
- Authentication through `/api/login` and `/api/register`
- Image upload through `/api/upload`
- Gallery browsing through `/api/gallery`

---

## 9. GOOGLE CLOUD VISION API INTEGRATION

### 9.1 Configuration
- **Dependency**: `@google-cloud/vision` v0.15.2
- Installed but not actively implemented in current codebase
- Potential for future image analysis features:
  - Label detection
  - Text recognition (OCR)
  - Face detection
  - Landmark detection
  - Logo detection
  - Safe search detection

---

## 10. TECHNICAL INFRASTRUCTURE

### 10.1 Backend Stack
- **Framework**: Express.js v4.15.5
- **Template Engine**: EJS v2.5.7
- **Database**: MongoDB v5.0.1 (Mongoose ODM)
- **Authentication**: 
  - Passport.js v0.4.0
  - passport-local v1.0.0
  - passport-local-mongoose v5.0.0
  - passport-google-oauth2 v0.1.6
- **File Upload**: Multer v1.3.0
- **Session Management**: express-session v1.15.6

### 10.2 Security & Encryption
- **Password Encryption**: aes256 v1.0.3
- **Cookie Parsing**: cookie-parser v1.4.3
- **CSRF Protection**: Not explicitly implemented
- **Input Validation**: express-validator v4.3.0

### 10.3 Payment Processing
- **Stripe SDK**: v5.5.0
- Test mode configuration
- EUR currency support

### 10.4 Communication
- **Email**: Nodemailer v4.6.3
- **HTTP Parsing**: body-parser v1.18.2
- **Request Logging**: Morgan v1.9.0

### 10.5 Utilities
- **Date/Time**: Moment.js v2.20.1
- **Async Operations**: Async v2.6.0
- **UI Framework**: Semantic UI

### 10.6 Development Tools
- **Dev Server**: Nodemon v1.14.11
- **Scripts**:
  - `npm start`: Production server (node ./bin/www)
  - `npm run devstart`: Development server (nodemon ./bin/www)

### 10.7 Server Configuration
- **Port**: 4567
- **Static Files**: `/public` directory
- **Uploads Directory**: `/public/uploads`
- **Body Parser Limits**:
  - Parameter limit: 100,000
  - Size limit: 50MB
  - URL encoding: extended

---

## 11. SECURITY CONSIDERATIONS

### 11.1 Current Security Issues
⚠️ **CRITICAL SECURITY VULNERABILITIES PRESENT IN CODE:**

1. **Exposed Credentials in Source Code**:
   - MongoDB credentials hardcoded
   - Stripe API keys in source
   - Email credentials in source
   - Google OAuth credentials in source

2. **Weak Password Encryption**:
   - Custom AES256 implementation
   - Cipher key derived from password itself
   - Not using industry-standard bcrypt/scrypt

3. **No HTTPS Enforcement**:
   - HTTP callback URLs for OAuth
   - No SSL/TLS configuration

4. **SQL/NoSQL Injection Risk**:
   - Limited input sanitization
   - Direct MongoDB queries without full validation

5. **Session Security**:
   - Weak session secret ("keyboard cat")
   - No secure cookie configuration

### 11.2 Recommendations
- Move all credentials to environment variables
- Implement bcrypt for password hashing
- Add HTTPS/SSL certificates
- Implement rate limiting
- Add CSRF protection
- Enhance input validation and sanitization
- Use secure session configuration
- Implement proper error handling without exposing internals

---

## 12. ROUTING STRUCTURE

### 12.1 Public Routes
- `GET /` - Home page
- `GET /login` - Login page
- `POST /login` - Login submission
- `GET /register` - Registration page
- `POST /register` - Registration submission
- `GET /contact` - Contact form
- `POST /contact` - Contact form submission

### 12.2 Protected Routes (Require Authentication)
- `GET /hub` - Image upload page
- `POST /hub` - Image upload processing
- `GET /gallery` - Image gallery
- `POST /details` - Image details
- `GET /stripe` - Payment page
- `POST /stripe/charge` - Payment processing
- `GET /profil` - User profile
- `GET /logout` - Logout

### 12.3 OAuth Routes
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - Google OAuth callback

### 12.4 API Routes
- `POST /api/login` - API login
- `POST /api/register` - API registration
- `POST /api/upload` - API file upload
- `POST /api/imgData` - API image metadata storage
- `GET /api/gallery` - API gallery listing

---

## 13. DATABASE SCHEMA

### 13.1 Users Collection
```javascript
{
  email: String (unique),
  username: String (unique),
  password: String (encrypted),
  provider: String ('local', 'google', 'local-android'),
  google: Object (OAuth profile data)
}
```

### 13.2 Hubs Collection (Images)
```javascript
{
  originalname: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: String,
  date: Date,
  visibleName: String,
  description: String,
  price: Number
}
```

### 13.3 Purchases Collection
```javascript
{
  originalname: String
}
```

---

## 14. USER INTERFACE VIEWS

### 14.1 Available Pages
1. **index.ejs** - Home page
2. **login.ejs** - Login page with local and Google OAuth
3. **register.ejs** - Registration form
4. **hub.ejs** - Image upload interface
5. **gallery.ejs** - Image gallery grid
6. **imageDetails.ejs** - Individual image view with purchase option
7. **stripe.ejs** - Stripe payment form
8. **charge.ejs** - Payment confirmation
9. **contact.ejs** - Contact form
10. **profil.ejs** - User profile page
11. **error.ejs** - Error page
12. **layout.ejs** - Main layout template
13. **footer.ejs** - Footer component

---

## 15. EXTERNAL SERVICE INTEGRATIONS

### 15.1 Database Service
- **mLab** (MongoDB hosting)
- Cloud-hosted MongoDB instance
- Remote database access

### 15.2 Payment Gateway
- **Stripe** payment processing
- Test environment configured
- Support for EUR currency

### 15.3 OAuth Provider
- **Google OAuth 2.0**
- Social authentication
- Profile data retrieval

### 15.4 Email Service
- **Custom SMTP server** (mail.media-actions.eu)
- Contact form email delivery

### 15.5 Planned Services
- **Google Cloud Vision API**
- Image analysis capabilities (not yet implemented)

---

## 16. PROJECT METADATA

### 16.1 Team Members
- Celenzo CRESPIN
- Guillaume DEMAY
- Antoine JAHAN
- Romain HEDOUIN
- Benjamin HENRY

### 16.2 Project Information
- **Name**: Media Actions
- **Version**: 0.0.1
- **Type**: Private project
- **Website**: http://eip.epitech.eu/2020/mediaactions/
- **Institution**: EPITECH (2020)

---

## 17. DEPLOYMENT & OPERATION

### 17.1 Server Startup
```bash
# Production
npm start

# Development (with auto-reload)
npm run devstart
```

### 17.2 Server Configuration
- **Port**: 4567
- **Environment**: Development/Production
- **Logging**: Morgan middleware (dev mode)

### 17.3 File Upload Configuration
- **Destination**: `public/uploads/`
- **Max File Size**: 50MB
- **Allowed Files**: All types (no restriction implemented)

---

## SUMMARY

**Media Actions** is a complete media marketplace platform with:
- ✅ User authentication (local + Google OAuth)
- ✅ Image upload and management
- ✅ Image gallery and browsing
- ✅ E-commerce functionality (Stripe payments)
- ✅ Contact system with email notifications
- ✅ RESTful API for mobile integration
- ✅ Android mobile application (basic structure)
- ✅ MongoDB database storage
- ⚠️ Security vulnerabilities that need addressing
- 🔄 Google Cloud Vision API (installed but not implemented)

The platform enables users to upload digital media content, set prices, and sell to other users through an integrated payment system, accessible via both web and mobile interfaces.
