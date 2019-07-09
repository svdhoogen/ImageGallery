@extends('layout')

{{-- Inactive, could house user profile. --}}

@section('content')
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <p class="text-dark">Your posts will be listed here.</p>

                    <div id="user-panel">
                        @if (auth()->user()->images->count() > 0)
                            @foreach (auth()->user()->images as $image)
                                <userposts path="{{ asset($image->path) }}" title="{{ $image->title }}" id="{{ $image->id }}">
                                    @method('delete')
                                    @csrf
                                </userposts>
                            @endforeach
                        @else
                            <p class="text-dark"> You have no posts yet, <a href="/images/create">upload an image!</a></p>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
