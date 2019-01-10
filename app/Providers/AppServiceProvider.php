<?php

namespace App\Providers;

use App\Category;
use App\Events\categoryCreated;
use App\Events\categoryDeleted;
use App\Events\stationAllScenariosInformUsersOnMeasures;
use App\Events\userCreated;
use App\Events\userDeleted;
use App\Events\userGeneralDeleted;
use App\User;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

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

        User::deleting(function($user){
            event((new userDeleted($user))->dontBroadcastToCurrentUser());
            event((new userGeneralDeleted($user))->dontBroadcastToCurrentUser());
            if($user->stations()->count()){
                $stations = $user->stations()->pluck('id');
                event((new stationAllScenariosInformUsersOnMeasures($stations))->dontBroadcastToCurrentUser());
            }
        });

        //Station::created() locates at StationController

        //Station::deleting() locates at StationController

        //Station::edited() locates at StationController

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
