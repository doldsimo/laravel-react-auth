<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('hello', 'HelloController@hello');
Route::post('login', 'AuthController@login');
Route::post('register','AuthController@register');
Route::post('forgot', 'ForgotController@forgot');
Route::post('reset', 'ForgotController@reset');

Route::get('user', 'AuthController@user')->middleware('auth:api');
