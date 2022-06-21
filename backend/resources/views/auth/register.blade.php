<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sign up</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>

<body>

    <div class="h-screen">
        <form class="w-72 m-auto table h-screen" method="POST" action="{{ route('register') }}">
            @csrf
            <div class="table-cell align-middle">
                <h2 class="text-3xl mb-1">Sign up</h2>
                <p class="text-xs mb-4 text-stone-600">Stay updated on your professional world</p>

                <input id="email" type="email" class="p-2 border border-solid border-stone-400 w-full rounded"
                    name="email" value="{{ old('email') }}" required autocomplete="email" autofocus
                    placeholder="Email">

                @error('email')
                    <span class="text-xs text-stone-500 absolute" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror

                <input id="name" type="name"
                    class="p-2 border border-solid border-stone-400 w-full mt-4 rounded" name="name"
                    value="{{ old('name') }}" required autocomplete="name" autofocus placeholder="Name">

                @error('name')
                    <span class="text-xs text-stone-500 absolute" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror

                <input id="password" type="password"
                    class="p-2 border border-solid border-stone-400 w-full mt-4 rounded" name="password" required
                    autocomplete="current-password" placeholder="Password">

                @error('password')
                    <span class="text-xs text-stone-500 absolute" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror

                <input id="password-confirm" type="password"
                    class="p-2 border border-solid border-stone-400 w-full mt-4 rounded" name="password_confirmation"
                    required autocomplete="new-password" placeholder="Password confirm">

                <button type="submit" class="!bg-sky-600 text-white w-full p-2 rounded-full mt-4">
                    {{ __('Sign up') }}
                </button>

                <a href="{{ url('login') }}"
                    class="!bg-white text-stone-500 w-full p-2 rounded-full block border border-solid border-stone-400 text-center mt-4">
                    {{ __('Sign in') }}
                </a>
            </div>


        </form>

    </div>

</body>

</html>
