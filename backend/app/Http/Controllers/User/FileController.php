<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function index(Request $request)
    {
        $files = $request->user()->files()->get();

        return response()->json([
            'success' => true,
            'message' => 'Files retrieved successfully',
            'data' => $files,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file',
            'related_type' => 'nullable|string',
            'related_id' => 'nullable|uuid',
        ]);

        $uploadedFile = $request->file('file');
        $path = $uploadedFile->store('files', 'public');

        $file = $request->user()->files()->create([
            'file_path' => $path,
            'file_type' => $uploadedFile->getClientOriginalExtension(),
            'file_size' => $uploadedFile->getSize(),
            'related_type' => $request->related_type,
            'related_id' => $request->related_id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'File uploaded successfully',
            'data' => $file,
        ], 201);
    }

    public function destroy(Request $request, $id)
    {
        $file = $request->user()->files()->findOrFail($id);
        
        Storage::disk('public')->delete($file->file_path);
        $file->delete();

        return response()->json([
            'success' => true,
            'message' => 'File deleted successfully',
            'data' => [],
        ]);
    }
}