<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Station extends Model
{
    protected $fillable = ['unique', 'name', 'user_id', 'is_active', 'privacy', 'description', 'location'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function categories(){
        return $this->belongsToMany(Category::class);
    }

    public function collections(){
        return $this->hasMany(Collection::class);
    }

    public function getRouteKeyName(){
        return 'name';
    }
}
