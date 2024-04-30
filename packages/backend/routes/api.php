<?php

use App\Http\Controllers\FollowController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostLikeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('user', [UserController::class, 'readAll']);
Route::get('user/{id}/posts/liked', [PostLikeController::class, 'likedPosts']);
Route::get('user/{user}', [UserController::class, 'read']);
Route::post('user', [UserController::class, 'create']);
Route::put('user/{id}', [UserController::class, 'update']);
Route::delete('user/{id}', [UserController::class, 'destroy']);

Route::get('user/{followerId}/follow/{followedId}', [FollowController::class, 'follow']);
Route::get('user/{followerId}/unfollow/{followedId}', [FollowController::class, 'unfollow']);

Route::get('user/{userId}/like/{postId}', [PostLikeController::class, 'like']);
Route::get('user/{userId}/unlike/{postId}', [PostLikeController::class, 'unlike']);

Route::get('user/{user}/followers', [FollowController::class, 'followers']);
Route::get('user/{user}/following', [FollowController::class, 'following']);

Route::get('posts/{id}/likers', [PostController::class, 'likers']);

Route::get('posts', [PostController::class, 'readAll']);
Route::get('user/{user}/posts', [PostController::class, 'readAllByUser']);
Route::get('posts/{post}', [PostController::class, 'read']);
Route::post('posts', [PostController::class, 'create']);
Route::put('posts/{id}', [PostController::class, 'update']);
Route::delete('posts/{post}', [PostController::class, 'delete']);
