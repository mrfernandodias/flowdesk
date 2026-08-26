<?php

namespace App\Actions\Tickets;

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Models\Organization;
use App\Models\Ticket;
use App\Models\User;

final class CreateTicket
{
    public function execute(
        Organization $organization,
        User $creator,
        string $subject,
        string $description,
        TicketPriority $priority = TicketPriority::Medium
    ): Ticket {
        return Ticket::create([
            'organization_id' => $organization->getKey(),
            'created_by' => $creator->getKey(),
            'subject' => $subject,
            'description' => $description,
            'status' => TicketStatus::Open,
            'priority' => $priority,
        ]);
    }
}
