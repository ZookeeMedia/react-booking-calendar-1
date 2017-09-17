DROP DATABASE calendar;

CREATE DATABASE calendar;

USE calendar;

CREATE TABLE users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  role VARCHAR(50) DEFAULT 'user'
);

CREATE TABLE availability_blocks(
  id INT AUTO_INCREMENT PRIMARY KEY,
  block INT NOT NULL,
  day DATE NOT NULL,
  UNIQUE KEY(block, day)
);

CREATE TABLE bookings(
  id INT AUTO_INCREMENT PRIMARY KEY,
  status VARCHAR(50) NOT NULL,
  user_id INT NOT NULL,
  availability_block_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(availability_block_id) REFERENCES availability_blocks(id)
);
