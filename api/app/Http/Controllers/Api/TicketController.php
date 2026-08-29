<?php

namespace App\Http\Controllers\Api;

use App\Actions\Tickets\CreateTicket;
use App\Actions\Tickets\UpdateTicket;
use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tickets\IndexTicketRequest;
use App\Http\Requests\Tickets\StoreTicketRequest;
use App\Http\Requests\Tickets\UpdateTicketRequest;
use App\Http\Resources\TicketResource;
use App\Models\Organization;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;

class TicketController extends Controller
{
    /**
     * Display a listing of the tickets for the given organization.
     */
    public function index(
        IndexTicketRequest $request,
        Organization $organization
    ): AnonymousResourceCollection {
        $tickets = Ticket::query()
            ->where('organization_id', $organization->getKey())
            ->with('creator')
            ->when(
                $request->status(),
                fn($query, TicketStatus $status) => $query->where('status', $status->value)
            )
            ->when(
                $request->priority(),
                fn($query, TicketPriority $priority) => $query->where('priority', $priority->value)
            )
            ->when(
                $request->search(),
                function ($query, string $search) {
                    $query->where(function ($query) use ($search) {
                        $query
                            ->whereLike(
                                'subject',
                                "%{$search}%",
                                caseSensitive: false
                            )
                            ->orWhereLike(
                                'description',
                                "%{$search}%",
                                caseSensitive: false
                            );
                    });
                }
            )
            ->latest()
            ->paginate($request->perPage())
            ->withQueryString();

        return TicketResource::collection($tickets);
    }

    /**
     * Store a newly created ticket for the given organization.
     */
    public function store(
        StoreTicketRequest $request,
        Organization $organization,
        CreateTicket $createTicket
    ): JsonResponse {
        $user = $request->user();

        if (! $user instanceof User) {
            abort(Response::HTTP_UNAUTHORIZED);
        }

        $ticket = $createTicket->execute(
            organization: $organization,
            creator: $user,
            subject: $request->subject(),
            description: $request->description(),
            priority: $request->priority(),
        );

        return (new TicketResource($ticket))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * Display the specified ticket for the given organization.
     */
    public function show(
        IndexTicketRequest $request,
        Organization $organization,
        Ticket $ticket
    ): TicketResource {
        Gate::authorize('view', $ticket);

        $ticket->load('creator');

        return new TicketResource($ticket);
    }

    public function update(
        UpdateTicketRequest $request,
        Organization $organization,
        Ticket $ticket,
        UpdateTicket $upateTicket
    ): TicketResource {
        $ticket = $upateTicket->execute(
            ticket: $ticket,
            subject: $request->subject(),
            description: $request->description(),
            status: $request->status(),
            priority: $request->priority(),
        );

        $ticket->load('creator');

        return new TicketResource($ticket);
    }
}
