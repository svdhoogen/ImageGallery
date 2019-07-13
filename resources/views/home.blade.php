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

                    <div id="root">
                        <homePanel>
                            @method('delete')
                            @csrf
                        </homePanel>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
