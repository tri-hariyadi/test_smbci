USE school_library;

CREATE TABLE users
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    full_name  VARCHAR(100)             NOT NULL,
    email      VARCHAR(100) UNIQUE      NOT NULL,
    password   TEXT                     NOT NULL,
    role       ENUM ('ADMIN', 'MEMBER') NOT NULL DEFAULT 'MEMBER',
    created_at DATETIME                          DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE users;

DESC users;

SELECT *
FROM users;

CREATE TABLE books
(
    id               INT AUTO_INCREMENT PRIMARY KEY,
    isbn             VARCHAR(20) UNIQUE,
    title            VARCHAR(255) NOT NULL,
    author           VARCHAR(100),
    publisher        VARCHAR(100),
    published_year   YEAR,
    cover_url        TEXT,
    category         VARCHAR(100),
    total_copies     INT          NOT NULL DEFAULT 1,
    available_copies INT          NOT NULL DEFAULT 1,
    created_at       DATETIME              DEFAULT CURRENT_TIMESTAMP
);

DESC books;

CREATE TABLE IF NOT EXISTS book_rentals
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT                                   NOT NULL,
    book_id     INT                                   NOT NULL,
    due_date    DATETIME                              NOT NULL,
    rent_date   DATETIME                                   DEFAULT CURRENT_TIMESTAMP,
    return_date DATETIME,
    status      ENUM ('BORROWED', 'RETURNED', 'LATE') NULL DEFAULT 'BORROWED',
    created_at  DATETIME                                   DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE
);

DESC book_rentals;

DELETE FROM book_rentals;

SELECT *
FROM book_rentals;

DROP TABLE book_rentals;

SHOW TABLES;

SELECT *
FROM books;

INSERT INTO books (isbn, title, author, publisher, published_year, cover_url, category, total_copies, available_copies)
VALUES ('978-602-407-781-5', 'Dongeng Lengkap Kancil', 'Kak Thifa', 'Laksana', 2020,
        'https://tirtabuanamedia.co.id/wp-content/uploads/2021/01/Dongeng-Lengkap-Kancil.jpg', 'dongeng', '50', '40');

INSERT INTO books (isbn, title, author, publisher, published_year, cover_url, category, total_copies, available_copies)
VALUES ('978-602-5783-65-4', 'Asteroid dari Namamu', 'Galeh Pramudianto', 'Basabasi', 2019,
        'https://tirtabuanamedia.co.id/wp-content/uploads/2020/10/Asteroid-dari-Namamu.jpg', 'Puisi', 10, 5);

INSERT INTO books (isbn, title, author, publisher, published_year, cover_url, category, total_copies, available_copies)
VALUES ('978-623-02-1671-8', 'Antologi Puisi Secangkir Teh untuk Berdua', 'Warastri Kurniati', 'Deepublish', 2020,
        'https://tirtabuanamedia.co.id/wp-content/uploads/2021/08/Antologi-Puisi-Secangkir-Teh-untuk-Berdua-400x576.png',
        'Puisi', 8, 3);















