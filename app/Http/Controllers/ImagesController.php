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

    public function loadNew(Request $request) {
        $keyId = $request->input('keyId');

        if($keyId == -1) {
            $keyId = Image::select('id')->latest('id')->first()->id;
        }

        $data['items'] = Image::select('id', 'path', 'title')->latest()->where('id', '<=', $keyId)->paginate(30);
        $data['keyId'] = $keyId;

        return $data;
    }

    public function loadRandom(Request $request) {
        $keyId = $request->input('keyId');

        if($keyId == -1) {
            $keyId = Image::select('id')->latest('id')->first()->id;
            session(['keyRand' => rand(0, 999999)]);
        }

        $data['items'] = Image::select('id', 'path', 'title')->inRandomOrder(session('keyRand'))->where('id', '<=', $keyId)->paginate(30);
        $data['keyId'] = $keyId;

        return $data;
    }

    public function loadOldest(Request $request) {
        $keyId = $request->input('keyId');

        if($keyId == -1) {
            $keyId = Image::select('id')->oldest('id')->first()->id;
        }

        $data['items'] = Image::select('id', 'path', 'title')->oldest()->where('id', '>=', $keyId)->paginate(30);
        $data['keyId'] = $keyId;

        return $data;
    }
}
