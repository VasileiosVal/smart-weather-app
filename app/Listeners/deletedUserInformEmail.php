<?php

namespace App\Listeners;

use App\Events\informDeletedUser;
use App\Mail\userDeleted;
use Illuminate\Support\Facades\Mail;

class deletedUserInformEmail
{
    public function handle(informDeletedUser $event)
    {
        try {
            Mail::to($event->user)->send(new userDeleted($event->user));
            return true;
        }catch (\Exception $e) {
            return false;
        }
    }
}
