<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Image extends Model
{
    protected $guarded = [];

    public function owner() {
        return $this->belongsTo(User::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class, 'image_id');
    }

    public static function prepareImage($request) {
        request()->validate([
            'title' => ['required', 'min:3', 'max:255:'],
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:4096']
        ]);

        $data = new Image;

        $data['owner_id'] = auth()->id();

        $data['title'] = $request->title;

        $data['path'] = $data->storeImage($request->file('image'));

        return $data;
    }

    public function storeImage($image)
    {
        $imageName = time() . '.' . $image->getClientOriginalExtension();

        $imageDir = 'image/user';

        $image->move($imageDir, $imageName);

        return $imageDir . '/' . $imageName;
    }
}
