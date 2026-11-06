
CREATE TABLE IF NOT EXISTS book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price INTEGER,
    pages INTEGER
);

INSERT INTO book (title, author, price, pages) VALUES
('Wings of Fire', 'A.P.J. Abdul Kalam', 350, 180),
('The Alchemist', 'Paulo Coelho', 250, 208),
('Atomic Habits', 'James Clear', 450, 320),
('Rich Dad Poor Dad', 'Robert Kiyosaki', 300, 336),
('Harry Potter', 'J.K. Rowling', 500, 400),
('The Power of Now', 'Eckhart Tolle', 280, 236),
('Think Like a Monk', 'Jay Shetty', 400, 280),
('Deep Work', 'Cal Newport', 350, 296),
('Ikigai', 'Hector Garcia', 270, 208),
('The Psychology of Money', 'Morgan Housel', 320, 256);
