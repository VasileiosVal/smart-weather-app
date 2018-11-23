<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\App;

class UserController extends Controller
{
    public function getAuth() {
        return auth()->user() ? response()->json(['auth' => true, 'role' => auth()->user()->isAdmin(), 'lang' => App::getLocale()], 200) : response()->json(['auth' => false], 401) ;
    }
}
