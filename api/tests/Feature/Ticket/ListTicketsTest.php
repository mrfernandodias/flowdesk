<?php

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Models\Membership;
use App\Models\Organization;
use App\Models\Ticket;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

use function Pest\Laravel\getJson;

function createTicketFor(
    Organization $organization,
    User $creator,
    string $subject,
    TicketStatus $status = TicketStatus::Open,
    TicketPriority $priority = TicketPriority::Medium
): Ticket {
    return Ticket::query()->create([
        'organization_id' => $organization->getKey(),
        'created_by' => $creator->getKey(),
        'subject' => $subject,
        'description' => "Descrição válida para {$subject}",
        'status' => $status,
        'priority' => $priority,
    ]);
}

it('lists tickets from the organization', function () {
    $organization = Organization::query()->create([
        'name' => 'VSB',
        'slug' => 'vsb',
    ]);

    $user = User::factory()->create();

    Membership::query()->create([
        'organization_id' => $organization->getKey(),
        'user_id' => $user->getKey(),
        'role' => 'member',
    ]);

    createTicketFor(
        organization: $organization,
        creator: $user,
        subject: 'Primeiro ticket'
    );

    createTicketFor(
        organization: $organization,
        creator: $user,
        subject: 'Segundo ticket'
    );

    Sanctum::actingAs($user);

    $response = $this->get("/api/organizations/{$organization->getKey()}/tickets");

    $response->assertOk()
        ->assertJsonCount(2, 'data')
        ->assertJsonPath('meta.total', 2)
        ->assertJsonPath('data.0.creator.id', $user->getKey());
});

it('does not expose tickets from another organization', function () {
    $vsb = Organization::query()->create([
        'name' => 'VSB',
        'slug' => 'vsb',
    ]);

    $partner = Organization::query()->create([
        'name' => 'Partner Organization',
        'slug' => 'partner-organization',
    ]);

    $user = User::factory()->create();

    Membership::query()->create([
        'organization_id' => $vsb->getKey(),
        'user_id' => $user->getKey(),
        'role' => 'member',
    ]);

    createTicketFor(
        organization: $vsb,
        creator: $user,
        subject: 'Ticket da VSB'
    );

    createTicketFor(
        organization: $partner,
        creator: $user,
        subject: 'Ticket secreto do parceiro'
    );

    Sanctum::actingAs($user);

    $response = getJson("/api/organizations/{$vsb->getKey()}/tickets");

    $response->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.subject', 'Ticket da VSB')
        ->assertJsonMissing(['subject' => 'Ticket secreto do parceiro']);
});

it('filter tickets by status', function () {
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

    createTicketFor(
        organization: $organization,
        creator: $user,
        subject: 'Ticket aberto',
        status: TicketStatus::Open
    );

    createTicketFor(
        organization: $organization,
        creator: $user,
        subject: 'Ticket resolvido',
        status: TicketStatus::Resolved
    );

    Sanctum::actingAs($user);

    $response = getJson("/api/organizations/{$organization->getKey()}/tickets?status=resolved");

    $response
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.subject', 'Ticket resolvido')
        ->assertJsonPath(
            'data.0.status',
            TicketStatus::Resolved->value,
        );
});

it('filters tickets by priority', function () {
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

    createTicketFor(
        organization: $organization,
        creator: $user,
        subject: 'Ticket normal',
        priority: TicketPriority::Medium,
    );

    createTicketFor(
        organization: $organization,
        creator: $user,
        subject: 'Ticket urgente',
        priority: TicketPriority::Urgent,
    );

    Sanctum::actingAs($user);

    $response = getJson(
        "/api/organizations/{$organization->getKey()}/tickets?priority=urgent"
    );

    $response
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonPath('data.0.subject', 'Ticket urgente')
        ->assertJsonPath(
            'data.0.priority',
            TicketPriority::Urgent->value,
        );
});

it('forbids a non member from listing tickets', function () {
    $organization = Organization::query()->create([
        'name' => 'VSB',
        'slug' => 'vsb',
    ]);

    $user = User::factory()->create();

    Sanctum::actingAs($user);

    getJson(
        "/api/organizations/{$organization->getKey()}/tickets"
    )->assertForbidden();
});

it('paginates tickets', function () {
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

    foreach (range(1, 7) as $number) {
        createTicketFor(
            organization: $organization,
            creator: $user,
            subject: "Ticket {$number}",
        );
    }

    Sanctum::actingAs($user);

    $response = getJson(
        "/api/organizations/{$organization->getKey()}/tickets?per_page=3"
    );

    $response
        ->assertOk()
        ->assertJsonCount(3, 'data')
        ->assertJsonPath('meta.current_page', 1)
        ->assertJsonPath('meta.per_page', 3)
        ->assertJsonPath('meta.total', 7)
        ->assertJsonPath('meta.last_page', 3);
});

it('filters tickets by search term', function () {
    $user = User::factory()->create();
    $organization = Organization::factory()->create();

    Membership::factory()->create([
        'organization_id' => $organization->id,
        'user_id' => $user->id,
        'role' => 'agent',
    ]);

    Ticket::factory()->create([
        'organization_id' => $organization->id,
        'created_by' => $user->id,
        'subject' => 'Erro crítico no faturamento',
        'description' => 'Descrição qualquer para o ticket.',
    ]);

    Ticket::factory()->create([
        'organization_id' => $organization->id,
        'created_by' => $user->id,
        'subject' => 'Solicitação de acesso',
        'description' => 'Usuário precisa de nova permissão.',
    ]);

    Sanctum::actingAs($user);

    $this
        ->getJson(
            "/api/organizations/{$organization->id}/tickets?search=faturamento"
        )
        ->assertOk()
        ->assertJsonCount(1, 'data')
        ->assertJsonFragment([
            'subject' => 'Erro crítico no faturamento',
        ])
        ->assertJsonMissing([
            'subject' => 'Solicitação de acesso',
        ]);
});
