<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Models\User;
use Auth;
use Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    function postLogin(Request $request) {
        
    }

    function login ($params) {
        if (Auth::attempt(['email' => $params->username, 'password' => $params->password])) {
            return Auth::user();
        } else {
            return false;
        }
    }

    function register ($params) {
        $user = new User;

        $user->email = $params->username;
        $user->name = $params->username;
        $user->code = bcrypt($params->username);
        $user->role = 0;
        $user->active = true;
        $user->private_key = bcrypt($params->username);
        $user->password = bcrypt($user->password);

        if ($user->save()) {
            return $user;
        } else {
            return false;
        }
    }
}
