<?php
// Start session if not already started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Handle different actions
$action = $_GET['action'] ?? 'nutrition';

switch ($action) {
    case 'water':
        require_once "controller/WaterController.php";
        $waterController = new WaterController();
        $waterController->handleRequest();
        break;
        
    case 'workout':
        require_once "view/WorkoutList.php";
        break;
        
    case 'nutrition':
    default:
        require_once "model/meal_model.php";
        require_once "controller/meal_controller.php";

        $model = new MealModel();
        $controller = new MealController($model);

        include "view/NutritionLog.php";
        break;
}