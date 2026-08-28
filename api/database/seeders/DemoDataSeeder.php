<?php

namespace Database\Seeders;

use App\Models\Membership;
use App\Models\Organization;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fernando = User::factory()->create([
            'name' => 'Fernando',
            'email' => 'fernando@flowdesk.test',
            'password' => Hash::make('password'),
        ]);

        $ana = User::factory()->create([
            'name' => 'Ana Martins',
            'email' => 'ana@flowdesk.test',
            'password' => Hash::make('password'),
        ]);

        $carlos = User::factory()->create([
            'name' => 'Carlos Oliveira',
            'email' => 'carlos@flowdesk.test',
            'password' => Hash::make('password'),
        ]);

        $companyA = Organization::factory()->create([
            'name' => 'Empresa A',
            'slug' => 'empresa-a',
        ]);

        $companyB = Organization::factory()->create([
            'name' => 'Empresa B',
            'slug' => 'empresa-b',
        ]);

        Membership::factory()->create([
            'organization_id' => $companyA->id,
            'user_id' => $fernando->id,
            'role' => 'admin',
        ]);

        Membership::factory()->create([
            'organization_id' => $companyA->id,
            'user_id' => $ana->id,
            'role' => 'agent',
        ]);

        Membership::factory()->create([
            'organization_id' => $companyA->id,
            'user_id' => $carlos->id,
            'role' => 'viewer',
        ]);

        Membership::factory()->create([
            'organization_id' => $companyB->id,
            'user_id' => $fernando->id,
            'role' => 'agent',
        ]);

        Membership::factory()->create([
            'organization_id' => $companyB->id,
            'user_id' => $carlos->id,
            'role' => 'admin',
        ]);

        $companyAUsers = collect([
            $fernando,
            $ana,
            $carlos,
        ]);

        Ticket::factory()
            ->count(37)
            ->make()
            ->each(function (Ticket $ticket) use (
                $companyA,
                $companyAUsers,
            ): void {
                $ticket->organization_id = $companyA->id;
                $ticket->created_by = $companyAUsers->random()->id;
                $ticket->save();
            });

        $companyBUsers = collect([
            $fernando,
            $carlos,
        ]);

        Ticket::factory()
            ->count(18)
            ->make()
            ->each(function (Ticket $ticket) use (
                $companyB,
                $companyBUsers,
            ): void {
                $ticket->organization_id = $companyB->id;
                $ticket->created_by = $companyBUsers->random()->id;
                $ticket->save();
            });
    }
}
