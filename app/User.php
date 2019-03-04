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


    protected $fillable = ['name', 'surname', 'email', 'password', 'role_id', 'is_active', 'confirmed', 'confirmation', 'api_token'];

    protected $hidden = ['password', 'remember_token', 'api_token', 'confirmation', 'updated_at'];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'surname' => 'string',
        'password' => 'string',
        'email' => 'string',
        'role_id' => 'integer',
        'is_active' => 'integer'];

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
        }while(self::where('api_token', $this->api_token)->exists());
        $this->save();
    }

    public function destroyToken(){
        $this->update(['api_token' => null]);
    }

    public function getRouteKeyName(){
        return 'email';
    }

}
