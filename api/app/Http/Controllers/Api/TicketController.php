<?php

namespace App\Http\Controllers\Api;

use App\Actions\Tickets\CreateTicket;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tickets\StoreTicketRequest;
use App\Http\Resources\TicketResource;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class TicketController extends Controller
{
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
}
