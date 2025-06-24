# BookLoop Testing Database Setup Instructions

## Overview
This guide will help you set up a separate testing database for BookLoop to avoid affecting your production data during testing.

## Prerequisites
- Access to Supabase dashboard
- Your Supabase project URL: `https://yiempzwmwpwoxxghkwxe.supabase.co`

## Step 1: Access Your Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Sign in with your account
3. Select your project: `yiempzwmwpwoxxghkwxe`

## Step 2: Execute the Database Schema

1. In your Supabase dashboard, go to the **SQL Editor** tab
2. Click **New Query**
3. Copy the entire content from `backend/supabase-setup.sql`
4. Paste it into the SQL editor
5. Click **Run** to execute the script

This will create:
- All necessary tables matching your backend models
- Sample data for testing
- Indexes for performance
- Triggers for automatic timestamp updates
- Row Level Security (RLS) policies

## Step 3: Verify the Setup

1. Go to the **Table Editor** in your Supabase dashboard
2. You should see the following tables:
   - `users` (with 4 sample users)
   - `categories` (with 16 categories)
   - `books` (with 5 sample books)
   - `wishlist` (with 2 sample entries)
   - `reviews` (with 2 sample reviews)
   - `transactions` (empty, ready for testing)

## Step 4: Configure Your Backend Environment

1. Create a `.env` file in your backend directory:
   ```bash
   cd backend
   touch .env
   ```

2. Add the following content to your `.env` file:
   ```env
   # BookLoop Environment Variables
   # Configuración unificada para desarrollo y testing

   # ========================================
   # CONFIGURACIÓN DE SUPABASE
   # ========================================
   SUPABASE_URL=https://yiempzwmwpwoxxghkwxe.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpZW1wendtd3B3b3h4Z2hrd3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MjY2MTQsImV4cCI6MjA2NjMwMjYxNH0.w6y-8Eoe6TwIaS1_IoVsJv46AqltOWIAaByOptRpL-c
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpZW1wendtd3B3b3h4Z2hrd3hlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDcyNjYxNCwiZXhwIjoyMDY2MzAyNjE0fQ.2H3Z8gUT9I5g0226TJjcqBJDj_dk84ywTOonqNc7SE8

   # ========================================
   # CONFIGURACIÓN DEL SERVIDOR
   # ========================================
   PORT=5000
   NODE_ENV=development

   # ========================================
   # CONFIGURACIÓN DE JWT
   # ========================================
   JWT_SECRET=bookloop-jwt-secret-key-2024-secure-and-unique
   JWT_EXPIRES_IN=24h

   # ========================================
   # CONFIGURACIÓN DE EMAIL
   # ========================================
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=tu-email@gmail.com
   EMAIL_PASSWORD=tu-password-de-aplicacion

   # ========================================
   # CONFIGURACIÓN DE ARCHIVOS
   # ========================================
   UPLOAD_PATH=./uploads
   MAX_FILE_SIZE=5242880

   # ========================================
   # CONFIGURACIÓN DE CORS
   # ========================================
   CORS_ORIGIN=http://localhost:3000

   # ========================================
   # CONFIGURACIÓN DE GOOGLE BOOKS API
   # ========================================
   GOOGLE_BOOKS_API_KEY=tu-google-books-api-key
   ```

3. Update the values in your `.env` file:
   - Replace `tu-email@gmail.com` and `tu-password-de-aplicacion` with your email credentials
   - Replace `tu-google-books-api-key` with your Google Books API key (if you have one)
   - Change `JWT_SECRET` to a secure random string

## Step 5: Test the Connection

1. Install dependencies if not already done:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Test the connection by making a request to:
   ```
   GET http://localhost:5000/api/books
   ```

## Database Structure

### Tables Created (matching your backend models):

