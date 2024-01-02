<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'correct_answer', 'incorrect_answers', 'quiz_id'];

    protected $casts = [
        'correct_answer' => 'object',
        'incorrect_answers' => 'object',
    ];
}
