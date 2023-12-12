const validateRecipeInput = (body) => {
    return body.recipeId &&
        body.title &&
        body.summary &&
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

const validateSavedRecipeInput = (body) => {
    return body.recipeId &&
        body.title &&
        body.summary &&
        body.creditsText &&
        body.sourceName &&
        body.sourceUrl &&
        body.image &&
        body.imageType &&
        body.readyInMinutes &&
        body.servings &&
        body.pricePerServing &&
        body.analyzedInstructions &&
        body.cuisines &&
        body.dishTypes &&
        body.diets &&
        body.nutrition
};

const validateShoppingInput = (body) => {
    return body.userId &&
        body.name &&
        body.image &&
        body.origPrice &&
        body.price &&
        body.amount;
};

module.exports = {
    validateRecipeInput,
    validateSavedRecipeInput,
    validateShoppingInput
};