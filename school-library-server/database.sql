USE school_library;

CREATE TABLE users
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    full_name  VARCHAR(100)             NOT NULL,
    email      VARCHAR(100) UNIQUE      NOT NULL,
    password   TEXT                     NOT NULL,
    role       ENUM ('admin', 'member') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE users;

DESC users;

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
    due_date    DATETIME                                  NOT NULL,
    rent_date   DATETIME                              NOT NULL DEFAULT CURRENT_TIMESTAMP,
    return_date DATETIME,
    status      ENUM ('borrowed', 'returned', 'late') NOT NULL,
    created_at  DATETIME                                       DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE
);

DESC book_rentals;

DROP TABLE book_rentals;

SHOW TABLES;