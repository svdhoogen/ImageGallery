@extends('layout')

@section('content')
    <div class="row justify-content-center overflow-hidden">
        <div class="col-md-10">
            <div class="card mb-3">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <p class="text-dark">Your posts will be listed here.</p>

                    <div id="user-panel">
                        <userposts v-if="post" v-for="post in posts" :path="post.path" :title="post.title" :id="post.id">
                            {{--path="{{ asset($image->path) }}" title="{{ $image->title }}" id="{{ $image->id }}"--}}

                            @method('delete')
                            @csrf
                        </userposts>

                        <button class="btn btn-primary btn-block" @click="loadPosts" v-if="showBtn">Load posts</button>

                        <p v-if="noPosts" class="text-dark"> You have no posts yet,
                            <a href="/images/create">upload an image!</a>
                        </p>

                        <p v-if="hadPosts">You have no more posts left!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
