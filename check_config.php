<?php

// Define missing Laravel helper functions
if (!function_exists('env')) {
    function env($key, $default = null) {
        return $default;
    }
}

if (!function_exists('storage_path')) {
    function storage_path($path = '') {
        return __DIR__ . '/storage/' . ltrim($path, '/');
    }
}

if (!function_exists('app_path')) {
    function app_path($path = '') {
        return __DIR__ . '/app/' . ltrim($path, '/');
    }
}

foreach (glob(__DIR__ . '/config/*.php') as $file) {
    $result = require $file;

    if (!is_array($result)) {
        echo basename($file) . " -> " . gettype($result) . PHP_EOL;
    }
}
