<?php

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Models\Membership;
use App\Models\Organization;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

use function Pest\Laravel\postJson;

it('allows a member to create a ticket', function () {
    $organization = Organization::query()->create([
        'name' => 'Globex Technology',
        'slug' => 'globex',
    ]);

    $user = User::factory()->create();

    Membership::query()->create([
        'organization_id' => $organization->getKey(),
        'user_id' => $user->getKey(),
        'role' => 'admin',
    ]);

    Sanctum::actingAs($user);

    $response = postJson(
        "/api/organizations/{$organization->getKey()}/tickets",
        [
            'subject' => 'Erro ao acessar o sistema',
            'description' => 'O usuário não consegue acessar o painel administrativo.',
            'priority' => TicketPriority::High->value,
        ],
    );

    $response
        ->assertCreated()
        ->assertJsonPath('data.subject', 'Erro ao acessar o sistema')
        ->assertJsonPath('data.status', TicketStatus::Open->value)
        ->assertJsonPath('data.priority', TicketPriority::High->value)
        ->assertJsonPath('data.organization_id', $organization->getKey())
        ->assertJsonPath('data.created_by', $user->getKey());

    $this->assertDatabaseHas('tickets', [
        'organization_id' => $organization->getKey(),
        'created_by' => $user->getKey(),
        'subject' => 'Erro ao acessar o sistema',
        'status' => TicketStatus::Open->value,
        'priority' => TicketPriority::High->value,
    ]);
});

it('forbids a non-member from creating a ticket', function () {
    $organization = Organization::query()->create([
        'name' => 'Globex Technology',
        'slug' => 'globex',
    ]);

    $user = User::factory()->create();

    Sanctum::actingAs($user);

    $response = postJson(
        "/api/organizations/{$organization->getKey()}/tickets",
        [
            'subject' => 'Erro ao acessar o sistema',
            'description' => 'O usuário não consegue acessar o painel administrativo.',
            'priority' => TicketPriority::High->value,
        ],
    );

    $response->assertForbidden();
});

it('validate the ticket payload', function () {
    $organization = Organization::query()->create([
        'name' => 'Globex Technology',
        'slug' => 'globex',
    ]);

    $user = User::factory()->create();

    Membership::query()->create([
        'organization_id' => $organization->getKey(),
        'user_id' => $user->getKey(),
        'role' => 'admin',
    ]);

    Sanctum::actingAs($user);

    $response = postJson(
        "/api/organizations/{$organization->getKey()}/tickets",
        [
            'subject' => '',
            'description' => 'curta',
            'priority' => 'banana',
        ],
    );

    $response->assertUnprocessable()
        ->assertJsonValidationErrors(['subject', 'description', 'priority']);

    $this->assertDatabaseCount('tickets', 0);
});

it('uses medium priority by default', function () {
    $organization = Organization::query()->create([
        'name' => 'Globex Technology',
        'slug' => 'globex',
    ]);

    $user = User::factory()->create();

    Membership::query()->create([
        'organization_id' => $organization->getKey(),
        'user_id' => $user->getKey(),
        'role' => 'admin',
    ]);

    Sanctum::actingAs($user);

    $response = postJson(
        "/api/organizations/{$organization->getKey()}/tickets",
        [
            'subject' => 'Erro ao acessar o sistema',
            'description' => 'O usuário não consegue acessar o painel administrativo.',
        ],
    );

    $response
        ->assertCreated()
        ->assertJsonPath('data.priority', TicketPriority::Medium->value);

    $this->assertDatabaseHas('tickets', [
        'priority' => TicketPriority::Medium->value,
    ]);
});
