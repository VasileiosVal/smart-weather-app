<?php

use App\Category;
use App\Collection;
use App\Station;
use App\User;
use Illuminate\Support\Facades\Auth;

Route::get('/', function (){
   return view('welcome');
})->middleware('guest');

Route::get('/account/verify/{code}', 'VerifyUserController@verify')->name('account.verify')->middleware('guest');

Auth::routes();

//Route::get('/example', function(){
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
//});

//********** Προσοχή
//$arr=[];
//    Collection::all()->each(function($collection) use (&$arr){
//        $arr[] = $collection;
//    });
//    dd($arr);


Route::get('/home', 'HomeController@index')->name('home')->middleware('auth', 'preventHistory');


Route::view('/dashboard', 'main')->middleware('auth', 'preventHistory');
Route::view('/stations/all', 'main')->middleware('auth', 'preventHistory');
Route::view('/stations/create', 'main')->middleware('auth', 'preventHistory');
Route::view('/stations', 'main')->middleware('auth', 'preventHistory');
Route::view('/stations/{station}/edit', 'main')->middleware('auth', 'preventHistory');
Route::view('/stations/{station}/show', 'main')->middleware('auth', 'preventHistory');
Route::view('/users/create', 'main')->middleware('auth', 'preventHistory');
Route::view('/users', 'main')->middleware('auth', 'preventHistory');
Route::view('/categories', 'main')->middleware('auth', 'preventHistory');
Route::view('/measures', 'main')->middleware('auth', 'preventHistory');
Route::view('/graphs', 'main')->middleware('auth', 'preventHistory');
Route::view('/profile/edit', 'main')->middleware('auth', 'preventHistory');
Route::view('/profile/{user}', 'main')->middleware('auth', 'preventHistory');
Route::view('/profile', 'main')->middleware('auth', 'preventHistory');



//************ME REACT*************
//Route::get('/auth', function() {
//    return view('example');
//});

