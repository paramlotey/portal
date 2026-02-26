CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');

CREATE TYPE maritial_status AS ENUM ('single', 'married', 'divorced', 'widowed');

CREATE TYPE children_details AS ENUM (
    'No',
    'Yes, Living Together',
    'Yes, Not Living Together'
);

CREATE TYPE occupation_type AS ENUM (
    'Employed',
    'Self-Employed/Business Owner',
    'Unemployed',
    'Student',
    'Retired',
    'Home Maker'
);

CREATE TYPE annual_income_range AS ENUM (
    'No Income',
    '0- Rs.50000',
    'Rs.50001 - Rs.100000',
    'Rs.100001 - Rs.500000',
    'Rs.500001 - Rs.1000000',
    'Rs.1000001 - Rs.1500000',
    'Rs.1500001 - Rs.2000000',
    'Rs.2000001 - Rs.2500000',
    'Rs.2500001 - Rs.3000000',
    'Rs.3000001 - Rs.3500000',
    'Rs.3500001 - Rs.4000000',
    'Rs.4000001 - Rs.4500000',
    'Rs.4500001 - Rs.5000000',
    'Rs.5000001 - Rs.5500000',
    'Rs.5500001 - Rs.6000000',
    'Rs.6000001 - Rs.6500000',
    'Rs.6500001 - Rs.7000000',
    'Rs.7000001 - Rs.7500000',
    'Rs.7500001 - Rs.8000000',
    'Rs.8000001 - Rs.8500000',
    'Rs.8500001 - Rs.9000000',
    'Rs.9000001 - Rs.9500000',
    'Rs.9500001 - Rs.10000000',
    'Above Rs.10000000'
);

CREATE TYPE body_type AS ENUM ('Slim', 'Average', 'Athletic', 'Heavy');

CREATE TYPE smoking_habit AS ENUM (
    'Non-Smoker',
    'Occasional Smoker',
    'Regular Smoker'
);

CREATE TYPE drinking_habit AS ENUM (
    'Non-Drinker',
    'Occasional Drinker',
    'Regular Drinker'
);

CREATE TYPE complexion AS ENUM ('Fair', 'Wheatish', 'Dusky', 'Dark');

CREATE TYPE diet_preference AS ENUM (
    'Vegetarian',
    'Non-Vegetarian',
    'Vegan',
    'Eggetarian'
);

CREATE TYPE physical_status AS ENUM ('Normal', 'Physically/Mentally Challenged');

CREATE TYPE turban_pagri AS ENUM ('Yes', 'No', 'Amritdhari', 'Occasionally');

CREATE TYPE manglik_status AS ENUM (
    'Manglik',
    'Non-Manglik',
    'Don''t Know',
    'Do Not Believe In Manglik'
);

CREATE TYPE religion AS ENUM ('Sikh', 'Hindu', 'Others');

CREATE TYPE caste AS ENUM (
    'Ramgharia/Dhimaan',
    'Ramgharia/Khati',
    'Arora/Hindu',
    'Arora/Sikh',
    'Sikh/Khatri',
    'Hindu/Khatri',
    'Kamboj/Kamboh',
    'Mahton',
    'Chhimba',
    'Rajput',
    'Jat',
    'Mohyal',
    'Chamar',
    'Sikh Saini',
    'Hindu Saini',
    'Suniyara',
    'Labana Jats',
    'Bhapa',
    'Baniya',
    'Mazbi Sikh',
    'Dogras',
    'SC',
    'BC',
    'Ahluwalia',
    'Aggarwal'
);

CREATE TYPE mother_tongue AS ENUM ('PUNJABI', 'HINDI', 'ENGLISH', 'OTHERS');

CREATE TYPE profile_createdBy AS ENUM ('SELF', 'PARENTS', 'SIBLINGS', 'FRIENDS', 'OTHERS');

CREATE TYPE family_background AS ENUM ('BUSINESS CLASS', 'SERVICE CLASS');

CREATE TYPE family_status AS ENUM ('SIMPLE CLASS', 'MIDDLE CLASS', 'UPPER CLASS', 'HIGH CLASS');

CREATE TYPE residency_status AS ENUM (
    'CITIZEN',
    'PERMANENT RESIDENT',
    'TEMPORARY RESIDENT',
    'WORK PERMIT HOLDER',
    'STUDENT VISA HOLDER'
);

CREATE TYPE education_level AS ENUM (
    'HIGH SCHOOL',
    'DIPLOMA',
    'GRADUATE',
    'POSTGRADUATE',
    'DOCTORATE',
    'OTHER'
);

CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    created_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    gender gender_type NOT NULL,
    date_of_birth DATE NOT NULL,
    time_of_birth TIME NOT NULL,
    place_of_birth VARCHAR(255) NOT NULL,
    no_of_brothers VARCHAR(50),
    no_of_sisters VARCHAR(50),
    marital_status maritial_status NOT NULL,
    children_details children_details NOT NULL,
    address TEXT,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    pincode VARCHAR(10),
    phone VARCHAR(15),
    occupation_type occupation_type NOT NULL,
    occupation VARCHAR(100) NOT NULL,
    annual_income annual_income_range NOT NULL,
    height_feet INTEGER NOT NULL,
    height_inches INTEGER NOT NULL,
    body_type body_type NOT NULL,
    smoking_habit smoking_habit NOT NULL,
    drinking_habit drinking_habit NOT NULL,
    complexion complexion NOT NULL,
    diet_preference diet_preference NOT NULL,
    physical_status physical_status NOT NULL,
    turban_pagri turban_pagri NOT NULL,
    manglik_status manglik_status NOT NULL,
    religion religion NOT NULL,
    caste caste NOT NULL,
    paternal_surname VARCHAR(100),
    maternal_surname VARCHAR(100),
    mother_tongue mother_tongue NOT NULL,
    profile_created_by profile_createdBy NOT NULL,
    family_background family_background NOT NULL,
    family_status family_status NOT NULL,
    residency_status residency_status NOT NULL,
    education_level education_level NOT NULL,
    bio TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);