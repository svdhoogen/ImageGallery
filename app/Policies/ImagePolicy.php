<?php

namespace App\Policies;

use App\User;
use App\Image;
use Illuminate\Auth\Access\HandlesAuthorization;

class ImagePolicy
{
    use HandlesAuthorization;

    /**
     * New policy that validates whether user has permission to delete project.
     *
     * @return boolean
     */
    public function delete(User $user, Image $image)
    {
        return $image->owner_id == $user->id;
    }
}
