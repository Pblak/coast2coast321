<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function get_user_messages(Request $request)
    {

        $messages =  Message::where(function ($query) use ($request) {

            $query->where('from_id', $request->user_id)->where('to_id', auth()->user()->id);
        })->orWhere(function ($query) use ($request) {
            $query->where('from_id', auth()->user()->id) ->where('to_id', $request->user_id);
        })->get();
        $groupedMessages = $messages->groupBy(function ($message) {
            // Round the timestamp to the nearest 50 seconds
            return   Carbon::parse($message->created_at)
                ->second(floor(Carbon::parse($message->created_at)->second / 50) * 50)
                ->format('Y-m-d H:i:s');
        })/*->map(function ($group) {
            return $group->groupBy('from_id');
        })*/;
        $data = collect([
           'messages'=>$groupedMessages,
           'user_subject'=>User::where('id',$request->user_id)->get()->first(),
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
        Message::create([
            'from_id'=>auth()->id(),
            'to_id'=>$request->to_id,
            'content'=>$request->msg_content,
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
