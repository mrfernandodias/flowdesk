<?php

namespace App\Actions\Tickets;

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Models\Ticket;

/**
 * Action to update a ticket with the given attributes.
 *
 * @param  Ticket  $ticket  The ticket to update.
 * @param  string|null  $subject  The new subject of the ticket.
 * @param  string|null  $description  The new description of the ticket.
 * @param  TicketStatus|null  $status  The new status of the ticket.
 * @param  TicketPriority|null  $priority  The new priority of the ticket.
 * @return Ticket The updated ticket.
 */
final class UpdateTicket
{
    public function execute(
        Ticket $ticket,
        ?string $subject = null,
        ?string $description = null,
        ?TicketStatus $status = null,
        ?TicketPriority $priority = null
    ): Ticket {
        if ($subject !== null) {
            $ticket->subject = $subject;
        }
        if ($description !== null) {
            $ticket->description = $description;
        }
        if ($status !== null) {
            $ticket->status = $status;
        }
        if ($priority !== null) {
            $ticket->priority = $priority;
        }

        $ticket->save();

        return $ticket;
    }
}
