<?php

namespace App\Events;

use App\Collection;
use App\Station;
use App\User;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class collectionDeletedBelongToUserStation implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $collection;
    public $station;
    public $user;

    public function __construct(Collection $collection, Station $station, User $user)
    {
        $this->collection = $collection;
        $this->station  = $station;
        $this->user = $user;

    }

    public function broadcastOn()
    {
        return ['collection'];
    }
}
