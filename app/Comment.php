<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Comment extends Model
{
    protected $guarded = [];

    public function owner() {
        return $this->belongsTo(User::class, 'owner_id')->select('id', 'name');
    }

    public function image() {
        return $this->belongsTo(Image::class, 'image_id');
    }

    public static function prepareComment(Request $request) {
        request()->validate([
            'comment' => ['required', 'min:3', 'max:255:'],
            'image_id' => ['required', 'numeric'],
        ]);

        $data = new Comment;

        $data['owner_id'] = auth()->id();

        $data['image_id'] = $request->image_id;

        $data['comment'] = $request->comment;

        return $data;
    }
}
