<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Image Gallery')</title>

    <link rel="stylesheet" href="/css/app.css">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar col-md navbar-dark bg-dark navbar-expand-lg sticky-top mb-2">
        <div class="container">
            <!-- Site logo/ brand -->
            <img src="{{ asset('image/site/ig_logo.png') }}" class="float-left mr-3" id="img-logo" alt="IG logo">
            <a class="navbar-brand" href="/images">Image Gallery</a>

            <!-- Toggler/collapsibe Button -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Navbar links -->
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link @yield('home', '')" href="/images">Images</a>
                    </li>
                    @guest
                    @else
                        <li class="nav-item">
                            <a class="nav-link @yield('upload', '')" href="/images/create">Upload image</a>
                        </li>
                    @endguest
                </ul>
                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                    <!-- Authentication Links -->
                    @guest
                        <li class="nav-item">
                            <a class="nav-link @yield('login', '')" href="/login">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link @yield('register', '')" href="/register">Register</a>
                        </li>
                    @else
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                               data-toggle="dropdown">
                                {{ Auth::user()->name }} <span class="caret"></span>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="/home">
                                    My posts
                                </a>

                                <a class="dropdown-item" href="/logout"
                                   onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    Logout
                                </a>

                                <form id="logout-form" class="hidden" action="/logout" method="POST">
                                    @csrf
                                </form>
                            </div>
                        </li>
                    @endguest
                </ul>
            </div>
        </div>
    </nav>

    <div @yield('fluid', ' class=container')>
        @yield('content', 'Whoops! No content found!')
    </div>

    @include('errors')

    <script src="/js/manifest.js"></script>
    <script src="/js/vendor.js"></script>
    <script src="/js/app.js"></script>
</body>
</html>
