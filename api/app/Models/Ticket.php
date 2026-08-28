<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Enums\TicketPriority;
use App\Enums\TicketStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $organization_id
 * @property int $created_by
 * @property string $subject
 * @property string $description
 * @property TicketStatus $status
 * @property TicketPriority $priority
 */
#[Fillable(['organization_id', 'created_by', 'subject', 'description', 'status', 'priority'])]
class Ticket extends Model
{
    use HasFactory;

    /**
     * @return BelongsTo<Organization, $this>
     */
    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    protected function casts(): array
    {
        return [
            'organization_id' => 'integer',
            'created_by' => 'integer',
            'subject' => 'string',
            'description' => 'string',
            'status' => TicketStatus::class,
            'priority' => TicketPriority::class,
        ];
    }
}
