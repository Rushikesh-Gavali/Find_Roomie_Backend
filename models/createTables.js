const pool=require('../database/connection');

async function createTables() {
    try {
        const usersExist = await pool.query(`
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_schema = 'public'
                AND table_name = 'users'
            );
        `);

        const listingsExist = await pool.query(`
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_schema = 'public'
                AND table_name = 'listings'
            );
        `);

        const photosExist = await pool.query(`
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_schema = 'public'
                AND table_name = 'photos'
            );
        `);

        if (!usersExist.rows[0].exists) {
            await pool.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR NOT NULL,
                email VARCHAR UNIQUE NOT NULL,
                password VARCHAR NOT NULL,
                gender SMALLINT NOT NULL,
                mobile_no VARCHAR(20) NOT NULL,
                whatsapp_no VARCHAR(20) NOT NULL,
                dob DATE,
                photo VARCHAR,
                is_deleted BOOLEAN DEFAULT false
            );
            `);
            console.log('Users table created');
        }

        if (!listingsExist.rows[0].exists) {
            await pool.query(`
            CREATE TABLE listings (
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id),
                address VARCHAR NOT NULL,
                state VARCHAR,
                country VARCHAR,
                pincode VARCHAR NOT NULL,
                latitude NUMERIC,
                longitude NUMERIC,
                deposit INT,
                rent INT,
                available_from DATE,
                no_of_current_roommates SMALLINT,
                no_of_current_female_roommates SMALLINT,
                no_of_current_male_roommates SMALLINT,
                no_of_roommates_required SMALLINT,
                gender_preference SMALLINT NOT NULL,
                is_furnished BOOL NOT NULL,
                min_age SMALLINT,
                max_age SMALLINT,
                status BOOLEAN DEFAULT true
            );
            `);
            console.log('Listings table created');
        }

        if (!photosExist.rows[0].exists) {
            await pool.query(`
            CREATE TABLE photos (
                id SERIAL PRIMARY KEY,
                listings_id INT NOT NULL,
                FOREIGN KEY (listings_id) REFERENCES listings(id),
                url VARCHAR(255)
            );
            `);
            console.log('Photos table created');
        }

    } catch (error) {
        console.error('Error checking/creating tables:', error);
    }
}

module.exports = createTables;
