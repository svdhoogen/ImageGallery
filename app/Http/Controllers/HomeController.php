<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Image;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function ownerPosts()
    {
        $data = Image::select('path', 'title', 'id', 'created_at')->latest()->where('owner_id', auth()->id())->paginate(5);

        return $data;
    }

    public function randomPosts()
    {
        $data = Image::select('path', 'title', 'id')->random()->paginate(30);

        return $data;
    }

    public function latestPosts()
    {
        $data = Image::select('path', 'title', 'id')->latest()->paginate(30);

        return $data;
    }
}
