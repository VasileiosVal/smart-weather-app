<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'symbol'];

    protected $hidden = ['updated_at'];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'symbol' => 'string'
    ];

    public function stations(){
        return $this->belongsToMany(Station::class);
    }

    public function measures(){
        return $this->hasMany(Measure::class);
    }

    public function takeMinMeasure(){
        return $this->measures()->orderBy('value')->get()->first();
    }
    public function takeMaxMeasure(){
        return $this->measures()->orderBy('value')->get()->last();
    }

    public function measuresAllowedForUser($user){
        $allow = false;
        $this->measures->each(function($measure) use(&$user, &$allow){
            if (Measure::checkMeasureAllowance($measure, $user)) $allow = true;
        });
        return $allow;
    }

    public function takeMinMeasureAllowForUser($user){
        return $this->measures()->orderBy('value')->get()->filter(function($measure) use(&$user){
            return (Measure::checkMeasureAllowance($measure, $user));
        })->first();
    }

    public function takeMaxMeasureAllowForUser($user){
        return $this->measures()->orderBy('value')->get()->filter(function($measure) use(&$user){
            return (Measure::checkMeasureAllowance($measure, $user));
        })->last();
    }

    public function getRouteKeyName()
    {
        return 'name';
    }

}
