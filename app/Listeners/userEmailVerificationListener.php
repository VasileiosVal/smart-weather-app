<?php

namespace App\Listeners;

use App\Events\newUserRegistered;
use App\Mail\userVerification;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class userEmailVerificationListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  newUserRegistered $event
     * @return void
     */
    public function handle(newUserRegistered $event)
    {
        try{
            Mail::to($event->user)->send(new userVerification($event->user));
            return true;
        }catch (\Exception $e) {
            return false;
        }
    }
}