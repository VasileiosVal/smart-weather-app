<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class needForRender implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public function broadcastOn()
    {
        return ['station'];
    }
}
