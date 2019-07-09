<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $guarded = [];

    public function owner() {
        return $this->belongsTo(User::class);
    }
}
