<?php

namespace App\Events;

use App\Collection;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class newCollectionWithMeasuresCreatedWithUserStationOwner implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $collection;
    public $stationName;

    public function __construct(Collection $collection, $stationName='')
    {
        $this->collection = $collection;
        $this->stationName = $stationName;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return ['collection'];
    }
}