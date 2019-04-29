<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;

class UserController extends Controller
{
    public function index(User $user) {
        // dd($user);
        return view('users.index', compact('user'));
    }

    public function follow(Request $request, User $user) {
        // dd($request->user()->username);
        // dd($user->username);
        if ($request->user()->canFollow($user)) {
            $request->user()->following()->attach($user->id);
        }
        return redirect()->back();
    }
    public function unfollow(Request $request, User $user) {
        if ($request->user()->canUnFollow($user)) {
            $request->user()->following()->detach($user->id);
        }
        return redirect()->back();
    }
}
