<?php

use App\Http\Controllers\Api\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'application' => 'FlowDesk API', 'version' => '1.0.0']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/organizations/{organization}/tickets', [TicketController::class, 'index'])->middleware('auth:sanctum');
Route::post(
    '/organizations/{organization}/tickets',
    [TicketController::class, 'store'],
)->middleware('auth:sanctum');
