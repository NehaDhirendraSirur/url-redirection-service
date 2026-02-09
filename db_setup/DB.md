In PostGRESQL, 

1.CREATE DATABASE url_redirection;
2.Connect to Database
3.Create Table

CREATE TABLE url_mapping (
    id UUID PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_code VARCHAR(10) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    click_count INT DEFAULT 0
);

4.Update application.yml with your pgAdmin password
5.Run the backend