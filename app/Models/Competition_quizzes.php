<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competition_quizzes extends Model
{
    use HasFactory;
    protected $fillable = ['quiz_id','competition_id'];
}
