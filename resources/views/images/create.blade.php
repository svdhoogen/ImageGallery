@extends('layout')

@section('upload')active @endsection

@section('content')

    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="card-header">
                    <h1 class="text-dark">Create a post!</h1>
                </div>

                <div class="card-body" id="root">
                    <createpanel>
                        @csrf
                    </createpanel>
                </div>
            </div>
        </div>
    </div>
@endsection
