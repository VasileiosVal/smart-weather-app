<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>
            @yield('title', env('APP_NAME'))
        </title>
        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
        <!-- CSS Files -->
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    </head>

    <body>
        <!--   React DOM render   -->
        <div id="app_component"></div>

        <!--   Authorized user's api_token assignment for requests to backend api   -->
        <script>
            window.Laravel = {!! json_encode([
            'apiToken' => auth()->user()->api_token ?? null,
            'baseUrl' => env('APP_URL')
        ]) !!};
        </script>

        <!--   Core JS Files   -->
        <script src="{{ asset('js/app.js') }}"></script>
        <script src="{{ asset('js/render.js') }}"></script>

    </body>
    </html>