<?php

use Illuminate\Support\Facades\Auth;


Route::view('/', 'welcome')->middleware('guest');

Route::get('/account/verify/{code}', 'VerifyUserController@verify')->name('account.verify')->middleware('guest');

Auth::routes();

//Route::get('/example', function(){
//    return User::find(1)->stations()->with('categories')->find(1);
//});

Route::middleware('auth', 'preventHistory')->group(function(){
    Route::view('/dashboard', 'main');
    Route::view('/stations/all', 'main');
    Route::view('/stations/create', 'main');
    Route::view('/stations', 'main');
    Route::view('/stations/{station}/edit', 'main');
    Route::view('/stations/{station}/show', 'main');
    Route::view('/users/create', 'main');
    Route::view('/users', 'main');
    Route::view('/categories', 'main');
    Route::view('/measures', 'main');
    Route::view('/graphs', 'main');
    Route::view('/profile/edit', 'main');
    Route::view('/profile/{user}', 'main');
    Route::view('/profile', 'main');
});





//************ME REACT*************
//Route::get('/auth', function() {
//    return view('example');
//});

//    if(is_string(request()->name)){
//        return 'true';
//    } else {
//        return 'false';
//    }
//    if(!is_null(request()->name) && !is_bool(request()->name) &&
//        trim(request()->name) !== '' && is_numeric(request()->name) ){
//            return 'true';
//            } else {
//            return 'false';
//    }


//********** Προσοχή
//$arr=[];
//    Collection::all()->each(function($collection) use (&$arr){
//        $arr[] = $collection;
//    });
//    dd($arr);

