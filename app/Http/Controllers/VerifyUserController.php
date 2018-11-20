<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class VerifyUserController extends Controller
{
    public function verify($code){
        $user = User::where('confirmation', $code)->firstOrFail();
        if($user){
            if(!$user->confirmation){
                abort(404);
            }
            $user->update([
                'confirmed' => now(),
                'is_active' => true,
                'confirmation' => null
            ]);
            session()->flash('verified_user_success', __('messages.verified_user_success'));
            return redirect('/');
        }else{
            abort(404);
        }
    }
}
