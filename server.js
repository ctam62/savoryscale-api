require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.static("./public"));

const mealTypeRoutes = require("./routes/meal-type-routes");
app.use("/api/mealtypes", mealTypeRoutes);

const userRoutes = require("./routes/user-routes");
app.use("/api/user", userRoutes);

const userRecipeRoutes = require("./routes/recipe-routes");
app.use("/api/recipe/user", userRecipeRoutes);

const userScaledRecipeRoutes = require("./routes/scaled-recipe-routes");
app.use("/api/recipe/user", userScaledRecipeRoutes);

const userSavedRecipeRoutes = require("./routes/saved-recipe-routes");
app.use("/api/recipe/user", userSavedRecipeRoutes);

const userShoppingRoutes = require("./routes/shopping-routes");
app.use("/api/shopping/user/", userShoppingRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});