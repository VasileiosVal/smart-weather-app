<?php

namespace App\Http\Controllers\api;

use App\Events\informAdminsMailToDeletedUserNotSendedError;
use App\Events\informAdminsMailToSuspendedUserNotSendedError;
use App\Events\informDeletedUser;
use App\Events\informSuspendedUser;
use App\Events\userEdited;
use App\Events\userGeneralEdited;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function getAuth()
    {
        return [
            'lang' => App::getLocale(),
            'user' => request()->user()
        ];
    }

    public function index()
    {
        return request()->user()->isAdmin() ? User::all() : [];
    }


    public function store(Request $request)
    {
        if (request()->user()->isAdmin()) {
            $data = $request->validate([
                'email' => 'required|email|string|max:255|unique:users,email',
                'password' => 'required|string|min:6|max:255|confirmed',
                'name' => 'required|string|max:255',
                'surname' => 'required|string|max:255',
                'role_id' => 'required|integer|in:1,2'
            ]);
            $data['password'] = Hash::make($data['password']);
            $data['is_active'] = 1;
            $data['confirmed'] = now();

            return User::create($data);
        }
        if (request()->expectsJson()) {
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }


    public function update(Request $request, User $user)
    {
        $suspend = false;
        if (request()->user()->isAdmin() && $user->id !== 1 && $user->id !== request()->user()->id) {
            $data = $request->validate([
                'role_id' => 'required|integer|in:1,2',
                'is_active' => 'required|integer|in:0,1'
            ]);
            $user->fill($data);
            if ($user->isClean()) {
                return response()->json($user, 202);
            } else {
                if($user->isDirty('is_active') && !$user->is_active) $suspend = true;
                $user->save();
                event((new userEdited($user))->dontBroadcastToCurrentUser());
                event((new userGeneralEdited($user))->dontBroadcastToCurrentUser());
                if($suspend) {
                    $result = event(new informSuspendedUser($user));
                    if(!$result) event(new informAdminsMailToSuspendedUserNotSendedError($user->name));
                }
                return $user;
            }
        }
        if (request()->expectsJson()) {
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }


    public function destroy(User $user)
    {
        $name='';
        if (request()->user()->isAdmin() && $user->id !== 1 && $user->id !== request()->user()->id) {
            $name = $user->name;
            $result = event(new informDeletedUser($user));
            $user->delete();
            if(!$result) event(new informAdminsMailToDeletedUserNotSendedError($name));
            return $user;
        }
        if (request()->expectsJson()) {
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }

    public function deleteAccount(User $user)
    {
        if ($user->id === request()->user()->id && $user->id !== 1) {
            $user->delete();
            return $user;
        }
        if (request()->expectsJson()) {
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }

    public function editDetails(Request $request, User $user)
    {
        if ($user->id === request()->user()->id) {
            $data = $request->validate([
                'email' => 'required|email|string|max:255|unique:users,email,'.$user->id,
                'name' => 'required|string|max:255',
                'surname' => 'required|string|max:255',
            ]);
            $user->fill($data);
            if($user->isClean()){
                return response()->json($user, 202);
            } else {
                $user->save();
                event((new userEdited($user))->dontBroadcastToCurrentUser());
                return $user;
            }
        }
        if (request()->expectsJson()) {
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }

    public function editPassword(Request $request, User $user)
    {
        if ($user->id === request()->user()->id) {
            $data = $request->validate([
                'password' => 'required|string|min:6|max:255',
                'newPassword' => 'required|string|min:6|max:255|confirmed',
            ]);
            if (Hash::check($data['password'], $user->password)) {
                $data['newPassword'] = Hash::make($data['newPassword']);
                $user->update(['password' => $data['newPassword']]);
                return $user;
            } else {
                return response()->json([
                    __('messages.error') => __('messages.mismatched_password_error'),
                    'accept' => 1
                ], 422);
            }
        }
        if (request()->expectsJson()) {
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }
}