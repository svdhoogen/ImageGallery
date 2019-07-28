<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use App\Image;
use App\User;

class CommentsController extends Controller
{
    public function getComments($imageId, Request $request) {
        $commentId = $request->input('commentId');

        if($commentId == -1) {
            $commentId = Comment::select('id')->latest('id')->first()->id;
        }

        $data = Comment::with('owner')
            ->select('comment', 'id', 'created_at', 'owner_id')->latest()
            ->where([['image_id', $imageId], ['id', '<=', $commentId]])->paginate(10);

        return $data;
    }

    public function getComment($commentId) {
        $data = Comment::with('owner')
            ->select('comment', 'id', 'created_at', 'owner_id')
            ->where('id', $commentId)->get();

        return $data[0];
    }

    public function store(Request $request) {
        $comment = Comment::prepareComment($request);

        $comment->save();

        return $comment->id;
    }

    public function destroy($id)
    {
        $comment = Comment::find($id);

        $this->authorize('delete', $comment);

        $comment->delete();
    }
}
