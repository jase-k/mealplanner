INSERT INTO users (username, role_id, email) VALUES ('WalrusDentist', 20687, 'walrusdentist@ihaveaphd.com');
INSERT INTO Users (role_id, username, email) VALUES
(1, 'john_doe', 'john@example.com'),
(2, 'jane_smith', 'jane@example.com');

-- Insert sample Meals
INSERT INTO Meals (meal_name) VALUES
('Breakfast Delight'),
('Healthy Lunch'),
('Family Dinner');

-- Insert sample PlannedMeals
INSERT INTO PlannedMeals (user_id, meal_id, date, meal_type) VALUES
(1, 1, '2023-05-01', 'Breakfast'),
(1, 2, '2023-05-01', 'Lunch'),
(1, 3, '2023-05-01', 'Dinner'),
(2, 1, '2023-05-02', 'Breakfast'),
(2, 2, '2023-05-02', 'Lunch');

-- Insert sample Recipes
INSERT INTO Recipes (user_id, recipe_name, recipe_type, instructions, servings) VALUES
(1, 'Scrambled Eggs', 'Main', 'Beat eggs, cook in pan, season to taste.', 2),
(1, 'Green Salad', 'Side', 'Mix lettuce, tomatoes, and cucumber. Add dressing.', 4),
(2, 'Grilled Chicken', 'Main', 'Season chicken, grill until cooked through.', 4),
(2, 'Fruit Smoothie', 'Drink', 'Blend mixed fruits with yogurt and ice.', 2);

-- Insert sample Ingredients
INSERT INTO Ingredients (ingredient_name) VALUES
('Eggs'),
('Salt'),
('Pepper'),
('Lettuce'),
('Tomato'),
('Cucumber'),
('Chicken Breast'),
('Mixed Fruits'),
('Yogurt');

-- Insert sample RecipeIngredients
INSERT INTO RecipeIngredients (recipe_id, ingredient_id, quantity, unit) VALUES
(1, 1, 4, 'piece'),
(1, 2, 1, 'pinch'),
(1, 3, 1, 'pinch'),
(2, 4, 1, 'head'),
(2, 5, 2, 'piece'),
(2, 6, 1, 'piece'),
(3, 7, 2, 'piece'),
(4, 8, 2, 'cup'),
(4, 9, 1, 'cup');

-- Insert sample MealRecipes
INSERT INTO MealRecipes (meal_id, recipe_id) VALUES
(1, 1),
(1, 4),
(2, 2),
(2, 3),
(3, 2),
(3, 3);

-- Insert sample ShoppingListItems
INSERT INTO ShoppingListItem (user_id, ingredient_id, quantity, unit, is_purchased) VALUES
(1, 1, 12, 'piece', false),
(1, 4, 2, 'head', false),
(1, 7, 4, 'piece', true),
(2, 8, 4, 'cup', false),
(2, 9, 2, 'cup', false);