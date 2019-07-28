<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Policies\ImagePolicy;
use App\Image;
use App\Comment;
use Illuminate\Support\Facades\File;

class ImagesController extends Controller
{
    public function index(Image $image)
    {
        return view('images.index', compact('image'));
    }

    public function create()
    {
        if (!auth()->check()) {
            return redirect('/images');
        }

        return view('images.create');
    }

    public function store(Request $request)
    {
        $image = Image::prepareImage($request);

        $image->save();

        return $image->id;
    }

    public function show(Image $image)
    {
        return view('images.show', compact('image'));
    }

    public function destroy(Image $image)
    {
        $this->authorize('delete', $image);

        File::delete($image->path);

        $image->delete();
    }
}
