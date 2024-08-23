-- Drop the database if it exists
DROP DATABASE IF EXISTS mealplanner;

-- Create the database
CREATE DATABASE mealplanner;

-- Connect to the database
\c mealplanner

-- Create enum types
CREATE TYPE recipe_type AS ENUM ('Main', 'Side', 'Dessert', 'Drink', 'Snack');
CREATE TYPE meal_type AS ENUM ('Breakfast', 'Lunch', 'Dinner', 'Morning Snack', 'Afternoon Snack', 'Evening Snack');

-- Create Users table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    role_id BIGINT UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Meals table
CREATE TABLE Meals (
    meal_id SERIAL PRIMARY KEY,
    meal_name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create PlannedMeals table
CREATE TABLE PlannedMeals (
    planned_meal_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    meal_id INTEGER REFERENCES Meals(meal_id) ON UPDATE CASCADE ON DELETE CASCADE,
    date DATE NOT NULL,
    meal_type meal_type NOT NULL
);


-- Create Recipes table
CREATE TABLE Recipes (
    recipe_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id),
    recipe_name VARCHAR(100) UNIQUE NOT NULL,
    recipe_type recipe_type NOT NULL,
    instructions TEXT,
    servings INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Ingredients table
CREATE TABLE Ingredients (
    ingredient_id SERIAL PRIMARY KEY,
    ingredient_name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create RecipeIngredients table (junction table for Recipes and Ingredients)
CREATE TABLE RecipeIngredients (
    recipe_id INTEGER REFERENCES Recipes(recipe_id) ON UPDATE CASCADE ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES Ingredients(ingredient_id),
    quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20),
    PRIMARY KEY (recipe_id, ingredient_id)
);

-- Create MealRecipes table (junction table for Meals and Recipes)
CREATE TABLE MealRecipes (
    meal_id INTEGER REFERENCES Meals(meal_id) ON UPDATE CASCADE ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES Recipes(recipe_id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (meal_id, recipe_id)
);

-- Create ShoppingList table
CREATE TABLE ShoppingListItem (
    item_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id),
    ingredient_id INTEGER REFERENCES Ingredients(ingredient_id),
    quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20),
    is_purchased BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better query performance
CREATE INDEX idx_plannedmeals_user_id ON PlannedMeals(user_id);
CREATE INDEX idx_meals_planned_meal_id ON PlannedMeals(planned_meal_id);
CREATE INDEX idx_recipes_user_id ON Recipes(user_id);
CREATE INDEX idx_shoppinglistitem_user_id ON ShoppingListItem(user_id);