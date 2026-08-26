<?php

namespace App\Policies;

use App\Models\Membership;
use App\Models\Ticket;
use App\Models\User;

class TicketPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Ticket $ticket): bool
    {
        $membership = Membership::query()
            ->where('user_id', $user->getKey())
            ->where('organization_id', $ticket->organization_id)
            ->first();

        if ($membership === null) {
            return false;
        }

        return in_array($membership->role, ['admin', 'agent', 'viewer'], true);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Ticket $ticket): bool
    {
        $membership = Membership::query()
            ->where('user_id', $user->getKey())
            ->where('organization_id', $ticket->organization_id)
            ->first();

        if ($membership === null) {
            return false;
        }

        return in_array($membership->role, ['admin', 'agent'], true);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Ticket $ticket): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Ticket $ticket): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Ticket $ticket): bool
    {
        return false;
    }
}
