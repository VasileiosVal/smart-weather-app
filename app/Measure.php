<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Measure extends Model
{
    protected $fillable = ['category_id', 'collection_id', 'value'];

    protected $hidden = ['created_at', 'updated_at'];

    protected $casts = ['category_id' => 'integer', 'collection_id' => 'integer'];

    public function collection(){
        return $this->belongsTo(Collection::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public static function checkMeasureAllowance($measure, $user){
        return $measure->collection->station->user_id === $user->id || (
                $measure->collection->station->user_id !== $user->id && (
                    $measure->collection->station->is_active &&
                    $measure->collection->station->privacy === 'public'
                )
            );
    }
}
