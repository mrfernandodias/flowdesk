<?php

namespace App\Http\Resources;

use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property Organization $organization
 * @property string $role
 */
class CurrentUserOrganizationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->organization->id,
            'name' => $this->organization->name,
            'slug' => $this->organization->slug,
            'role' => $this->role,
        ];
    }
}
