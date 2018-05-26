CREATE DATABASE mediaactionsdb;

create extension if not exists "uuid-ossp";

create table Users (
    id uuid primary key not null default uuid_generate_v4(),
    username varchar(20) not null,
    password varchar(100) not null,
    email varchar(100) not null
);

create table Purchases (
    id uuid primary key not null default uuid_generate_v4(),
    userId uuid not null,
    imageId uuid not null
);

create table Gallery (
    id uuid primary key not null default uuid_generate_v4(),
    posterId uuid not null,
    price integer not null,
    mimetype varchar(200) not null,
    title varchar(250) not null,
    description varchar(5000) not null,
    filename varchar(1000) not null,
    path varchar(1000) not null,
    size varchar(100) not null,
    date timestamptz not null default now()
);
