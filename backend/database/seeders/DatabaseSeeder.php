<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin User
        User::create([
            'name' => 'Farhan',
            'email' => 'farhan00@gmail.com',
            'password' => Hash::make('farhan123'),
            'role' => 'admin',
            'is_active' => true,
        ]);

        // Create Regular User
        User::create([
            'name' => 'Farhan Naeem',
            'email' => 'farhannaeem@gmail.com',
            'password' => Hash::make('farhan001'),
            'role' => 'user',
            'is_active' => true,
        ]);
    }
}