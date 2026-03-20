-- CreateEnum
CREATE TYPE "annual_income_range" AS ENUM ('No Income', '0- Rs.50000', 'Rs.50001 - Rs.100000', 'Rs.100001 - Rs.500000', 'Rs.500001 - Rs.1000000', 'Rs.1000001 - Rs.1500000', 'Rs.1500001 - Rs.2000000', 'Rs.2000001 - Rs.2500000', 'Rs.2500001 - Rs.3000000', 'Rs.3000001 - Rs.3500000', 'Rs.3500001 - Rs.4000000', 'Rs.4000001 - Rs.4500000', 'Rs.4500001 - Rs.5000000', 'Rs.5000001 - Rs.5500000', 'Rs.5500001 - Rs.6000000', 'Rs.6000001 - Rs.6500000', 'Rs.6500001 - Rs.7000000', 'Rs.7000001 - Rs.7500000', 'Rs.7500001 - Rs.8000000', 'Rs.8000001 - Rs.8500000', 'Rs.8500001 - Rs.9000000', 'Rs.9000001 - Rs.9500000', 'Rs.9500001 - Rs.10000000', 'Above Rs.10000000');

-- CreateEnum
CREATE TYPE "body_type" AS ENUM ('Slim', 'Average', 'Athletic', 'Heavy');

-- CreateEnum
CREATE TYPE "caste" AS ENUM ('Ramgharia/Dhimaan', 'Ramgharia/Khati', 'Arora/Hindu', 'Arora/Sikh', 'Sikh/Khatri', 'Hindu/Khatri', 'Kamboj/Kamboh', 'Mahton', 'Chhimba', 'Rajput', 'Jat', 'Mohyal', 'Chamar', 'Sikh Saini', 'Hindu Saini', 'Suniyara', 'Labana Jats', 'Bhapa', 'Baniya', 'Mazbi Sikh', 'Dogras', 'SC', 'BC', 'Ahluwalia', 'Aggarwal');

-- CreateEnum
CREATE TYPE "children_details" AS ENUM ('No', 'Yes, Living Together', 'Yes, Not Living Together');

-- CreateEnum
CREATE TYPE "complexion" AS ENUM ('Fair', 'Wheatish', 'Dusky', 'Dark');

-- CreateEnum
CREATE TYPE "diet_preference" AS ENUM ('Vegetarian', 'Non-Vegetarian', 'Vegan', 'Eggetarian');

-- CreateEnum
CREATE TYPE "drinking_habit" AS ENUM ('Non-Drinker', 'Occasional Drinker', 'Regular Drinker');

-- CreateEnum
CREATE TYPE "education_level" AS ENUM ('HIGH SCHOOL', 'DIPLOMA', 'GRADUATE', 'POSTGRADUATE', 'DOCTORATE', 'OTHER');

-- CreateEnum
CREATE TYPE "family_background" AS ENUM ('BUSINESS CLASS', 'SERVICE CLASS');

-- CreateEnum
CREATE TYPE "family_status" AS ENUM ('SIMPLE CLASS', 'MIDDLE CLASS', 'UPPER CLASS', 'HIGH CLASS');

-- CreateEnum
CREATE TYPE "gender_type" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "manglik_status" AS ENUM ('Manglik', 'Non-Manglik', 'Dont Know', 'Do Not Believe In Manglik');

-- CreateEnum
CREATE TYPE "maritial_status" AS ENUM ('single', 'married', 'divorced', 'widowed');

-- CreateEnum
CREATE TYPE "mother_tongue" AS ENUM ('PUNJABI', 'HINDI', 'ENGLISH', 'OTHERS');

-- CreateEnum
CREATE TYPE "occupation_type" AS ENUM ('Employed', 'Self-Employed/Business Owner', 'Unemployed', 'Student', 'Retired', 'Home Maker');

-- CreateEnum
CREATE TYPE "physical_status" AS ENUM ('Normal', 'Physically/Mentally Challenged');

