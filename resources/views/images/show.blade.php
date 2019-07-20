@extends('layout')

@section('content')
    <div class="row justify-content-center" id="root">
        <div class="col-12 mb-3">
            <div class="card">
                <div class="card-body">
                    <h1 class="text-primary card-title">{{ $image->title }}</h1>
                    <p class="text-muted card-text">Uploaded by: {{ $image->owner->name }}</p>

                    @if ($image->owner->id == auth()->id())
                        <showdelete :id="{{ $image->id }}">
                            @method('delete')
                            @csrf
                        </showdelete>
                    @endif
                </div>

                <img class="img-fluid mx-auto m-3" src="{{ asset($image->path) }}" alt="Selected image">
            </div>
        </div>

        <div class="col-10 mb-5">

            @if (auth())
                <showaddcomment :imageid="{{ $image->id }}">
                    @csrf
                </showaddcomment>
            @else
                <h4>Please <a href="/login">login</a> to post a comment!</h4>
            @endif

            <showcomments :imageid="{{ $image->id }}"></showcomments>
        </div>
    </div>
@endsection
