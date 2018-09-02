<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::post('auth', 'Auth\AuthenticateController@authenticate');
Route::post('auth-refresh', 'Auth\AuthenticateController@refreshToken');
Route::get('user', 'Auth\AuthenticateController@getAuthenticatedUser');

Route::group([
	// 'middleware' => 'jwt.auth', // Caso utilize sem trocar o guard no config/auth.php
	'middleware' => 'auth:api',
	'namespace' => 'Api',
	'prefix' => env('VERSION_API', 'v1')], function () {
	Route::get('categories/{id}/products', 'CategoryController@products');
	Route::apiResource('categories', 'CategoryController');
	Route::apiResource('products', 'ProductController');
});


