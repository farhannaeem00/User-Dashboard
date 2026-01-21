<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with('user')->get();

        return response()->json([
            'success' => true,
            'message' => 'Payments retrieved successfully',
            'data' => $payments,
        ]);
    }
}