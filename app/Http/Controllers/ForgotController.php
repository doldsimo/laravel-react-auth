<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotRequest;
use App\Http\Requests\ResetRequest;
use App\User;
use http\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class ForgotController extends Controller
{
    public function forgot(ForgotRequest $request)
    {
        $email = $request->input('email');

        if(User::where('email', $email)->doesntExist()){
            return response([
                'message' => 'User Existiert nicht!'
            ], 404);
        }

        $token = Str::random(10);

        try {


            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token
            ]);


           Mail::send('Mails.forgot', ['token' => $token], function($message) use($email){
               $message->to($email);
               $message->subject('Passwort zurücksetzten');
           });


            return response([
                'message' => 'Schaue in deine Emails'
            ]);

        } catch(\Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ], 400);

        }

    }

    public function reset(ResetRequest $request)
    {
        $token = $request->input('token');

        if(!$passwordResets = DB::table('password_resets')->where('token', $token)->first()){
            return response([
                'message' => 'Falscher Password zurücksetzten Schlüssen'
            ], 400);
        }

        /** @var User $user*/
        if(!$user = User::where('email', $passwordResets->email)->first()){
            return response([
                'message' => 'Benutzer existiert nicht!'
            ], 404);
        }

        $user->password = Hash::make($request->input('password'));
        $user->save();

        return response([
            'message'=> 'Password erfolgreich zurückgesetzt'
        ]);
    }

}
