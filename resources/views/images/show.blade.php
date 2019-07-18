@extends('layout')

@section('content')
    <div class="row">
        <div class="col-12 mb-5">
            <h1 class="text-primary mb-3">{{ $image->title }}</h1>

            <img src="{{ asset($image->path) }}" class="img-fluid mx-auto d-block" alt="Selected image">

            <p class="text-dark">Uploaded by: {{ $image->owner->name }}</p>

            @if ($image->owner->id == auth()->id())
                <form method="post" action="/images/{{ $image->id }}">
                    @method('delete')
                    @csrf

                    <button name="submit" class="btn btn-danger form-control">Delete post</button>
                </form>
            @endif
        </div>

        <div class="col-12 mb-4">

        </div>
    </div>
@endsection
