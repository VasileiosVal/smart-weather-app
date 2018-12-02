<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'symbol'];

    public function stations(){
        return $this->belongsToMany(Station::class);
    }

    public function measures(){
        return $this->hasMany(Measure::class);
    }

    public function getRouteKeyName()
    {
        return 'name';
    }

}
