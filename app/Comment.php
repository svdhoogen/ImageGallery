<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = [];

    public function owner() {
        return $this->belongsTo(User::class, 'owner_id')->select('id', 'name');
    }

    public function image() {
        return $this->belongsTo(Image::class, 'image_id');
    }
}
