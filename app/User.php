<?php

namespace App;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Cache;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'surname', 'email', 'password', 'role_id', 'is_active', 'confirmed', 'confirmation', 'api_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'api_token', 'confirmation'
    ];

    public function role(){
        return $this->belongsTo(Role::class);
    }

    public function stations(){
        return $this->hasMany(Station::class);
    }

    public function logs(){
        return $this->hasMany(Log::class);
    }

    public function isAdmin(){
       return $this->role->name === 'admin';
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    public function rollApiKey(){
        do{
            $this->api_token = str_random(60);
        }while($this->where('api_token', $this->api_token)->exists());
        $this->save();
    }

    public function destroyToken(){
        $this->update(['api_token' => null]);
    }

    public function getRouteKeyName(){
        return 'email';
    }

}
