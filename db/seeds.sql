USE company_db

CREATE TABLE department (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT PRIMARY KEY NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT
);

CREATE TABLE employee (
  id INT PRIMARY KEY NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
);

INSERT INTO department (id, name)
VALUES  (1, "Clerical"),
        (2, "Sales Floor"),
        (3, "Backroom"),
        (4, "Overnight"),
        (5, "Executive");

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Receptionist", 50000, 1),
        (2, "HR Manager", 40000, 1),
        (3, "Sales Rep", 50000, 2),
        (4, "Sales Floor Manager", 40000, 2),
        (5, "Backroom Rep", 50000, 3),
        (6, "Backroom Manager", 40000, 3),
        (7, "Overnight Rep", 50000, 4),
        (8, "Overnght Manager", 40000, 4),
        (9, "Store Manager", 30000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Papa", "Johns", 1, 2),
        (2, "Jimmy", "Johns", 2, 12),
        (3, "Little", "Nicky", 3, 5),
        (4, "Billy", "Madison", 3, 5),
        (5, "Bobby", "Boucher", 4, 12),
        (6, "Ace", "Ventura", 5, 8),
        (7, "Guy", "Cabler", 5, 8),
        (8, "Stanley", "Ipkiss", 6, 12),
        (9, "Rhonda", "Rhinehart", 7, 11),
        (10, "Michael", "Jackson", 7, 11),
        (11, "Freddy", "Mercury", 8, 12),
        (12, "Louis", "Stevens", 9, NULL);

