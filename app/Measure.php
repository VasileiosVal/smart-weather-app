<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Measure extends Model
{
    protected $fillable = ['category_id', 'collection_id', 'value'];

    protected $casts = ['category_id' => 'integer', 'collection_id' => 'integer'];

    public function collection(){
        return $this->belongsTo(Collection::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }
}
