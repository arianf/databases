-- CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  objectId int(11) NOT NULL auto_increment,
  username VARCHAR(256),
  message  TEXT,
  roomname VARCHAR(256) ,
  PRIMARY KEY (objectId)
  /* Describe your table here.*/
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

