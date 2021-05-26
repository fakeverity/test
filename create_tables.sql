
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages;

CREATE TABLE users(
   user_id INT GENERATED ALWAYS AS IDENTITY,
   user_name VARCHAR(255) NOT NULL,
   user_password VARCHAR(255) NOT NULL,
   PRIMARY KEY(user_id)
);

CREATE TABLE messages(
   message_id INT GENERATED ALWAYS AS IDENTITY,
   user_id INT,
   message_content VARCHAR(255) NOT NULL,
   PRIMARY KEY(message_id),
   CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(user_id)
);

INSERT INTO users(user_name, user_password)
VALUES ('User1', 'pwd1'),
       ('User2', 'pwd2'),
       ('User3', 'pwd3'),	   
       ('User4', 'pwd4'),
       ('User5', 'pwd5');
	   
INSERT INTO messages(user_id, message_content)
VALUES(1, 'message1'),
      (1, 'message2'),
      (2, 'message3'),
      (3, 'message4');



SELECT 
    users.user_name,
	users.user_password,
    messages.message_id,
    messages.message_content
FROM
    users
JOIN messages
ON
    users.user_id = messages.user_id;

