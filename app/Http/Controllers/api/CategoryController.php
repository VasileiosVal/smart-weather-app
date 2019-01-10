<?php

namespace App\Http\Controllers\api;

use App\Category;
use App\Collection;
use App\Events\categoryEdited;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{

    public function index() {
        return Category::all();
    }

    public function store(Request $request) {
        if(request()->user()->isAdmin()) {
            $data = $request->validate([
                'name' => 'required|string|max:255|unique:categories,name',
                'symbol' => 'required|string|max:255|unique:categories,symbol'
            ]);
            return  Category::create($data);
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        }else{
            abort(403);
        }
    }

    public function update(Request $request, Category $category)
    {
        if(request()->user()->isAdmin()) {
            $data = $request->validate([
                'name' => 'required|string|max:255|unique:categories,name,'.$category->id,
                'symbol' => 'required|string|max:255|unique:categories,symbol,'.$category->id
            ]);
            $category->fill($data);
            if($category->isClean()){
                return response()->json($category, 202);
            } else {
                $category->save();
                event((new categoryEdited($category))->dontBroadcastToCurrentUser());
                return $category;
            }
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        }else{
            abort(403);
        }
    }

    public function destroy(Category $category) {
        if(request()->user()->isAdmin()){
            $category->delete();
            Collection::all()->each(function($collection){
                if(!$collection->measures()->count()){
                    $collection->delete();
                }
            });
            return $category;
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        }else{
            abort(403);
        }
    }

}
