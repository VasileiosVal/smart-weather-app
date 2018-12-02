<?php

namespace App\Http\Controllers\api;

use App\Category;
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
                'name' => 'required|string|unique:categories,name',
                'symbol' => 'required|string|unique:categories,symbol'
            ]);
            $category = Category::create($data);
            return response()->json($category, 201);
        }
        if(request()->expectsJson()){
            return response()->json(['error' => 'forbidden'], 403);
        }else{
            abort(403);
        }
    }

    public function update(Request $request, Category $category)
    {
        if(request()->user()->isAdmin()) {
            $data = $request->validate([
                'name' => 'required|string|unique:categories,name,'.$category->id,
                'symbol' => 'required|string|unique:categories,symbol,'.$category->id
            ]);
            $category->update($data);
            event((new categoryEdited($category))->dontBroadcastToCurrentUser());
            return response()->json($category, 200);
        }
        if(request()->expectsJson()){
            return response()->json(['error' => 'forbidden'], 403);
        }else{
            abort(403);
        }
    }

    public function destroy(Category $category) {
        if(request()->user()->isAdmin()){
            if ($category->delete()) {
                return response()->json($category, 200);
            }
        }
        if(request()->expectsJson()){
            return response()->json(['error'=>'forbidden'], 403);
        }else{
            abort(403);
        }
    }
}
