CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  messageid int(11) NOT NULL auto_increment,
  userid  int(11),
  message  TEXT,
  roomname VARCHAR(255),
  PRIMARY KEY (messageid)
  /* Describe your table here.*/
);

/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  userid int(11) NOT NULL auto_increment,
  username VARCHAR(255),
  PRIMARY KEY (userid)
);




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

