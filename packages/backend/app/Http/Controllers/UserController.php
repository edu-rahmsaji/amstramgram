<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function create(Request $request)
    {
        $user = new User;
        $user->nickname = $request->nickname;
        $user->is_private = $request->is_private;
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->biography = $request->biography;
        $user->avatarPath = $request->avatarPath;

        if ($user->save()) {
            return ['status' => true, 'message' => "User created successfully"];       
        } else {
            return ['status' => false, 'message' => "An error has occurred while creating the user"];       
        }
    }

    public function update(Request $request, int $id) {
        $user = User::where("id", "=", $id)->first();
        $user->nickname = $request->nickname;
        $user->is_private = $request->isPrivate;
        $user->first_name = $request->firstName;
        $user->last_name = $request->lastName;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->avatarPath = $request->avatarPath;

        if ($user->save()) {
            return ['status' => true, 'message' => "User updated successfully"];       
        } else {
            return ['status' => false, 'message' => "An error has occurred whilst updating the user"];       
        }
    }

    public function readAll() {
        return ["success" => true, "data" => UserResource::collection(User::all())];
    }

    public function read(User $user) {
        return new UserResource($user);
    }

    public function destroy(int $id) {
        User::where("id", "=", $id)->first()->delete();

        return ["success" => true];
    }

    public function imageTest(Request $request) {
        // Access from storage/avatars/...
        $path = $request->file('avatar')->store('public/avatars');

        return ["path" => asset($path)];
    }
}
