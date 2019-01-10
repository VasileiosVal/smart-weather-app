<?php

namespace App\Providers;


use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\newUserRegistered' => [
            'App\Listeners\userEmailVerificationListener',
        ], 'App\Events\informDeletedUser' => [
            'App\Listeners\deletedUserInformEmail',
        ], 'App\Events\informSuspendedUser' => [
            'App\Listeners\suspendedUserInformEmail',
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
