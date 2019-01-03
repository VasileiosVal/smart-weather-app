<?php

namespace App\Http\Controllers;

use App\Events\userEdited;
use App\User;

class VerifyUserController extends Controller
{
    public function verify($code){

        $user = User::where('confirmation', $code)->firstOrFail();
        if(!$user->confirmation){
            abort(404);
        }
        $user->update([
            'confirmed' => now(),
            'is_active' => true,
            'confirmation' => null
        ]);
        event((new userEdited($user))->dontBroadcastToCurrentUser());
        session()->flash('verified_user_success', __('messages.verified_user_success'));
        return redirect('/');

    }
}
