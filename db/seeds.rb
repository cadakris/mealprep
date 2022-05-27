# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)]

puts 'seeding recipes'

User.destroy_all

# Recipe.create(
#     recipe_name: "Butternut Squash",
#     ingredients: ["Squash", "Garlic", "Shrimp"],
#     instructions: ["Do this", "then do this"],
#     categories: ["lunch", "dinner"],
#     comment: "Awesome",
# )

# Recipe.create(
#     recipe_name: "Pizza",
#     ingredients: ["Sauce", "Garlic", "Crust"],
#     instructions: ["Do this", "then do this"],
#     categories: ["breakfast"],
#     comment: "Love pizza!",
# )

# Recipe.create(
#     recipe_name: "Butter",
#     ingredients: ["Things"],
#     instructions: ["Do this", "then do this"],
#     categories: ["dinner"],
#     comment: "Butter on everything",
# )

# puts 'seeding users'
# User.create!(
#     full_name: "Antoinette Manigbas",
#     username: "Anto",
#     password_digest: '',
#     email_address: "anto@gmail.com",
#     password: "idk",
# )

# User.create!(
#     full_name: "Marlon Nepomuceo",
#     username: "Marlo",
#     password_digest: '',
#     email_address: "marlo@gmail.com",
#     password: "idk",
# )

# puts 'seeding days'
# Day.create(
#     user_id: 1,
#     title_day: "Recipes"
# )

# Day.create(
#     user_id: 1,
#     title_day: "Monday"
# )

# Day.create(
#     user_id: 1,
#     title_day: "Tuesday"
# )

# Day.create(
#     user_id: 1,
#     title_day: "Wednesday"
# )

# Day.create(
#     user_id: 1,
#     title_day: "Thursday"
# )

# Day.create(
#     user_id: 1,
#     title_day: "Friday"
# )

# Day.create(
#     user_id: 1,
#     title_day: "Saturday"
# )

# Day.create(
#     user_id: 1,
#     title_day: "Sunday"
# )



# puts  "meal_recipe_day"

# MealRecipeDay.create(
#     recipe_id: 1,
#     day_id: 1,
# )

# MealRecipeDay.create(
#     recipe_id: 2,
#     day_id: 1,
# )

# MealRecipeDay.create(
#     recipe_id: 3,
#     day_id: 1,
# )

puts "finished seeding data"