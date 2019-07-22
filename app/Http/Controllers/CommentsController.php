<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\Image;
use App\User;

class CommentsController extends Controller
{
    public function getComments($imageId) {
        $data = Comment::with('owner')
            ->select('comment', 'id', 'created_at', 'owner_id')->latest()
            ->where('image_id', $imageId)->paginate(10);

        return $data;
    }

    public function getComment($commentId) {
        $data = Comment::with('owner')
            ->select('comment', 'id', 'created_at', 'owner_id')
            ->where('id', $commentId)->get();

        return $data[0];
    }

    public function store(Request $request) {
        $comment = new Comment;

        $comment = $comment->prepareComment($request);

        $comment->save();

        return $comment->id;
    }
}
