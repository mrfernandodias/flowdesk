<?php

namespace App\Http\Requests\Tickets;

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $ticket = $this->route('ticket');
        $user = $this->user();

        if (! $user instanceof User || ! $ticket instanceof Ticket) {
            return false;
        }

        return $user->can('update', $ticket);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'subject' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'string', 'min:10'],
            'status' => ['sometimes', Rule::enum(TicketStatus::class)],
            'priority' => ['sometimes', Rule::enum(TicketPriority::class)],
        ];
    }

    public function subject(): ?string
    {
        return $this->has('subject') ? $this->string('subject')->toString() : null;
    }

    public function description(): ?string
    {
        return $this->has('description') ? $this->string('description')->toString() : null;
    }

    public function status(): ?TicketStatus
    {
        return $this->enum('status', TicketStatus::class);
    }

    public function priority(): ?TicketPriority
    {
        return $this->enum('priority', TicketPriority::class);
    }
}
