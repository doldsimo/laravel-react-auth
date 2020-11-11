<?php

namespace App\Http\Controllers;


use App\Http\Requests\RegisterRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    //User Login
    public function login(Request $request)
    {
        try {
            if (Auth::attempt($request->only('email', 'password'))) {
                /** @var User $user */
                $user = Auth::user();
                $token = $user->createToken('app')->accessToken;


                return response([
                    'message' => 'Eingeloggt',
                    'token' => $token,
                    'user' => $user
                ]);
            }
        }catch (\Exception $exception){
            return response([
                'message' => $exception ->getMessage()
            ]);
        }
        return response([
           'message' => 'Falscher Anmeldename oder Password'
        ], 401);
    }


    //Get current User
    public function user()
    {
        return Auth::user();
    }


    public function  register(RegisterRequest $request)
    {
        try {
            $user = User::create([
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password'))
            ]);

            return $user;
        } catch(\Exception $exception){
            return response([
               'message' => $exception->getMessage()
            ], 400);
        }
    }
}
