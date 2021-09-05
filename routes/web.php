<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonController;
use App\Http\Controllers\CompanyController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/persons', [PersonController::class, 'listPersons']);

Route::get('/ajax/persons', [PersonController::class, 'ajaxListPersons']);

Route::get('/persons/search', [PersonController::class, 'ajaxSearchAction']);

Route::post('/personsDelete', [PersonController::class, 'delete']);

Route::patch('/persons/edit', [PersonController::class, 'edit']);

Route::get('/companies', [CompanyController::class, 'list']);
