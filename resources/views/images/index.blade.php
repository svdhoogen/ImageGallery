@extends('layout')

@section('home')active @endsection

@section('fluid')class=container-fluid @endsection

@section('content')

    <div class="card" id="root">
        <panelselect class="card-header" :eachitem="[
            { name: 'New', isActive: true, eventName: 'loadnew', id: 0},
            { name: 'Random', isActive: false, eventName: 'loadrandom', id: 1},
            { name: 'Oldest', isActive: false, eventName: 'loadoldest', id: 2},
        ]">
            <h3>Choose filter</h3>
        </panelselect>

        <div class="clearfix"></div>

        <indexpanelimages></indexpanelimages>
    </div>

@endsection
