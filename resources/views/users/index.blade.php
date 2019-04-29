@extends('layouts.app')

@section('content')
<div class="container">
    <h4><strong>{{$user ->username}}</strong></h4>

    @if(Auth::user() -> isNotTheUser($user))
        @if(Auth::user()->isFollowing($user))
            <h5><a href="{{ route('users.unfollow', $user)}}">Unfollow</a></h5>
        @else
            <h5><a href="{{ route('users.follow', $user) }}">Follow</a></h5>
        @endIf
    @endif
</div>
@endsection
