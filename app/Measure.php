<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Measure extends Model
{
    protected $fillable = ['category_id', 'collection_id', 'value'];

    public function collection(){
        return $this->belongsTo(Collection::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }
}
