<?php

namespace App\Providers;

use App\Category;
use App\Events\categoryCreated;
use App\Events\categoryDeleted;
use App\Events\categoryEdited;
use App\Events\userCreated;
use App\Events\userDeleted;
use App\Events\userGeneralDeleted;
use App\User;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Category::created(function($category){
            event((new categoryCreated($category))->dontBroadcastToCurrentUser());
        });

        //Category::updated() locates at CategoryController@update

        Category::deleting(function($category){
            event((new categoryDeleted($category))->dontBroadcastToCurrentUser());
        });

        User::created(function($user){
            event((new userCreated($user))->dontBroadcastToCurrentUser());
        });

        //User::updated() locates at UserController@update
        //update οταν ο user κανει confirm
        //update οταν ο user αλλαξει το δικο του profile

        User::deleting(function($user){
            event((new userDeleted($user))->dontBroadcastToCurrentUser());
            event((new userGeneralDeleted($user))->dontBroadcastToCurrentUser());
        });
    }

    /**cd
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
