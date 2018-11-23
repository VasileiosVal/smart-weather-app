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
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    </head>

    <body class="">

        <div id="app_component"></div>
        <!--   Core JS Files   -->
        <script>
            window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
            'apiToken' => auth()->user()->api_token ?? null,
        ]) !!};
        </script>
        <script src="{{ mix('js/app.js') }}"></script>

    </body>
    </html>