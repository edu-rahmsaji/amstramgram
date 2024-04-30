<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Follow;
use App\Models\User;

class FollowController extends Controller
{
    public function follow(int $followerId, int $followedId) {
        $followObj = new Follow();
        $followObj->follower_id = $followerId;
        $followObj->followed_id = $followedId;

        $followObj->save();

        return ["success" => true];
    }

    public function unfollow(int $followerId, int $followedId) {
        Follow::where("follower_id", "=", $followerId)->where("followed_id", "=", $followedId)->delete();

        return ["success" => true];
    }

    public function followers(User $user)
    {
        $followers = Follow::where('followed_id', '=', $user->id);
        $followerIds = $followers->pluck("follower_id");
        $followerAccounts = User::find($followerIds);

        $data = UserResource::collection($followerAccounts);

        return ["success" => true, "data" => $data, "message" => "Read followers successfully"];
    }

    public function following(User $user)
    {
        $followings = Follow::where('follower_id', '=', $user->id);
        $followingIds = $followings->pluck("followed_id");
        $followingAccounts = User::find($followingIds);

        $data = UserResource::collection($followingAccounts);

        return ["success" => true, "data" => $data, "message" => "Read followed accounts successfully"];
    }
}
