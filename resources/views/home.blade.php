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

                    <user-posts></user-posts>

                    @if (auth()->user()->images->count() > 0)
                        @csrf
                        @foreach (auth()->user()->images as $image)
                            <div class="border mb-3 p-2">
                                <div class="float-left">
                                    <img src="{{ asset($image->path) }}" class="m-1" width="152"
                                         alt="{{ $image->title }}">
                                </div>
                                <p class="text-dark">{{ $image->title }}</p>

                                <form method="post" action="/images/{{ $image->id }}">
                                    @method('delete')
                                    <button name="submit" class="btn btn-danger btn-block"
                                            id="title{{ $image->id }}-form">Delete post
                                    </button>
                                </form>
                                <div class="clearfix"></div>
                            </div>
                        @endforeach
                    @else
                        <p class="text-dark"> You have no posts yet, <a href="/images/create">upload an image!</a></p>
                    @endif
                </div>
            </div>
        </div>
    </div>
@endsection
