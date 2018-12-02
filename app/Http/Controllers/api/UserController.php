<?php

namespace App\Http\Controllers\api;

use App\Events\newUserRegistered;
use App\Events\userEdited;
use App\Events\userGeneralEdited;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function getAuth() {
        return response()->json([
            'lang' => App::getLocale(),
            'user' => [
                'name' => request()->user()->name,
                'surname' => request()->user()->surname,
                'email' => request()->user()->email,
                'role_id' => request()->user()->role_id,
                'is_active' => request()->user()->is_active ? true : false,
                'stations' => request()->user()->stations,
                'confirmed' => request()->user()->confirmed,
                'created_at' => request()->user()->created_at,
                'updated_at' => request()->user()->updated_at
            ]
            ], 200) ;
    }

    public function index() {
        if(request()->user()->isAdmin()) {
            return User::with('stations')->get();
        }
        if(request()->expectsJson()){
            return response()->json(['error' => 'forbidden'], 403);
        } else {
            abort(403);
        }
    }


    public function store(Request $request)
    {
        if(request()->user()->isAdmin()){
            $data = $request->validate([
                'email' => 'required|email|string|unique:users,email',
                'password' => 'required|string|min:6|confirmed',
                'name' => 'required|string',
                'surname' => 'required|string',
                'role_id' => 'required|integer|in:1,2'
            ]);
            $data['password'] = Hash::make($request->password);
            $data['is_active'] = 1;
            $data['confirmed'] = now();

            $user = User::create($data);

            return response()->json($user, 201);
        }
        if(request()->expectsJson()){
            return response()->json(['error' => 'forbidden'], 403);
        } else {
            abort(403);
        }
    }


    public function show($id)
    {
        //
    }


    public function update(Request $request, User $user)
    {
        if(request()->user()->isAdmin() && $user->id !== 1 && $user->id !== request()->user()->id){
            $data = $request->validate([
                'role_id' => 'required|integer|in:1,2',
                'is_active' => 'required|integer|in:0,1'
            ]);
            $user->update($data);
            event((new userEdited($user))->dontBroadcastToCurrentUser());
            event((new userGeneralEdited($user))->dontBroadcastToCurrentUser());
            return response()->json($user, 200);
        }
        if(request()->expectsJson()){
            return response()->json(['error'=>'forbidden'], 403);
        }else{
            abort(403);
        }
    }


    public function destroy(User $user)
    {
        if(request()->user()->isAdmin() && $user->id !== 1 && $user->id !== request()->user()->id ){
            if ($user->delete()) {
                return response()->json($user, 200);
            }
        }
        if(request()->expectsJson()){
            return response()->json(['error'=>'forbidden'], 403);
        }else{
            abort(403);
        }
    }

    public function deleteAccount(User $user){
        if($user->id === request()->user()->id && $user->id !== 1){
            if($user->delete()){
                return response()->json($user, 200);
            }
        }
        if(request()->expectsJson()){
            return response()->json(['error'=>'forbidden'], 403);
        }else{
            abort(403);
        }
    }

    public function editDetails(Request $request, User $user){
        if($user->id === request()->user()->id){
            $data = $request->validate([
                'email' => 'required|email|string|unique:users,email,'.$user->id,
                'name' => 'required|string',
                'surname' => 'required|string',
            ]);
            $user->update($data);
            event((new userEdited($user))->dontBroadcastToCurrentUser());
            return response()->json($user, 200);
        }
        if(request()->expectsJson()){
            return response()->json(['error'=>'forbidden'], 403);
        }else{
            abort(403);
        }
    }

    public function editPassword(){

    }

//    public function getUser() {
//        $user = User::findOrFail(13);
//        $user->update(['name'=>'emeis']);
//        event(new newUserRegistered($user));
//        return response()->json(['user'=>request()->user()], 200);
//    }
}
