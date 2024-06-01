<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PlayerController;
use App\Http\Controllers\API\ContratController;
use App\Http\Controllers\API\EquipeController;
use App\Http\Controllers\API\MatchsController;
use App\Http\Controllers\API\EntrainementsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use PhpParser\Node\Expr\Match_;

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


// ************* Code personnel Starting *************** //

Route::post('register', [AuthController::class, 'registers']);
Route::post('login', [AuthController::class, 'logins']);

// Player
Route::post('store-player', [PlayerController::class, 'store']);
Route::get('display-player', [PlayerController::class, 'index']);
Route::get('edit-player/{id}', [PlayerController::class, 'edit']);
Route::post('update-player/{id}', [PlayerController::class, 'update']);
Route::delete('delete-player/{id}', [PlayerController::class, 'destroy']);
Route::get('Allplayer', [PlayerController::class, 'allPlayer']);

// Player
Route::post('store-contrat', [ContratController::class, 'storage']);
Route::get('display-contrat', [ContratController::class, 'index']);
Route::get('display-contrat_2', [ContratController::class, 'index_2']);
Route::get('edit-contrat/{id}', [ContratController::class, 'edit']);
Route::post('update-contrat/{id}', [ContratController::class, 'update']);
Route::delete('delete-contrat/{id}', [ContratController::class, 'destroy']);

// Equipe
Route::post('store-equipe', [EquipeController::class, 'store']);
Route::get('display-equipe', [EquipeController::class, 'index']);
Route::get('edit-equipe/{id}', [EquipeController::class, 'edit']);
Route::post('update-equipe/{id}', [EquipeController::class, 'update']);
Route::delete('delete-equipe/{id}', [EquipeController::class, 'destroy']);

// Matchs
Route::post('store-match', [MatchsController::class, 'storage']);
Route::get('display-match', [MatchsController::class, 'index']);
Route::get('edit-match/{id}', [MatchsController::class, 'edit']);
Route::post('update-match/{id}', [MatchsController::class, 'update']);
Route::delete('delete-match/{id}', [MatchsController::class, 'destroy']);

// Entrainement
Route::post('store-entrainmt', [EntrainementsController::class, 'storage']);
Route::get('display-entrainmt', [EntrainementsController::class, 'index']);
Route::get('edit-entrainmt/{id}', [EntrainementsController::class, 'edit']);
Route::post('update-entrainmt/{id}', [EntrainementsController::class, 'update']);
Route::delete('delete-entrainmt/{id}', [EntrainementsController::class, 'destroy']);


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/checkingAuthenticated', function () {
        return response()->json(['message'=>'You are in','status'=>200], 200);
    });

    Route::post('logout', [AuthController::class, 'logouts']);

});

// ************* Code personnel Ending *************** //


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
