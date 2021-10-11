-- Stores
INSERT INTO STORE (NUMBER, NAME) VALUES(1, 'Capital Federal');
INSERT INTO STORE (NUMBER, NAME) VALUES(2, 'Cordoba Capital');
INSERT INTO STORE (NUMBER, NAME) VALUES(3, 'Rosario');
INSERT INTO STORE (NUMBER, NAME) VALUES(4, 'La Plata');
INSERT INTO STORE (NUMBER, NAME) VALUES(5, 'Bariloche');
INSERT INTO STORE (NUMBER, NAME) VALUES(6, 'Neuquen');

-- Store 1
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE, STORE_ID) VALUES('Pablo', 'Perez', 'perez', 'pperez@gmail.com', 'PPerez99', 2, 1);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE, STORE_ID) VALUES('Maria', 'Suarez', 'msuarez', 'msuarez@gmail.com', 'MSuarez', 1, 1);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE, STORE_ID) VALUES('Flor', 'Martinez', 'florm', 'florm@gmail.com', 'FlorM', 1, 1);
-- Store 2
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE, STORE_ID) VALUES('Michael', 'Lawson', 'mlawson', 'mlawson@gmail.com', 'MLawson', 2, 2);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE, STORE_ID) VALUES('Lindsay', 'Ferguson', 'lferguson', 'lferguson@gmail.com', 'LFerguson', 1, 2);
-- Store 3
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE, STORE_ID) VALUES('Tobias', 'Funke', 'tfunke', 'tfunke@gmail.com', 'TFunke', 2, 3);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE, STORE_ID) VALUES('Byron', 'Fields', 'bfields', 'bfields@gmail.com', 'BFields', 1, 3);
-- Store 4
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE, STORE_ID) VALUES('George', 'Edwards', 'gedwards', 'gedwards@gmail.com', 'GEdwards', 2, 4);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE, STORE_ID) VALUES('Rachel', 'Howel', 'rhowel', 'rhowel@gmail.com', 'RHowel', 1, 4);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE, STORE_ID) VALUES('Leanne', 'Bret', 'lbret', 'lbret@gmail.com', 'LBret', 1, 4);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE, STORE_ID) VALUES('Ervin', 'Howel', 'ehowel', 'ehowel@gmail.com', 'EHowel', 1, 4);
-- Store 5
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE, STORE_ID) VALUES('Clementine', 'Bauch', 'cbauch', 'cbauch@gmail.com', 'CBauch', 2, 5);
-- Store 6
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE, STORE_ID) VALUES('Patricia', 'Lebsack', 'plebsack', 'plebsack@gmail.com', 'PLebsack', 2, 6);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE, STORE_ID) VALUES('Chelsey', 'Dietrich', 'cdietrich', 'cdietrich@gmail.com', 'CDietrich', 1, 6);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE, STORE_ID) VALUES('Dennis', 'Schulist', 'dschulist', 'dschulist@gmail.com', 'DSchulist', 1, 6);

-- Hash User Passwords
UPDATE USER SET PASSWORD = HASH('SHA256', STRINGTOUTF8(PASSWORD));
