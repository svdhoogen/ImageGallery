<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $guarded = [];

    public function owner() {
        return $this->belongsTo(User::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class, 'image_id');
    }

    public function storeImage($image)
    {
        $imageName = time() . '.' . $image->getClientOriginalExtension();

        $imageDir = 'image/user';

        $image->move($imageDir, $imageName);

        return $imageDir . '/' . $imageName;
    }
}
