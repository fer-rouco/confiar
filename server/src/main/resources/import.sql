INSERT INTO PROFILES (ID, DESCRIPTION) VALUES(1, 'Administrador');
INSERT INTO PROFILES (ID, DESCRIPTION) VALUES(2, 'Vendedor');
INSERT INTO PROFILES (ID, DESCRIPTION) VALUES(3, 'Empleado administrativo');

INSERT INTO USERS (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE_ID) VALUES('Pablo', 'Perez', 'perez', 'pperez@gmail.com', 'PPerez99', 2);
INSERT INTO USERS (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE_ID) VALUES('Maria', 'Suarez', 'msuarez', 'msuarez@gmail.com', 'MSuarez', 1);
INSERT INTO USERS (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE_ID) VALUES('Flor', 'Martinez', 'florm', 'florm@gmail.com', 'FlorM', 1);
INSERT INTO USERS (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE_ID) VALUES('Michael', 'Lawson', 'mlawson', 'mlawson@gmail.com', 'MLawson', 2);
INSERT INTO USERS (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE_ID) VALUES('Lindsay', 'Ferguson', 'lferguson', 'lferguson@gmail.com', 'LFerguson', 1);
INSERT INTO USERS (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE_ID) VALUES('Tobias', 'Funke', 'tfunke', 'tfunke@gmail.com', 'TFunke', 2);
INSERT INTO USERS (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE_ID) VALUES('Byron', 'Fields', 'bfields', 'bfields@gmail.com', 'BFields', 1);
INSERT INTO USERS (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE_ID) VALUES('George', 'Edwards', 'gedwards', 'gedwards@gmail.com', 'GEdwards', 2);
INSERT INTO USERS (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE_ID) VALUES('Rachel', 'Howel', 'rhowel', 'rhowel@gmail.com', 'RHowel', 1);
INSERT INTO USERS (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE_ID) VALUES('Leanne', 'Bret', 'lbret', 'lbret@gmail.com', 'LBret', 1);
INSERT INTO USERS (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE_ID) VALUES('Ervin', 'Howel', 'ehowel', 'ehowel@gmail.com', 'EHowel', 1);
INSERT INTO USERS (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE_ID) VALUES('Clementine', 'Bauch', 'cbauch', 'cbauch@gmail.com', 'CBauch', 2);
INSERT INTO USERS (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE_ID) VALUES('Patricia', 'Lebsack', 'plebsack', 'plebsack@gmail.com', 'PLebsack', 2);
INSERT INTO USERS (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE_ID) VALUES('Chelsey', 'Dietrich', 'cdietrich', 'cdietrich@gmail.com', 'CDietrich', 1);
INSERT INTO USERS (NAME, LAST_NAME, USER_NAME, MAIL, PASSWORD, PROFILE_ID) VALUES('Dennis', 'Schulist', 'dschulist', 'dschulist@gmail.com', 'DSchulist', 1);


INSERT INTO CUSTOMERS (NAME, LAST_NAME, MAIL, PHONE) VALUES('Pablo', 'Perez', 'pperez@gmail.com', '+541162365255');
INSERT INTO CUSTOMERS (NAME, LAST_NAME, MAIL, PHONE) VALUES('Maria', 'Suarez','msuarez@gmail.com', '+5411121221');
INSERT INTO CUSTOMERS (NAME, LAST_NAME, MAIL, PHONE) VALUES('Flor', 'Martinez','florm@gmail.com', '+541155555555');
INSERT INTO CUSTOMERS (NAME, LAST_NAME, MAIL, PHONE) VALUES('Michael', 'Lawson','mlawson@gmail.com', '+54116666666');
INSERT INTO CUSTOMERS (NAME, LAST_NAME, MAIL, PHONE) VALUES('Lindsay', 'Ferguson','lferguson@gmail.com', '+5411999999');
INSERT INTO CUSTOMERS (NAME, LAST_NAME, MAIL, PHONE) VALUES('Tobias', 'Funke','tfunke@gmail.com', '+541188888');
INSERT INTO CUSTOMERS (NAME, LAST_NAME, MAIL, PHONE) VALUES('Byron', 'Fields','bfields@gmail.com', '+541166969666');
INSERT INTO CUSTOMERS (NAME, LAST_NAME, MAIL, PHONE) VALUES('George', 'Edwards','gedwards@gmail.com', '+54118858585');
INSERT INTO CUSTOMERS (NAME, LAST_NAME, MAIL, PHONE) VALUES('Rachel', 'Howel','rhowel@gmail.com', '+54119965656');
INSERT INTO CUSTOMERS (NAME, LAST_NAME, MAIL, PHONE) VALUES('Leanne', 'Bret','lbret@gmail.com', '+54114545454');
INSERT INTO CUSTOMERS (NAME, LAST_NAME, MAIL, PHONE) VALUES('Ervin', 'Howel','ehowel@gmail.com', '+54115292929');
INSERT INTO CUSTOMERS (NAME, LAST_NAME, MAIL, PHONE) VALUES('Clementine', 'Bauch','cbauch@gmail.com', '+54116559292');
INSERT INTO CUSTOMERS (NAME, LAST_NAME, MAIL, PHONE) VALUES('Patricia', 'Lebsack','plebsack@gmail.com', '+54116656526');
INSERT INTO CUSTOMERS (NAME, LAST_NAME, MAIL, PHONE) VALUES('Chelsey', 'Dietrich','cdietrich@gmail.com', '+541112655151');
INSERT INTO CUSTOMERS (NAME, LAST_NAME, MAIL, PHONE) VALUES('Dennis', 'Schulist','dschulist@gmail.com', '+5411656565');


-- Hash User Passwords
UPDATE USERS SET PASSWORD = HASH('SHA256', STRINGTOUTF8(PASSWORD));
