@extends('layout')

@section('content')
    <div class="row justify-content-center overflow-hidden">
        <div class="col-md-10">
            <div class="card mb-3" id="root">
                <div class="card-header">
                    <h1>Dashboard</h1>

                    <panelselect :eachitem="[
                        { name: 'My images', isActive: true, eventName: 'panelimages', id: 0},
                        { name: 'My comments', isActive: false, eventName: 'panelcomments', id: 1},
                    ]"></panelselect>
                </div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <homepanelimages>
                        @method('delete')
                        @csrf
                    </homepanelimages>

                    <homepanelcomments>
                        @method('delete')
                        @csrf
                    </homepanelcomments>
                </div>
            </div>
        </div>
    </div>
@endsection
