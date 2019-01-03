<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Station extends Model
{
    protected $fillable = ['unique', 'name', 'user_id', 'is_active', 'privacy', 'description', 'location'];

    protected $hidden = ['updated_at'];

    protected $casts = [
        'id' => 'integer',
        'unique' => 'string',
        'name' => 'string',
        'privacy' => 'string',
        'location' => 'string',
        'user_id' => 'integer',
        'is_active' => 'integer'
    ];

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
