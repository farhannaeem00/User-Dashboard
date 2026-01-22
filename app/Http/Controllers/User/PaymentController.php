<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $payments = $request->user()->payments()->get();

        return response()->json([
            'success' => true,
            'message' => 'Payments retrieved successfully',
            'data' => $payments,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0',
            'currency' => 'nullable|string|max:3',
            'type' => 'required|in:income,expense',
            'category' => 'nullable|string|max:255',
            'status' => 'nullable|in:pending,completed,failed,cancelled',
            'payment_date' => 'required|date',
        ]);

        $payment = $request->user()->payments()->create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Payment created successfully',
            'data' => $payment,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $payment = $request->user()->payments()->findOrFail($id);

        $request->validate([
            'amount' => 'sometimes|required|numeric|min:0',
            'currency' => 'nullable|string|max:3',
            'type' => 'sometimes|required|in:income,expense',
            'category' => 'nullable|string|max:255',
            'status' => 'nullable|in:pending,completed,failed,cancelled',
            'payment_date' => 'sometimes|required|date',
        ]);

        $payment->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Payment updated successfully',
            'data' => $payment,
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $payment = $request->user()->payments()->findOrFail($id);
        $payment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Payment deleted successfully',
            'data' => [],
        ]);
    }
}