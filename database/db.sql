CREATE TABLE USERS (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,

    avatar_url TEXT,

    role ENUM('admin', 'user') DEFAULT 'user',

    status ENUM('ativo', 'bloqueado') DEFAULT 'ativo',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE TASKS (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    name VARCHAR(150) NOT NULL,
    description TEXT,

    frequency ENUM('Diaria', 'Semanal', 'Mensal', 'Unica') DEFAULT 'Diaria',

    time TIME,

    week_days VARCHAR(50),

    month_day INT,

    single_date DATE,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

CREATE TABLE TASKCOMPLETIONS (
    id INT AUTO_INCREMENT PRIMARY KEY,

    task_id INT NOT NULL,
    user_id INT NOT NULL,

    occurrence_date DATE NOT NULL,

    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (task_id) REFERENCES TASKS(id),
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

CREATE TABLE ADMINACTIONS (
    id INT AUTO_INCREMENT PRIMARY KEY,

    admin_id INT NOT NULL,
    target_user_id INT NOT NULL,

    action VARCHAR(50) NOT NULL,

    reason TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (admin_id) REFERENCES USERS(id),
    FOREIGN KEY (target_user_id) REFERENCES USERS(id)
);