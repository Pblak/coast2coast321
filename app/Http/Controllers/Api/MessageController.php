<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function get_latest_user_message()
    {
        $authUserId = auth()->id();

        $latestMessages = Message::whereIn('id', function ($query) use ($authUserId) {
            $query->selectRaw('MAX(id)')
                ->from('messages')
                ->where(function ($subquery) use ($authUserId) {
                    $subquery->where('from_id', $authUserId)
                        ->orWhere('to_id', $authUserId);
                })
                ->groupBy(DB::raw('IF(messages.from_id = '.$authUserId.', messages.to_id, messages.from_id)'));
        })
            ->get();
        return $latestMessages;
    }

    public function get_user_messages(Request $request)
    {

        $messages = Message::where(function ($query) use ($request) {
            $query->where('from_id', $request->user_id)->where('to_id', auth()->user()->id);
        })->orWhere(function ($query) use ($request) {
            $query->where('from_id', auth()->user()->id)->where('to_id', $request->user_id);
        })->get();
        $groupedMessages = $messages->groupBy(function ($message) {
            // Round the timestamp to the nearest 30 seconds
            return Carbon::parse($message->created_at)
                ->second(round(Carbon::parse($message->created_at)->second / 30) * 30)
                ->timestamp;
        });
        $data = collect([
            'messages' => $groupedMessages,
            'user_subject' => User::where('id', $request->user_id)->get()->first(),
        ]);
        return $data;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       // dd(now()->timestamp);
        Message::insert([
            'from_id' => auth()->id(),
            'to_id' => $request->to_id,
            'content' => $request->msg_content,
            'created_at'=> now()->timestamp,
            'updated_at'=> now()->timestamp,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
