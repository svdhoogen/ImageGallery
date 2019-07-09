@extends('layout')

@section('upload')active @endsection

@section('content')

    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="card-header">Create a post!</div>

                <div class="card-body">
                    <form method="POST" action="/images" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group">
                            <label for="title-form">Select image to upload</label>
                            <input type="text" name="title" class="form-control" id="title-form" placeholder="Image title" value="{{ old('title') }}" minlength="3" maxlength="255" required>
                        </div>

                        <div class="form-group">
                            <label for="file">Select image to upload</label>
                            <input type="file" name="image" accept="image/*" class="form-control-file" id="file" value="{{ old('image') }}" required>
                        </div>

                        <div>
                            <button name="submit" class="btn btn-dark btn-block">Create post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
