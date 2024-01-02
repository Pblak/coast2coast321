<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competition extends Model
{
    use HasFactory;

    protected $casts = [
        'period' => 'object'
    ];

    public function quizzes()
    {
        return $this->belongsToMany(Quiz::class)->withPivot([]);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function books()
    {
        return $this->hasManyThrough(Quiz::class, Book::class);
    }

}
