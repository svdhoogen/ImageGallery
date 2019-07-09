<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Policies\ImagePolicy;
use App\Image;

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

        $attributes['owner_id'] = auth()->id();

        $attributes['title'] = $request->title;

        $attributes['path'] = $this->storeImage($request->file('image'));

        $image = Image::create($attributes);

        return redirect('/images/' . $image->id);
    }

    public function show(Image $image)
    {
        return view('images.show', compact('image'));
    }

    /* No need for edit function right now.

    public function edit($id)
    {
        return view('images.edit');
    }

    public function update(Request $request, $id)
    {
        //
    }

    No need for edit function as of right now */

    public function destroy(Image $image)
    {
        $this->authorize('delete', $image);

        $image->delete();

        return redirect('/home');
    }

    private function storeImage($image)
    {
        $imageName = time() . '.' . $image->getClientOriginalExtension();

        $imageDir = 'image/user';

        $image->move($imageDir, $imageName);

        return $imageDir . '/' . $imageName;
    }
}
