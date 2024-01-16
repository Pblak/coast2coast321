<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'phone',
        'type',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'address' => 'object',
    ];


    public function houses()
    {
        return $this->hasMany(House::class);
    }


    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'from_id')
            ->where('to_id',auth()->id());
    }

    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'to_id')
            ->where('from_id',auth()->id());
    }

    public function scopeWithLatestMessage($query)
    {
        return $query->addSelect([
            'latest_message_id' => Message::select('id')
                ->where(function ($query) {
                    $query->where('from_id', $this->getTable() . '.id')
                        ->where('to_id', auth()->id());
                })
                ->orWhere(function ($query) {
                    $query->where('to_id',  $this->getTable() . '.id')
                        ->where('from_id', auth()->id());
                }) ,
        ])->with(['latestMessage' => function ($query) {
            $query->select('*'); // Select all columns for debugging purposes
        }]);
    }

    public function latestMessage()
    {
        return $this->belongsTo(Message::class, 'latest_message_id');
    }

}
