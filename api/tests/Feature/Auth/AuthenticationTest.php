<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;

use function Pest\Laravel\getJson;
use function Pest\Laravel\postJson;

it('authenticates a user with valid credentials', function () {
    $user = User::factory()->create([
        'email' => 'fernando@fds-tech.test',
        'password' => '12345678',
    ]);

    postJson('/login', [
        'email' => $user->email,
        'password' => '12345678',
    ])->assertOk();

    getJson('/api/me')
        ->assertOk()
        ->assertJsonPath('email', $user->email);
});

it('rejects invalid credentials', function () {
    $user = User::factory()->create([
        'email' => 'fernando@fds-tech.test',
        'password' => '12345678',
    ]);

    postJson('/login', [
        'email' => $user->email,
        'password' => 'senha-errada',
    ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('email');
});

it('does not expose the current user when unauthenticated', function () {
    getJson('/api/me')
        ->assertUnauthorized();
});

it('logs out the authenticated user', function () {
    $user = User::factory()->create([
        'email' => 'fernando@fds-tech.test',
        'password' => '12345678',
    ]);

    postJson('/login', [
        'email' => $user->email,
        'password' => '12345678',
    ])->assertOk();

    getJson('/api/me')->assertOk();

    postJson('/logout')->assertOk();

    $this->assertGuest('web');

    Auth::forgetGuards();

    getJson('/api/me')->assertUnauthorized();
});
