const validateRecipeInput = (body) => {
    return body.userId &&
        body.recipeId &&
        body.title &&
        body.summary &&
        body.vegetarian &&
        body.vegan &&
        body.glutenFree &&
        body.dairyFree &&
        body.veryHealthy &&
        body.veryPopular &&
        body.creditsText &&
        body.sourceName &&
        body.sourceUrl &&
        body.image &&
        body.imageType &&
        body.readyInMinutes &&
        body.origServings &&
        body.servings &&
        body.pricePerServing &&
        body.analyzedInstructions &&
        body.cuisines &&
        body.dishTypes &&
        body.diets &&
        body.nutrition &&
        body.ingredients &&
        body.totalCost &&
        body.equipment;
};

module.exports = { validateRecipeInput };