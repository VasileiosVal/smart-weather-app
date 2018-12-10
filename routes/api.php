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

//****create new collection with measures endpoint
Route::post('/measures/input', 'api\CollectionController@createNewMeasure');


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
    Route::post('/stations/admin', 'api\StationController@storeAdmin');
    Route::post('/stations/user', 'api\StationController@storeUser');
    Route::delete('/stations/{station}', 'api\StationController@destroy');
    Route::delete('/stations/{station}/admin', 'api\StationController@destroyFromAdmin');
    Route::patch('/stations/{station}/edit/admin', 'api\StationController@editAdmin');
    Route::patch('/stations/{station}/edit/user', 'api\StationController@editUser');
    Route::patch('/stations/{station}/all/edit', 'api\StationController@editAll');

    //return stations with collections (only user)
    Route::get('/collections/stations', 'api\CollectionController@fetchStations');

    //return collections
    Route::get('/collections', 'api\CollectionController@index');
    Route::get('/collections/other', 'api\CollectionController@fetchOther');

    //return measures
    Route::get('/collections/{collection}/admin', 'api\CollectionController@showAdmin');
    Route::get('/collections/{collection}/other', 'api\CollectionController@showOther');
    Route::get('/collections/{collection}/otherAndUser', 'api\CollectionController@showOtherAndUser');
    Route::get('/collections/{collection}', 'api\CollectionController@showOwn');
});

