<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\Image;

class CommentsController extends Controller
{
    public function getComments($imageId) {
        $data = Comment::with('owner')
            ->select('comment', 'id', 'created_at', 'owner_id')->latest()
            ->where('image_id', $imageId)->paginate(10);

        return $data;
    }

    public function store(Request $request) {
        request()->validate([
            'comment' => ['required', 'min:3', 'max:255:'],
            'image_id' => ['required', 'numeric'],
        ]);

        $comment = new comment;

        $comment['owner_id'] = auth()->id();

        $comment['image_id'] = $request->image_id;

        $comment['comment'] = $request->comment;

        $comment->save();
    }
}
