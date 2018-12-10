<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    protected $fillable = ['series_hash', 'station_id'];

    public function station(){
        return $this->belongsTo(Station::class);
    }

    public function measures(){
        return $this->hasMany(Measure::class);
    }

    public static function roleHashCode(){
        do{
            $hash = str_random(20);
        }while(self::where('series_hash', $hash)->exists());
        return $hash;
    }

    public function getRouteKeyName()
    {
        return 'series_hash';
    }
}
