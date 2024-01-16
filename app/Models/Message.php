<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $fillable = ['from_id','to_id','content','created_at','updated_at'];
    protected $appends = [
        'user'
    ];




    public function getUserAttribute(){
        if ($this->from_id === auth()->id()){
            return User::where('id',$this->to_id )->get()->first();
        }else{
            return User::where('id',$this->from_id )->get()->first();
        }
    }

}
