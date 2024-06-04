<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $sender = new UserResource(User::where('id', '=', $this->sender_id)->first());
        $receiver = new UserResource(User::where('id', '=', $this->receiver_id)->first());

        return [
            "id" => $this->id,
            "sender" => [
                'id' => $sender->id,
                'nickname' => $sender->nickname,
                'firstName' => $sender->first_name,
                'lastName' => $sender->last_name
            ],
            "receiver" => [
                'id' => $receiver->id,
                'nickname' => $receiver->nickname,
                'firstName' => $receiver->first_name,
                'lastName' => $receiver->last_name
            ],
            "content" => $this->content,
            "sentAt" => $this->created_at
        ];
    }
}
