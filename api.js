// api.js - Handles API calls for the EcoBites project

const BASE_URL = "http://localhost:5000";

// Helper function to make API calls
async function apiCall(endpoint, method = "GET", data = null) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "API call failed");
        }
        return result;
    } catch (error) {
        console.error("API Error:", error);
        return { success: false, message: error.message };
    }
}

// User Authentication
async function registerUser(userData) {
    return apiCall("/users/register", "POST", userData);
}

async function loginUser(userData) {
    const response = await apiCall("/users/login", "POST", userData);
    if (response.success) {
        localStorage.setItem("loggedInUser", JSON.stringify(response.user));
    }
    return response;
}

async function logoutUser() {
    const response = await apiCall("/users/logout", "POST");
    if (response.success) {
        localStorage.removeItem("loggedInUser");
    }
    return response;
}

// Fetch Recipes
async function fetchRecipes() {
    return apiCall("/recipes/");
}

async function fetchRecipeById(recipeId) {
    return apiCall(`/recipes/${recipeId}`);
}

// Submit a Recipe
async function createRecipe(recipeData) {
    return apiCall("/recipes/", "POST", recipeData);
}

// Update a Recipe
async function updateRecipe(recipeId, updatedData) {
    return apiCall(`/recipes/${recipeId}`, "PATCH", updatedData);
}

// Delete a Recipe
async function deleteRecipe(recipeId) {
    return apiCall(`/recipes/${recipeId}`, "DELETE");
}

// Favorites Management
async function addToFavorites(recipeId) {
    return apiCall("/favorites/add", "POST", { recipeId });
}

async function removeFromFavorites(recipeId) {
    return apiCall(`/favorites/remove`, "DELETE", { recipeId });
}

async function fetchFavorites(userId) {
    return apiCall(`/favorites/${userId}`);
}

// Fetch User Profile
async function fetchUserProfile() {
    return apiCall("/users/profile");
}

// Export functions for use in other scripts
export {
    registerUser,
    loginUser,
    logoutUser,
    fetchRecipes,
    fetchRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    addToFavorites,
    removeFromFavorites,
    fetchFavorites,
    fetchUserProfile,
};
