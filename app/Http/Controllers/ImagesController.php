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
        request()->validate([
            'title' => ['required', 'min:3', 'max:255:'],
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:4096']
        ]);

        $image = new Image;

        $image['owner_id'] = auth()->id();

        $image['title'] = $request->title;

        $image['path'] = $image->storeImage($request->file('image'));

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
