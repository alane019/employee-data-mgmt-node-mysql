drop database if exists employee_cms;
create database employee_cms;
use employee_cms;

create table department(
deptartment_id integer not null auto_increment,
name varchar(30) not null,
primary key (id)
);

create table role(
role_id integer not null auto_increment,
title varchar(30) not null, 
salary decimal not null,
department_id integer not null,
primary key (id)
);

create table employee(
    employee_id integer not null auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id integer not null,
    manager_id integer,
    primary key (employee_id)
);
