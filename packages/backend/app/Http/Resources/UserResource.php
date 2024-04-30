<?php

namespace App\Http\Resources;

use App\Models\{Post, User, Follow};
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        /* $followings = Follow::where('follower_id', '=', $this->id);
        $followingIds = $followings->pluck("followed_id");
        $followingAccounts = UserResource::collection(User::find($followingIds));

        $followers = Follow::where('followed_id', '=', $this->id);
        $followerIds = $followers->pluck("follower_id");
        $followerAccounts = UserResource::collection(User::find($followerIds)); */
        $followingIds = Follow::where('follower_id', '=', $this->id)->get()->pluck("followed_id");

        return [
            'id' => $this->id,
            'nickname' => $this->nickname,
            'isPrivate' => $this->is_private,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'email' => $this->email,
            'biography' => $this->biography,
            'meta' => [
                'postCount' => Post::where('user_id', '=', $this->id)->get()->count(),
                'followerCount' => Follow::where('followed_id', '=', $this->id)->get()->count(),
                'followingCount' => Follow::where('follower_id', '=', $this->id)->get()->count()
            ],
            'followingIds' => $followingIds,
            /* 'followers' => $followerAccounts, */
            'joinedOn' => $this->created_at
        ];
    }
}
