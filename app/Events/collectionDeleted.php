<?php

namespace App\Events;

use App\Collection;
use App\Station;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class collectionDeleted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $collection;
    public $station;

    public function __construct(Collection $collection, Station $station)
    {
        $this->collection = $collection;
        $this->station = $station;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('private_user');
    }
}
