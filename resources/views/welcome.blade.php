@extends('layouts.app')

@section('styles')
    <link href="https://fonts.googleapis.com/css?family=Noto+Serif+SC" rel="stylesheet">
@endsection

@section('content')
    @if (session('status'))
        <div class="form-group">
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                {{ session('status') }}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    @endif
    @if(session()->has('deactivated_user_warning'))
        <div class="form-group">
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                {{ session('deactivated_user_warning') }}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    @endif
    @if(session()->has('verified_user_success'))
        <div class="form-group">
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                {{ session('verified_user_success') }}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    @endif
    @if(session()->has('registered_user_success'))
        <div class="form-group">
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                {{ session('registered_user_success') }}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    @endif
    @if(session()->has('registered_user_fail'))
        <div class="form-group">
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                {{ session('registered_user_fail') }}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    @endif
    <div class="row d-flex justify-content-center mt-5">
        <div class="text-center animated bounceIn slow">
            <img src="{{ asset('images/smart-weather-logo.png') }}" alt="">
        </div>
    </div>
    <div class="text-center">
        <h2 class="text-white d-none d-md-block font-custom animated fadeIn slower">Καλώς ήρθατε!</h2>
        <h3 class="text-white d-block d-md-none font-custom animated fadeIn slower">Καλώς ήρθατε!</h3>
        <h3 class="text-white d-none d-md-block font-custom animated fadeIn slower">Το SmartWeatherApp αποτελεί εφαρμογή για IoT συσκευές</h3>
        <h4 class="text-white d-block d-md-none font-custom animated fadeIn slower">Το SmartWeatherApp αποτελεί εφαρμογή για IoT συσκευές</h4>
        <h3 class="text-white d-none d-md-block font-custom animated fadeIn delay-2s">Δημιουργήστε σταθμούς, πραγματοποιήστε μετρήσεις, συγκρίνετε αποτελέσματα</h3>
        <h4 class="text-white d-block d-md-none font-custom animated fadeIn delay-2s">Δημιουργήστε σταθμούς, πραγματοποιήστε μετρήσεις, συγκρίνετε αποτελέσματα</h4>
    </div>
@endsection