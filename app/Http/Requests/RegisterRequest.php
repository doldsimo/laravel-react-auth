<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'password_confirm' => 'required|same:password',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'first_name.required' => 'Geben Sie bitte Ihren Vornamen ein.',
            'last_name.required' => 'Geben Sie bitte Ihren Nachnamen ein.',
            'email.required' => 'Geben Sie bitte Ihren Email Adresse ein.',
            'email.email' => 'Dies ist keine gültige Email Adresse.',
            'email.unique' => 'Dies Email Adresse ist schon registriert.',
            'password.required' => 'Geben Sie bitte ein Passwort ein.',
            'password_confirm.required' => 'Geben Sie bitten ein Passwort in das Passwort bestätigen Feld ein.',
            'password_confirm.same' => 'Die Passwörter stimmen nicht überein. Überprüfen Sie Ihre Eingaben.',
        ];
    }
}
