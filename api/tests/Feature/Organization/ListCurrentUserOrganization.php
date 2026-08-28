<?php

use App\Models\Membership;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

it('lists only organizations the authenticated user belongs to', function () {
    $user = User::factory()->create();

    $fdsTech = Organization::create([
        'name' => 'FDS Tech',
        'slug' => 'fds-tech',
    ]);

    $acme = Organization::create([
        'name' => 'Acme Corp',
        'slug' => 'acme-corp',
    ]);

    $globex = Organization::create([
        'name' => 'Globex Corporation',
        'slug' => 'globex-corporation',
    ]);

    Membership::create([
        'organization_id' => $fdsTech->id,
        'user_id' => $user->id,
        'role' => 'admin',
    ]);

    Membership::create([
        'organization_id' => $acme->id,
        'user_id' => $user->id,
        'role' => 'agent',
    ]);

    Sanctum::actingAs($user);

    $response = $this->getJson('/api/organizations');

    $response
        ->assertOk()
        ->assertJsonCount(2, 'data')
        ->assertJsonFragment([
            'id' => $fdsTech->id,
            'name' => 'FDS Tech',
            'slug' => 'fds-tech',
            'role' => 'admin',
        ])
        ->assertJsonFragment([
            'id' => $acme->id,
            'name' => 'Acme Corp',
            'slug' => 'acme-corp',
            'role' => 'agent',
        ])
        ->assertJsonMissing([
            'id' => $globex->id,
            'name' => 'Globex Corporation',
            'slug' => 'globex-corporation',
        ]);
});
