<?php

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Models\Membership;
use App\Models\Organization;
use App\Models\Ticket;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

use function Pest\Laravel\getJson;

function createTicketToShow(
    Organization $organization,
    User $creator,
    string $subject = 'Ticket de teste',
): Ticket {
    return Ticket::query()->create([
        'organization_id' => $organization->getKey(),
        'created_by' => $creator->getKey(),
        'subject' => $subject,
        'description' => 'Descrição suficientemente longa para o ticket.',
        'status' => TicketStatus::Open,
        'priority' => TicketPriority::Medium,
    ]);
}

it('shows a ticket from the organization', function () {
    $organization = Organization::query()->create([
        'name' => 'VSB',
        'slug' => 'vsb',
    ]);

    $user = User::factory()->create();

    Membership::query()->create([
        'organization_id' => $organization->getKey(),
        'user_id' => $user->getKey(),
        'role' => 'admin',
    ]);

    $ticket = createTicketToShow(
        organization: $organization,
        creator: $user,
    );

    Sanctum::actingAs($user);

    getJson(
        "/api/organizations/{$organization->getKey()}/tickets/{$ticket->getKey()}"
    )
        ->assertOk()
        ->assertJsonPath('data.id', $ticket->getKey())
        ->assertJsonPath('data.subject', $ticket->subject)
        ->assertJsonPath('data.creator.id', $user->getKey());
});

it('does not expose a ticket from another organization', function () {
    $vsb = Organization::query()->create([
        'name' => 'VSB',
        'slug' => 'vsb',
    ]);

    $partner = Organization::query()->create([
        'name' => 'Parceiro',
        'slug' => 'parceiro',
    ]);

    $user = User::factory()->create();

    Membership::query()->create([
        'organization_id' => $vsb->getKey(),
        'user_id' => $user->getKey(),
        'role' => 'admin',
    ]);

    $foreignTicket = createTicketToShow(
        organization: $partner,
        creator: $user,
        subject: 'Ticket secreto',
    );

    Sanctum::actingAs($user);

    getJson(
        "/api/organizations/{$vsb->getKey()}/tickets/{$foreignTicket->getKey()}"
    )->assertNotFound();
});
