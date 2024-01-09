<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user_ids = [1,12];
        return [
            'from_id' => $user_ids[fake()->numberBetween(0, 1)],
            'to_id' => $user_ids[fake()->numberBetween(0, 1)],
            'content' => fake()->sentence,
        ];
    }
}