#### `users` table:
- `id` (UUID, Primary Key)
- `nombre` (VARCHAR)
- `apellido` (VARCHAR)
- `username` (VARCHAR, Unique)
- `email` (VARCHAR, Unique)
- `password` (VARCHAR, Hashed)
- `created_at`, `updated_at` (Timestamps)

#### `categories` table:
- `category_id` (UUID, Primary Key)
- `category_name` (VARCHAR, Unique)
- `created_at` (Timestamp)

#### `books` table:
- `book_id` (UUID, Primary Key)
- `title` (VARCHAR)
- `author` (VARCHAR)
- `description` (TEXT)
- `price` (DECIMAL)
- `condition` (VARCHAR)
- `category_id` (UUID, Foreign Key)
- `seller_id` (UUID, Foreign Key)
- `coverimageurl` (TEXT)
- `created_at`, `updated_at` (Timestamps)

#### `wishlist` table:
- `wishlist_id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `book_id` (UUID, Foreign Key)
- `created_at` (Timestamp)

#### `reviews` table:
- `review_id` (UUID, Primary Key)
- `book_id` (UUID, Foreign Key)
- `user_id` (UUID, Foreign Key)
- `rating` (INTEGER, 1-5)
- `comment` (TEXT)
- `created_at` (Timestamp)

#### `transactions` table:
- `transaction_id` (UUID, Primary Key)
- `book_id` (UUID, Foreign Key)
- `buyer_id` (UUID, Foreign Key)
- `seller_id` (UUID, Foreign Key)
- `amount` (DECIMAL)
- `status` (VARCHAR)
- `created_at` (Timestamp)

## Sample Test Data

### Users
- `test.user1@example.com` / `password123` - Regular user (Juan Pérez)
- `test.user2@example.com` / `password123` - Regular user (María González)
- `test.seller@example.com` / `password123` - Seller with books (Carlos López)
- `admin@bookloop.com` / `password123` - Admin user

### Books
- "Harry Potter y la Piedra Filosofal" - $29.99 (Nuevo)
- "El Señor de los Anillos" - $39.99 (Usado)
- "1984" - $24.99 (Como Nuevo)
- "Clean Code" - $45.99 (Nuevo)
- "Cien años de soledad" - $35.99 (Bueno)

### Categories
- Novela, Cuento, Poesía, Drama, Ciencia ficción, Fantasía, Misterio, Terror, Romance, Deportes, Realistas, Salud, Tecnología, Ciencias, Escolar, Filosofía

## Security Notes

1. **Never commit the `.env` file** to version control (it's already in .gitignore)
2. **Use different JWT secrets** for testing and production
3. **Regularly backup** your test data if needed
4. **Monitor usage** to avoid hitting Supabase limits

## Troubleshooting

### Connection Issues
- Verify your Supabase URL and keys are correct
- Check that your IP is not blocked by Supabase
- Ensure the database is not in maintenance mode

### Permission Issues
- Verify RLS (Row Level Security) policies are configured correctly
- Check that your service role key has proper permissions

### Data Issues
- If tables already exist, the script will skip creation
- Sample data will only be inserted if it doesn't conflict with existing data

### Model Compatibility
- The database schema matches your existing backend models
- Column names and data types are compatible with your Book.js, User.js, etc.

## Next Steps

1. **Run your existing tests** against the new database
2. **Update test data** as needed for your specific test cases
3. **Configure CI/CD** to use this testing database
4. **Set up automated backups** if needed

## Environment Variables Reference

```bash
# Required for testing
SUPABASE_URL=https://yiempzwmwpwoxxghkwxe.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Server configuration
PORT=5000
NODE_ENV=development

# JWT configuration
JWT_SECRET=bookloop-jwt-secret-key-2024-secure-and-unique
JWT_EXPIRES_IN=24h
```

## Support

If you encounter any issues:
1. Check the Supabase logs in your dashboard
2. Verify your environment variables
3. Test the connection with a simple query
4. Contact your team lead if problems persist 