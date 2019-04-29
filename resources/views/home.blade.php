@extends('layouts.app')

@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-1">
                <img src="{{Auth::user()->avatar}}" alt="{{Auth::user()->username}}" height="80">
                <h2 class="text-primary">{{Auth::user()->username}}</h2>
                <div class="col-md-2">
                    <h2>Following</h2>
                    @foreach($following as $user)
                    <p><strong><a class="btn btn-primary" href="{{ route('users', $user) }}">{{$user->username}}</a></strong></p>
                    @endforeach
                    <hr>

                    <h2>Followers</h2>
                    @foreach($followers as $user)
                    <p><strong><a class="btn btn-success" href="{{ route('users', $user) }}">{{$user->username}}</a></strong></p>
                    @endforeach
                </div>
            </div>

            <div class="col-md-10">
                <div id="root"></div>
            </div>
        </div>
    </div>
@endsection
