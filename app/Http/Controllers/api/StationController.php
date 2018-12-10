<?php

namespace App\Http\Controllers\api;

use App\Category;
use App\Station;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StationController extends Controller
{

    public function index()
    {
        return request()->user()->isAdmin() ? Station::with('categories')->get() : request()->user()->stations()->with('categories')->get();
    }

    public function storeAdmin(Request $request)
    {
        $categories=[];
        if(request()->user()->isAdmin()){
            $data = $request->validate([
                'name' => 'required|string|unique:stations,name',
                'unique' => 'required|string|unique:stations,unique',
                'user_id' => 'required|integer|exists:users,id',
                'location' => 'required|string',
                'is_active' => 'required|integer|in:0,1',
                'privacy' => 'required|string|in:public,private',
                'description' => 'string|nullable|max:255'
            ]);

            if(!empty($request->categories)){
                $categories = collect($request->categories)->each(function($id){
                    return Category::findOrFail($id);
                });
            }
            $station = User::findOrFail($data['user_id'])->stations()->create($data);

            if(!empty($categories)){
                $station->categories()->attach($categories);
            }
            return response()->json(Station::with('categories')->find($station->id), 201);
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }


    public function storeUser(Request $request)
    {
        $categories=[];
        if(!request()->user()->isAdmin() && request()->user()->id === $request->user_id){
            $data = $request->validate([
                'name' => 'required|string|unique:stations,name',
                'unique' => 'required|string|unique:stations,unique',
                'user_id' => 'required|integer|exists:users,id',
                'location' => 'required|string',
                'is_active' => 'required|integer|in:0,1',
                'privacy' => 'required|string|in:public,private',
                'description' => 'string|nullable|max:255'
            ]);

            if(!empty($request->categories)){
                $categories = collect($request->categories)->each(function($id){
                    return Category::findOrFail($id);
                });
            }
            $station = User::findOrFail($data['user_id'])->stations()->create($data);

            if(!empty($categories)){
                $station->categories()->attach($categories);
            }
            return response()->json(Station::with('categories')->find($station->id), 201);
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }


    public function editAdmin(Request $request, Station $station)
    {
        $categories=[];
        if(request()->user()->isAdmin() && $station->user_id === request()->user()->id){
            $data = $request->validate([
                'name' => 'required|string|unique:stations,name,'.$station->id,
                'unique' => 'required|string|unique:stations,unique,'.$station->id,
                'user_id' => 'required|integer|exists:users,id',
                'location' => 'required|string',
                'is_active' => 'required|integer|in:0,1',
                'privacy' => 'required|string|in:public,private',
                'description' => 'string|nullable|max:255'
            ]);

            if(!empty($request->categories)){
                $categories = collect($request->categories)->each(function($id){
                    return Category::findOrFail($id);
                });
            }
            $station->update($data);

            if(!empty($categories)){
                $station->categories()->sync($categories);
            } else {
                $station->categories()->detach();
            }
            return response()->json(Station::with('categories')->find($station->id), 201);
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }


    public function editUser(Request $request, Station $station)
    {
        $categories=[];
        if(!request()->user()->isAdmin() && $station->user_id === request()->user()->id && $request->user_id === request()->user()->id){
            $data = $request->validate([
                'name' => 'required|string|unique:stations,name,'.$station->id,
                'unique' => 'required|string|unique:stations,unique,'.$station->id,
                'user_id' => 'required|integer|exists:users,id',
                'location' => 'required|string',
                'is_active' => 'required|integer|in:0,1',
                'privacy' => 'required|string|in:public,private',
                'description' => 'string|nullable|max:255'
            ]);

            if(!empty($request->categories)){
                $categories = collect($request->categories)->each(function($id){
                    return Category::findOrFail($id);
                });
            }
            $station->update($data);

            if(!empty($categories)){
                $station->categories()->sync($categories);
            } else {
                $station->categories()->detach();
            }
            return response()->json(Station::with('categories')->find($station->id), 201);
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }

    public function editAll(Request $request, Station $station)
    {
        if(request()->user()->isAdmin() && $station->user_id !== request()->user()->id && $station->user_id !== 1){
            $data = $request->validate([
                'user_id' => 'required|integer|exists:users,id',
                'is_active' => 'required|integer|in:0,1',
                'privacy' => 'required|string|in:public,private',
            ]);
            $station->update($data);
            return response()->json(Station::with('categories')->find($station->id), 201);
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }

    public function destroy(Station $station)
    {
        if($station->user_id === request()->user()->id){
            if($station->delete()){
                return response()->json($station, 200);
            }
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        }else{
            abort(403);
        }
    }

    public function destroyFromAdmin(Station $station)
    {
        if(request()->user()->isAdmin() && $station->user_id !== 1 && $station->user_id !== request()->user()->id){
            if($station->delete()){
                return response()->json($station, 200);
            }
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        }else{
            abort(403);
        }
    }
}
