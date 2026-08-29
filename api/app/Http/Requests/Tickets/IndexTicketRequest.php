<?php

namespace App\Http\Requests\Tickets;

use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexTicketRequest extends FormRequest
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

        return $user->can('access', $organization);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => ['sometimes', Rule::enum(TicketStatus::class)],
            'priority' => ['sometimes', Rule::enum(TicketPriority::class)],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:100'],
            'search' => ['sometimes', 'string', 'max:255'],
        ];
    }

    /**
     * Get the status filter from the request.
     */
    public function status(): ?TicketStatus
    {
        return $this->enum('status', TicketStatus::class);
    }

    /**
     * Get the priority filter from the request.
     */
    public function priority(): ?TicketPriority
    {
        return $this->enum('priority', TicketPriority::class);
    }

    /**
     * Get the per-page filter from the request.
     */
    public function perPage(): ?int
    {
        return $this->integer('per_page', 15);
    }

    /**
     * Get the search filter from the request.
     */
    public function search(): ?string
    {
        $search = $this->validated('search');

        if (! is_string($search)) {
            return null;
        }

        $search = trim($search);

        return $search !== '' ? $search : null;
    }
}
