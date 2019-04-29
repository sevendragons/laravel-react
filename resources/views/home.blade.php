@extends('layouts.app')

@section('content')
<div class="container">
    <div id="root"></div>
    <hr>
    <h2>Following</h2>

    @foreach($following as $user)
        <p><strong><a href="{{ route('users', $user) }}">{{$user->username}}</a></strong></p>
    @endforeach
    <hr>

    <h2>Followers</h2>

    @foreach($followers as $user)
        <p><strong><a href="{{ route('users', $user) }}">{{$user->username}}</a></strong></p>
    @endforeach
</div>
@endsection
