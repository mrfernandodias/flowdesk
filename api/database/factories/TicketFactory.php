<?php

namespace Database\Factories;

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'organization_id' => Organization::factory(),
            'created_by' => User::factory(),

            'subject' => fake()->sentence(
                nbWords: fake()->numberBetween(4, 8),
            ),

            'description' => fake()->paragraph(
                nbSentences: fake()->numberBetween(2, 5),
            ),

            'status' => fake()
                ->randomElement(TicketStatus::cases())
                ->value,

            'priority' => fake()
                ->randomElement(TicketPriority::cases())
                ->value,
        ];
    }
}
