<?php

namespace App\Listeners;

use App\Events\informSuspendedUser;
use App\Mail\userSuspended;
use Illuminate\Support\Facades\Mail;

class suspendedUserInformEmail
{
    public function handle(informSuspendedUser $event)
    {
        try {
            Mail::to($event->user)->send(new userSuspended($event->user));
            return true;
        }catch (\Exception $e) {
            return false;
        }
    }
}
