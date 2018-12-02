<?php


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


Route::middleware('auth:api')->group(function(){



    Route::get('/categories', 'api\CategoryController@index');
    Route::post('/categories', 'api\CategoryController@store');
    Route::delete('/categories/{category}', 'api\CategoryController@destroy');
    Route::patch('/categories/{category}', 'api\CategoryController@update');

    Route::get('/user', 'api\UserController@getAuth');

    Route::get('/users', 'api\UserController@index');
    Route::post('/users', 'api\UserController@store');
    Route::delete('/users/{user}', 'api\UserController@destroy');
    Route::patch('/users/{user}', 'api\UserController@update');

    Route::delete('/profile/{user}', 'api\UserController@deleteAccount');
    Route::patch('/profile/{user}/edit/details', 'api\UserController@editDetails');
    Route::patch('/profile/{user}/edit/password', 'api\UserController@editPassword');

    Route::get('/stations', 'api\StationController@index');




});

