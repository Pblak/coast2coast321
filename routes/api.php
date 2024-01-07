<?php

use App\Http\Controllers\Api\UserAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('login_cpanel', [UserAuthController::class, 'login_cpanel']);
Route::get('logout', [UserAuthController::class, 'logout']);
Route::post('register', [UserAuthController::class, 'register']);

Route::group(['prefix' => 'cPanel', 'middleware' => [ 'auth:sanctum']], function () {
    Route::post('user/update', [App\Http\Controllers\Api\UserAuthController::class, 'update']);
// house controllers
    Route::post('house/store', [App\Http\Controllers\Api\HouesController::class, 'store']);
    Route::post('house/update_house', [App\Http\Controllers\Api\HouesController::class, 'update_house']);
    Route::post('house/get_house', [App\Http\Controllers\Api\HouesController::class, 'get_house']);
    Route::get('house/get_all', [App\Http\Controllers\Api\HouesController::class, 'get_all']);

    Route::get('user/get_all', [App\Http\Controllers\Api\UserAuthController::class, 'get_all']);


    /*Route::get('book/get_all', [App\Http\Controllers\Api\BookController::class, 'get_all']);
    Route::get('book/get_levels', [App\Http\Controllers\Api\BookController::class, 'get_levels']);
    Route::get('quiz/get_all', [App\Http\Controllers\Api\QuizController::class, 'get_all']);
    Route::post('quiz/store', [App\Http\Controllers\Api\QuizController::class, 'store']);
    Route::post('competition/store', [App\Http\Controllers\Api\CompetitionController::class, 'store']);
    Route::post('competition/delete', [App\Http\Controllers\Api\CompetitionController::class, 'delete_competition']);
    Route::get('competition/get_all', [App\Http\Controllers\Api\CompetitionController::class, 'get_all']);*/
});
