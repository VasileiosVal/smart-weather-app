@extends('layouts.app')

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
            <div class="container">
                <div class="row justify-content-center align-items-center py-4">
                    <div class="card">
                        <div class="card-header">Laravel</div>
                        <div class="card-body p-5">
                                <a href="https://laravel.com/docs">Documentation</a>
                                <a href="https://laracasts.com">Laracasts</a>
                                <a href="https://laravel-news.com">News</a>
                                <a href="https://nova.laravel.com">Nova</a>
                                <a href="https://forge.laravel.com">Forge</a>
                                <a href="https://github.com/laravel/laravel">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
@endsection