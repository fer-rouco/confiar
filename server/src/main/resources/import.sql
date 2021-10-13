INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE) VALUES('Pablo', 'Perez', 'perez', 'pperez@gmail.com', 'PPerez99', 2);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE) VALUES('Maria', 'Suarez', 'msuarez', 'msuarez@gmail.com', 'MSuarez', 1);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE) VALUES('Flor', 'Martinez', 'florm', 'florm@gmail.com', 'FlorM', 1);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE) VALUES('Michael', 'Lawson', 'mlawson', 'mlawson@gmail.com', 'MLawson', 2);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE) VALUES('Lindsay', 'Ferguson', 'lferguson', 'lferguson@gmail.com', 'LFerguson', 1);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE) VALUES('Tobias', 'Funke', 'tfunke', 'tfunke@gmail.com', 'TFunke', 2);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE) VALUES('Byron', 'Fields', 'bfields', 'bfields@gmail.com', 'BFields', 1);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE) VALUES('George', 'Edwards', 'gedwards', 'gedwards@gmail.com', 'GEdwards', 2);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE) VALUES('Rachel', 'Howel', 'rhowel', 'rhowel@gmail.com', 'RHowel', 1);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE) VALUES('Leanne', 'Bret', 'lbret', 'lbret@gmail.com', 'LBret', 1);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE) VALUES('Ervin', 'Howel', 'ehowel', 'ehowel@gmail.com', 'EHowel', 1);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE) VALUES('Clementine', 'Bauch', 'cbauch', 'cbauch@gmail.com', 'CBauch', 2);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE) VALUES('Patricia', 'Lebsack', 'plebsack', 'plebsack@gmail.com', 'PLebsack', 2);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE) VALUES('Chelsey', 'Dietrich', 'cdietrich', 'cdietrich@gmail.com', 'CDietrich', 1);
INSERT INTO USER (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE) VALUES('Dennis', 'Schulist', 'dschulist', 'dschulist@gmail.com', 'DSchulist', 1);

-- Hash User Passwords
UPDATE USER SET PASSWORD = HASH('SHA256', STRINGTOUTF8(PASSWORD));
