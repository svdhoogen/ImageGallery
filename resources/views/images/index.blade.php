@extends('layout')

@section('home')active @endsection

@section('fluid')class=container-fluid @endsection

@section('content')

    <div class="d-flex align-content-center flex-wrap justify-content-center" id="images">
        @foreach ($image->inRandomOrder()->get('*')->take(30) as $image)
            <a href="/images/{{ $image->id }}">
                <img src="{{ asset($image->path) }}" class="flex-item p-2 mb-2 border" alt="{{ $image->title }}">
            </a>
        @endforeach
    </div>

@endsection
