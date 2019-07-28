<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/images');
});

Route::resource('images', 'ImagesController');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/home/ownerimages', 'HomeController@ownerimages');

Route::get('/home/ownercomments', 'HomeController@ownercomments');

Route::get('/comments/{id}', 'CommentsController@getComments');

Route::get('/comments/single/{id}', 'CommentsController@getComment');

Route::post('/comments', 'CommentsController@store');

Route::delete('/comments/{id}', 'CommentsController@destroy');
