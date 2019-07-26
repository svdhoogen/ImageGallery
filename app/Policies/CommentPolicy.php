<?php

namespace App\Policies;

use App\User;
use App\Comment;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommentPolicy
{
    use HandlesAuthorization;

    /**
     * New policy that validates whether user has permission to delete project.
     *
     * @return boolean
     */
    public function delete(User $user, Comment $comment)
    {
        return $comment->owner_id == $user->id;
    }
}
