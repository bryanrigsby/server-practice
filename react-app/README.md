SQLITE/General SQL

SQLITE SPECIFIC---
- activate SQLITE in terminal
    - sqlite3 database.sqlite (<- name of database file)

 - show tables
    - .tables

- show schema (table columns and types)
    - .schema tableName 



GENERAL SQL----

- CREATE table
    - CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        name TEXT,
        age INTEGER
    );

- READ from table
    - select * from tableName;    <- dont forget semicolon

- UPDATE / Insert

    - Update a row
        - UPDATE users SET age = 31 WHERE name = 'John Doe';

    - Insert a row into table
        - INSERT INTO users (name, age) VALUES ('John Doe', 30);

- DELETE
    - DELETE FROM users WHERE name = 'John Doe';


- Order by
    - SELECT * FROM users ORDER BY age ASC;  (asceding)

- Group by (groups the result set based on the specified column(s).)
    - SELECT age, COUNT(*) AS total FROM users GROUP BY age;
    * COUNT, SUM, AVG, MIN, MAX with GROUP BY for aggregate calculations.