INSERT INTO users (id, username, password, token) VALUES (1, 'alice', 'password123', NULL);

INSERT INTO questions (topic, difficulty, text, options_json, correct_index) VALUES
('math','easy','What is 2+2?', '["3","4","5","6"]', 1),
('math','medium','What is integral of x dx?','["x","x^2/2 + C","2x","ln x"]',1),
('science','easy','Which gas is most abundant in Earth\'s atmosphere?','["Oxygen","Nitrogen","Carbon Dioxide","Hydrogen"]',1),
('science','medium','What is H2O?','["Hydrogen peroxide","Water","Hydroxide","Hydrogen oxide"]',1),
('history','easy','Who discovered America?','["Christopher Columbus","Vespucci","Magellan","Columbus"]',0),
('history','hard','When did the Roman Empire fall?','["476 AD","410 AD","1453 AD","800 AD"]',0),
('math','easy','What is 5*6?','["11","30","56","60"]',1),
('math','hard','What is derivative of sin(x)?','["cos(x)","-sin(x)","sin(x)","-cos(x)"]',0),
('science','hard','What is the powerhouse of the cell?','["Nucleus","Mitochondria","Ribosome","Golgi"]',1),
('history','medium','Who was the first President of USA?','["George Washington","John Adams","Thomas Jefferson","James Madison"]',0);
