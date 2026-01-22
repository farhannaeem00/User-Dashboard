<?php

namespace App\Providers;

use App\Models\Project;
use App\Models\Task;
use App\Models\Note;
use App\Models\Payment;
use App\Models\File;
use App\Policies\ProjectPolicy;
use App\Policies\TaskPolicy;
use App\Policies\NotePolicy;
use App\Policies\PaymentPolicy;
use App\Policies\FilePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Project::class => ProjectPolicy::class,
        Task::class => TaskPolicy::class,
        Note::class => NotePolicy::class,
        Payment::class => PaymentPolicy::class,
        File::class => FilePolicy::class,
    ];

    public function boot(): void
    {
        //
    }
}