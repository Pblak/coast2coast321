<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    @vite([
        'resources/css/_icons.css',
        'resources/css/app.css',
        'resources/css/bootstrap.scss',
        'resources/js/app.js',
        ])

    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/jquery.dataTables.css" />


</head>
<body class="dark:bg-gray-900 dark:text-gray-50">
<div id="app"></div>
</body>
</html>
