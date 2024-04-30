<?php

namespace App\Http\Controllers;

use App\Models\PostLike;
use Illuminate\Http\Request;

class PostLikeController extends Controller
{
    public function likedPosts(Request $request)
    {
        $userId = $request->route('id');
        return PostLike::where('user_id', $userId)->get();
    }

    public function like(int $userId, int $postId) {
        $postLikeObj = new PostLike();
        $postLikeObj->post_id = $postId;
        $postLikeObj->user_id = $userId;

        $postLikeObj->save();

        return ["success" => true];
    }

    public function unlike(int $userId, int $postId) {
        PostLike::where("post_id", "=", $postId)->where("user_id", "=", $userId)->delete();

        return ["success" => true];
    }
}
