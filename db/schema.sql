Drop Database if exists employeeTrackerDB;
Create Database employeeTrackerDB;
Use employeeTrackerDB;

Create Table department(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

Create Table role(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salery DECIMAL NOT NULL,
department_id INT NOT NULL,
index department_index(department_id),
CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

Create Table employee(
id INT AUTO_INCREMENT PRIMARY KEY,
firstName VARCHAR (30) NOT NULL,
lastName VARCHAR (30) NOT NULL,
role_id INT NOT NULL,
index role_index(role_id),
CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
manager_id INT NOT NULL,
index manager_index(manager_id),
CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES role(id)
);