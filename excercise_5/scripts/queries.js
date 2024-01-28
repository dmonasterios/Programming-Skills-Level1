export const userTableQuery = `
CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(25) NOT NULL,
  last_name varchar(25) NOT NULL,
  username varchar(25) NOT NULL,
  password varchar(25) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  login_attempts int NOT NULL DEFAULT '0',
  PRIMARY KEY (id),
  UNIQUE KEY username_UNIQUE (username)
);`

export const ticketsTableQuery = `
CREATE TABLE tickets (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  passport_id varchar(25) NOT NULL,
  origin_country varchar(15) NOT NULL,
  destiny_country varchar(15) NOT NULL,
  flight_date timestamp NOT NULL,
  type varchar(12) NOT NULL,
  meal varchar(15) NOT NULL,
  additional_luggage tinyint NOT NULL DEFAULT '0',
  cost float NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY fk_flights_1_idx (user_id),
  CONSTRAINT fk_flights_1 FOREIGN KEY (user_id) REFERENCES users (id)
);`
