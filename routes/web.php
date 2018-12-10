<?php

use App\Station;
use Illuminate\Support\Facades\Auth;

Route::get('/', function (){
   return view('welcome');
})->middleware('guest');

Route::get('/account/verify/{code}', 'VerifyUserController@verify')->name('account.verify')->middleware('guest');

Auth::routes();

//Route::get('/example', function(){
//    return Station::where('user_id', '!=', 12)->where('is_active', 1)->where('privacy', 'public')->orWhere('user_id', 12)->get();
//});

Route::get('/home', 'HomeController@index')->name('home')->middleware('auth', 'preventHistory');


Route::view('/dashboard', 'main')->middleware('auth', 'preventHistory');
Route::view('/stations/all', 'main')->middleware('auth', 'preventHistory');
Route::view('/stations/create', 'main')->middleware('auth', 'preventHistory');
Route::view('/stations', 'main')->middleware('auth', 'preventHistory');
Route::view('/stations/{station}/edit', 'main')->middleware('auth', 'preventHistory');
Route::view('/users/create', 'main')->middleware('auth', 'preventHistory');
Route::view('/users', 'main')->middleware('auth', 'preventHistory');
Route::view('/categories', 'main')->middleware('auth', 'preventHistory');
Route::view('/measures/all', 'main')->middleware('auth', 'preventHistory');
Route::view('/measures/other', 'main')->middleware('auth', 'preventHistory');
Route::view('/measures', 'main')->middleware('auth', 'preventHistory');
Route::view('/history', 'main')->middleware('auth', 'preventHistory');
Route::view('/profile/edit', 'main')->middleware('auth', 'preventHistory');
Route::view('/profile', 'main')->middleware('auth', 'preventHistory');



//************ME REACT*************
//Route::get('/auth', function() {
//    return view('example');
//});

