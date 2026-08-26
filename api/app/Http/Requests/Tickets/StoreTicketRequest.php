<?php

namespace App\Http\Requests\Tickets;

use App\Enums\TicketPriority;
use App\Models\Membership;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\Attributes\FailOnUnknownFields;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

#[FailOnUnknownFields]
class StoreTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $organization = $this->route('organization');
        $user = $this->user();

        if (! $organization instanceof Organization) {
            return false;
        }

        if (! $user instanceof User) {
            return false;
        }

        return Membership::query()
            ->where('organization_id', $organization->getKey())
            ->where('user_id', $user->getKey())
            ->exists();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'subject' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'min:10'],
            'priority' => ['sometimes', Rule::enum(TicketPriority::class)],
        ];
    }

    /**
     * Get the subject of the ticket.
     */
    public function subject(): string
    {
        return $this->string('subject')->toString();
    }

    /**
     * Get the description of the ticket.
     */
    public function description(): string
    {
        return $this->string('description')->toString();
    }

    public function priority(): TicketPriority
    {
        return $this->enum('priority', TicketPriority::class, TicketPriority::Medium);
    }
}
