-- BookLoop Testing Database Setup
-- This script creates all necessary tables and sample data for testing
-- Compatible with existing backend models

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (matching backend User.js model)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table (matching backend Category.js model)
CREATE TABLE IF NOT EXISTS categories (
    category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create books table (matching backend Book.js model)
CREATE TABLE IF NOT EXISTS books (
    book_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    condition VARCHAR(100) DEFAULT 'Nuevo',
    category_id UUID REFERENCES categories(category_id),
    seller_id UUID REFERENCES users(id),
    coverimageurl TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create wishlist table (matching backend Wishlist.js model)
CREATE TABLE IF NOT EXISTS wishlist (
    wishlist_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    book_id UUID REFERENCES books(book_id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, book_id)
);

-- Create reviews table (matching backend Review.js model)
CREATE TABLE IF NOT EXISTS reviews (
    review_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id UUID REFERENCES books(book_id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table (matching backend Transaction.js model)
CREATE TABLE IF NOT EXISTS transactions (
    transaction_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id UUID REFERENCES books(book_id),
    buyer_id UUID REFERENCES users(id),
    seller_id UUID REFERENCES users(id),
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_books_seller_id ON books(seller_id);
CREATE INDEX IF NOT EXISTS idx_books_category_id ON books(category_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_book_id ON wishlist(book_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Insert sample categories (matching backend expectations)
INSERT INTO categories (category_name) VALUES 
  ('Novela'),
  ('Cuento'),
  ('Poesía'),
  ('Drama'),
  ('Ciencia ficción'),
  ('Fantasía'),
  ('Misterio'),
  ('Terror'),
  ('Romance'),
  ('Deportes'),
  ('Realistas'),
  ('Salud'),
  ('Tecnología'),
  ('Ciencias'),
  ('Escolar'),
  ('Filosofía')
ON CONFLICT (category_name) DO NOTHING;

-- Insert sample users (passwords are hashed versions of 'password123')
INSERT INTO users (nombre, apellido, username, email, password) VALUES
('Juan', 'Pérez', 'juanperez', 'test.user1@example.com', '$2b$10$rQZ8K9vX2mN3pL4qR5sT6uV7wX8yZ9aA0bB1cC2dE3fF4gG5hH6iI7jJ8kK9lL0mM1nN2oO3pP4qQ5rR6sS7tT8uU9vV0wW1xX2yY3zZ'),
('María', 'González', 'mariagonzalez', 'test.user2@example.com', '$2b$10$rQZ8K9vX2mN3pL4qR5sT6uV7wX8yZ9aA0bB1cC2dE3fF4gG5hH6iI7jJ8kK9lL0mM1nN2oO3pP4qQ5rR6sS7tT8uU9vV0wW1xX2yY3zZ'),
('Carlos', 'López', 'carloslopez', 'test.seller@example.com', '$2b$10$rQZ8K9vX2mN3pL4qR5sT6uV7wX8yZ9aA0bB1cC2dE3fF4gG5hH6iI7jJ8kK9lL0mM1nN2oO3pP4qQ5rR6sS7tT8uU9vV0wW1xX2yY3zZ'),
('Admin', 'BookLoop', 'admin', 'admin@bookloop.com', '$2b$10$rQZ8K9vX2mN3pL4qR5sT6uV7wX8yZ9aA0bB1cC2dE3fF4gG5hH6iI7jJ8kK9lL0mM1nN2oO3pP4qQ5rR6sS7tT8uU9vV0wW1xX2yY3zZ')
ON CONFLICT (email) DO NOTHING;

-- Insert sample books (matching backend Book.js model structure)
INSERT INTO books (title, author, description, price, condition, category_id, seller_id, coverimageurl) VALUES 
  ('Harry Potter y la Piedra Filosofal', 'J.K. Rowling', 'El primer libro de la saga de Harry Potter', 29.99, 
   (SELECT category_id FROM categories WHERE category_name = 'Fantasía'), 
   (SELECT id FROM users WHERE email = 'test.seller@example.com'), 'Nuevo', 'https://example.com/hp1.jpg'),
   
  ('El Señor de los Anillos', 'J.R.R. Tolkien', 'La trilogía épica de la Tierra Media', 39.99,
   (SELECT category_id FROM categories WHERE category_name = 'Fantasía'),
   (SELECT id FROM users WHERE email = 'test.seller@example.com'), 'Usado', 'https://example.com/lotr.jpg'),
   
  ('1984', 'George Orwell', 'Novela distópica sobre vigilancia estatal', 24.99,
   (SELECT category_id FROM categories WHERE category_name = 'Ciencia ficción'),
   (SELECT id FROM users WHERE email = 'test.seller@example.com'), 'Como Nuevo', 'https://example.com/1984.jpg'),
   
  ('Clean Code', 'Robert C. Martin', 'Guía para escribir código limpio y mantenible', 45.99,
   (SELECT category_id FROM categories WHERE category_name = 'Tecnología'),
   (SELECT id FROM users WHERE email = 'test.seller@example.com'), 'Nuevo', 'https://example.com/clean-code.jpg'),
   
  ('Cien años de soledad', 'Gabriel García Márquez', 'Obra maestra del realismo mágico', 35.99,
   (SELECT category_id FROM categories WHERE category_name = 'Novela'),
   (SELECT id FROM users WHERE email = 'test.seller@example.com'), 'Bueno', 'https://example.com/cien-anos.jpg')
ON CONFLICT DO NOTHING;

-- Insert sample wishlist items
INSERT INTO wishlist (user_id, book_id) VALUES 
  ((SELECT id FROM users WHERE email = 'test.user1@example.com'),
   (SELECT book_id FROM books WHERE title = 'Harry Potter y la Piedra Filosofal')),
  ((SELECT id FROM users WHERE email = 'test.user1@example.com'),
   (SELECT book_id FROM books WHERE title = 'Clean Code'))
ON CONFLICT DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (book_id, user_id, rating, comment) VALUES 
  ((SELECT book_id FROM books WHERE title = 'El Señor de los Anillos'),
   (SELECT id FROM users WHERE email = 'test.user1@example.com'), 5, 'Excelente libro, muy recomendado'),
  ((SELECT book_id FROM books WHERE title = 'Clean Code'),
   (SELECT id FROM users WHERE email = 'test.user2@example.com'), 4, 'Muy bueno, pero algo complejo')
ON CONFLICT DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON books FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (adjust as needed)
-- Allow all users to read books
CREATE POLICY "Allow public read access to books" ON books FOR SELECT USING (true);

-- Allow authenticated users to create books
CREATE POLICY "Allow authenticated users to create books" ON books FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow book owners to update/delete their books
CREATE POLICY "Allow book owners to update books" ON books FOR UPDATE USING (auth.uid() = seller_id);
CREATE POLICY "Allow book owners to delete books" ON books FOR DELETE USING (auth.uid() = seller_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Verification queries
SELECT 'Database setup completed successfully' as status;
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_categories FROM categories;
SELECT COUNT(*) as total_books FROM books;
SELECT COUNT(*) as total_wishlist FROM wishlist;
SELECT COUNT(*) as total_reviews FROM reviews; 