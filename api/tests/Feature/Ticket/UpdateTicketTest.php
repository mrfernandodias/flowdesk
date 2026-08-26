<?php

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Models\Membership;
use App\Models\Organization;
use App\Models\Ticket;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

use function Pest\Laravel\patchJson;

function createMembershipForUpdate(
    Organization $organization,
    User $user,
    string $role,
): Membership {
    return Membership::query()->create([
        'organization_id' => $organization->getKey(),
        'user_id' => $user->getKey(),
        'role' => $role,
    ]);
}

function createTicketForUpdate(
    Organization $organization,
    User $creator,
): Ticket {
    return Ticket::query()->create([
        'organization_id' => $organization->getKey(),
        'created_by' => $creator->getKey(),
        'subject' => 'Problema original',
        'description' => 'Descrição original suficientemente longa.',
        'status' => TicketStatus::Open,
        'priority' => TicketPriority::Medium,
    ]);
}

it('allows an admin to update a ticket', function () {
    $organization = Organization::query()->create([
        'name' => 'FDS Tech',
        'slug' => 'fds-tech',
    ]);

    $user = User::factory()->create();

    createMembershipForUpdate(
        organization: $organization,
        user: $user,
        role: 'admin',
    );

    $ticket = createTicketForUpdate(
        organization: $organization,
        creator: $user,
    );

    Sanctum::actingAs($user);

    $response = patchJson(
        "/api/organizations/{$organization->getKey()}/tickets/{$ticket->getKey()}",
        [
            'status' => TicketStatus::Resolved->value,
        ],
    );

    $response
        ->assertOk()
        ->assertJsonPath('data.status', TicketStatus::Resolved->value)
        ->assertJsonPath('data.subject', 'Problema original')
        ->assertJsonPath('data.priority', TicketPriority::Medium->value);

    $this->assertDatabaseHas('tickets', [
        'id' => $ticket->getKey(),
        'status' => TicketStatus::Resolved->value,
        'subject' => 'Problema original',
        'priority' => TicketPriority::Medium->value,
    ]);
});

it('allows an agent to update a ticket', function () {
    $organization = Organization::query()->create([
        'name' => 'Acme',
        'slug' => 'acme',
    ]);

    $creator = User::factory()->create();
    $agent = User::factory()->create();

    createMembershipForUpdate(
        organization: $organization,
        user: $agent,
        role: 'agent',
    );

    $ticket = createTicketForUpdate(
        organization: $organization,
        creator: $creator,
    );

    Sanctum::actingAs($agent);

    patchJson(
        "/api/organizations/{$organization->getKey()}/tickets/{$ticket->getKey()}",
        [
            'priority' => TicketPriority::Urgent->value,
        ],
    )
        ->assertOk()
        ->assertJsonPath('data.priority', TicketPriority::Urgent->value);
});

it('forbids a viewer from updating a ticket', function () {
    $organization = Organization::query()->create([
        'name' => 'Globex',
        'slug' => 'globex',
    ]);

    $creator = User::factory()->create();
    $viewer = User::factory()->create();

    createMembershipForUpdate(
        organization: $organization,
        user: $viewer,
        role: 'viewer',
    );

    $ticket = createTicketForUpdate(
        organization: $organization,
        creator: $creator,
    );

    Sanctum::actingAs($viewer);

    patchJson(
        "/api/organizations/{$organization->getKey()}/tickets/{$ticket->getKey()}",
        [
            'status' => TicketStatus::Resolved->value,
        ],
    )->assertForbidden();

    $this->assertDatabaseHas('tickets', [
        'id' => $ticket->getKey(),
        'status' => TicketStatus::Open->value,
    ]);
});
