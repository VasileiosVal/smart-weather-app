<?php

namespace App\Http\Controllers\api;

use App\Station;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StationController extends Controller
{



    public function index()
    {
        return request()->user()->isAdmin() ? Station::all() : request()->user()->stations;
    }




    public function create()
    {
        //
    }





    public function store(Request $request)
    {
        //
    }





    public function show($id)
    {
        //
    }





    public function edit($id)
    {
        //
    }






    public function update(Request $request, $id)
    {
        //
    }





    public function destroy($id)
    {
        //
    }
}