-- CreateEnum
CREATE TYPE "profile_createdby" AS ENUM ('SELF', 'PARENTS', 'SIBLINGS', 'FRIENDS', 'OTHERS');

-- CreateEnum
CREATE TYPE "religion" AS ENUM ('Sikh', 'Hindu', 'Others');

-- CreateEnum
CREATE TYPE "residency_status" AS ENUM ('CITIZEN', 'PERMANENT RESIDENT', 'TEMPORARY RESIDENT', 'WORK PERMIT HOLDER', 'STUDENT VISA HOLDER');

-- CreateEnum
CREATE TYPE "smoking_habit" AS ENUM ('Non-Smoker', 'Occasional Smoker', 'Regular Smoker');

-- CreateEnum
CREATE TYPE "turban_pagri" AS ENUM ('Yes', 'No', 'Amritdhari', 'Occasionally');

-- CreateTable
CREATE TABLE "migrations" (
    "id" SERIAL NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "ran_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partnerPreference" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "marital_status" "maritial_status" NOT NULL,
    "children_details" "children_details" NOT NULL,
    "country_prefrence" TEXT NOT NULL,
    "state_prefrence" TEXT NOT NULL,
    "city_prefrence" TEXT NOT NULL,
    "age_range" TEXT NOT NULL,
    "height_range" TEXT NOT NULL,
    "complexion" "complexion" NOT NULL,
    "body_type" "body_type" NOT NULL,
    "family_status" "family_status" NOT NULL,
    "education_level" "education_level" NOT NULL,
    "religion" "religion" NOT NULL,
    "manglik_status" "manglik_status" NOT NULL,
    "turban_pagri" "turban_pagri" NOT NULL,
    "occupation_type" "occupation_type" NOT NULL,
    "occupation" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partnerPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "created_by" INTEGER,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "gender" "gender_type" NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "time_of_birth" TIME(6) NOT NULL,
    "place_of_birth" VARCHAR(255) NOT NULL,
    "no_of_brothers" VARCHAR(50),
    "no_of_sisters" VARCHAR(50),
    "marital_status" "maritial_status" NOT NULL,
    "children_details" "children_details" NOT NULL,
    "address" TEXT,
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "pincode" VARCHAR(10),
    "phone" VARCHAR(15),
    "occupation_type" "occupation_type" NOT NULL,
    "occupation" VARCHAR(100) NOT NULL,
    "annual_income" "annual_income_range" NOT NULL,
    "height_feet" INTEGER NOT NULL,
    "height_inches" INTEGER NOT NULL,
    "body_type" "body_type" NOT NULL,
    "smoking_habit" "smoking_habit" NOT NULL,
    "drinking_habit" "drinking_habit" NOT NULL,
    "complexion" "complexion" NOT NULL,
    "diet_preference" "diet_preference" NOT NULL,
    "physical_status" "physical_status" NOT NULL,
    "turban_pagri" "turban_pagri" NOT NULL,
    "manglik_status" "manglik_status" NOT NULL,
    "religion" "religion" NOT NULL,
    "caste" "caste" NOT NULL,
    "paternal_surname" VARCHAR(100),
    "maternal_surname" VARCHAR(100),
    "mother_tongue" "mother_tongue" NOT NULL,
    "profile_created_by" "profile_createdby" NOT NULL,
    "family_background" "family_background" NOT NULL,
    "family_status" "family_status" NOT NULL,
    "residency_status" "residency_status" NOT NULL,
    "education_level" "education_level" NOT NULL,
    "bio" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "otp" VARCHAR(6),
    "is_premium" BOOLEAN DEFAULT false,
    "is_verified" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "migrations_filename_key" ON "migrations"("filename");

-- CreateIndex
CREATE UNIQUE INDEX "partnerPreference_profileId_key" ON "partnerPreference"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "partnerPreference" ADD CONSTRAINT "partnerPreference_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
