<?php

namespace App\Http\Controllers;

use App\Http\Resources\MessageResource;
use App\Models\Message;
use Exception;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function send(Request $request, int $id)
    {
        $message = new Message();
        $message->sender_id = $id;
        $message->receiver_id = $request->receiverId;
        $message->content = $request->content;

        if ($message->save()) {
            return ['success' => true, 'message' => "Message sent successfully", 'data' => new MessageResource($message)];
        } else {
            return ['success' => false, 'message' => "Something went wrong whilst sending a message"];
        }
    }

    public function conversation(Request $request, int $user_one_id, int $user_two_id)
    {
        try {
            $messages = Message::where([['sender_id', '=', $user_one_id], ['receiver_id', '=', $user_two_id]])->get()->merge(Message::where([['sender_id', '=', $user_two_id], ['receiver_id', '=', $user_one_id]])->get());
            $resources = [];

            foreach ($messages as $message) {
                array_push($resources, new MessageResource($message));
            }

            return ['success' => true, 'message' => "Conversation read successfully", 'data' => $resources];
        } catch (Exception $err) {
            error_log($err);
            return ["success" => false, "message" => "Something went wrong whilst reading the conversation"];
        }
    }
}
