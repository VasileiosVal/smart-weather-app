<?php

use App\User;
use Illuminate\Support\Facades\Auth;

Route::get('/', function (){
   return view('welcome');
});

Route::get('account/verify/{code}', 'VerifyUserController@verify')->name('account.verify');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/auth', function (){
    return view('example');
})->middleware('auth');


//************ME REACT*************
//Route::get('/', function() {
//    return view('example');
//});


//
//Route::post('/api/users', function (Request $request){
//
//    $validator = Validator::make($request->all(), [
//        'username' => 'required|min:1',
//        'surname' => 'required|max:1'
//    ]);
//    if ($validator->fails())
//    {
//
//        return response()->json(['errors'=>$validator->errors()->all()]);
//    }
//
//
//});

//Route::get('/{path?}', function(){
//    return view('welcome');
//})->where('path', '^((?!api).)*$');

//Route::get('/api/create', function(){
//    if(request()->ajax()){
//
//        $users = User::all();
//        return response()->json($users);
//    }else {
//        abort(404);
//    }
//});

//Event::listen('eloquent.created:App\Post', function(){
//
//});








