<?php


//****create new collection with measures endpoint
Route::post('/measures/input', 'api\CollectionController@createNewMeasure');


Route::middleware('auth:api', 'httpsProtocol')->group(function(){

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

    Route::delete('/collections/{collection}', 'api\CollectionController@destroy');
    //return collections::with(Measures) from given collection_ids array
    Route::post('/collections/measures', 'api\CollectionController@fetchCollectionsMeasures');
    //return stations(active/public) from other users and user's stations (only user)
    Route::get('/collections/stations', 'api\CollectionController@fetchStations');
    //return collections
    Route::get('/collections', 'api\CollectionController@index');

    //return highest/lowest measures per category
    Route::get('/measures/latest', 'api\MeasuresController@fetchLatest');
    //return all categories that have measures with stations-count
    Route::get('/measures/categories', 'api\MeasuresController@fetchAllCategories');
    //return from given station_id's array, all stations measures with specific category
    Route::post('/measures/category/stations', 'api\MeasuresController@fetchAllMeasuresFromSpecificStationsAndCategory');

});

