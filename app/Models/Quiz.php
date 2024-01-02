<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    public function questions(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function books(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Book::class , 'id','book_id');
    }
}
