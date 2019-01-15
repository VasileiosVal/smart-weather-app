<?php

namespace App\Http\Controllers\Api;

use App\Category;
use App\Measure;
use App\Station;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MeasuresController extends Controller
{
    public function fetchLatest()
    {
        $measures=[];
        if(request()->user()->isAdmin()) {
            if(!Measure::count()) return [];
            foreach(Category::all() as $category){
                if($category->measures()->count() && $category->name !== 'rain'){
                    $measures[] = (object) [
                        'category_id' => $category->id,
                        'min' => (object) [
                            'value'=> $category->takeMinMeasure()->value,
                            'station_id'=> $category->takeMinMeasure()->collection->station->id,
                            'created_at_tmstp'=> $category->takeMinMeasure()->collection->created_at->timestamp
                    ], 'max' => (object) [
                            'value'=> $category->takeMaxMeasure()->value,
                            'station_id'=> $category->takeMaxMeasure()->collection->station->id,
                            'created_at_tmstp'=> $category->takeMaxMeasure()->collection->created_at->timestamp
                        ]
                    ];
                }
            }
            return $measures;
        } else {
            if(!Measure::count()) return [];
            foreach(Category::all() as $category){
                if($category->measures()->count() && $category->name !== 'rain' && $category->measuresAllowedForUser(request()->user())){
                    $measures[] = (object) [
                        'category_id' => $category->id,
                        'min' => (object) [
                            'value'=> $category->takeMinMeasureAllowForUser(request()->user())->value,
                            'station_id'=> $category->takeMinMeasureAllowForUser(request()->user())->collection->station->id,
                            'created_at_tmstp'=> $category->takeMinMeasureAllowForUser(request()->user())->collection->created_at->timestamp
                        ], 'max' => (object) [
                            'value'=> $category->takeMaxMeasureAllowForUser(request()->user())->value,
                            'station_id'=> $category->takeMaxMeasureAllowForUser(request()->user())->collection->station->id,
                            'created_at_tmstp'=> $category->takeMaxMeasureAllowForUser(request()->user())->collection->created_at->timestamp
                        ]
                    ];
                }
            }
            return $measures;
        }
    }

    public function fetchAllCategories()
    {
        $categories=[];
        $stations=[];

        if(request()->user()->isAdmin()) {
            if(!Measure::count()) return [];
            foreach(Category::all() as $category){
                if($category->measures()->count()){
                    $stations = $category->measures->map(function($measure){
                        return $measure->collection->station->id;
                    })->unique()->values();

                    $categories[] = (object) [
                        'category_id' => $category->id,
                        'stations_ids' => $stations
                    ];
                }
            }
            return $categories;
        } else {
            if(!Measure::count()) return [];
            foreach(Category::all() as $category){
                if($category->measures()->count() && $category->measuresAllowedForUser(request()->user())){
                    $stations = $category->measures->filter(function($measure){
                        return Measure::checkMeasureAllowance($measure, request()->user());
                    })->map(function($measure){
                        return $measure->collection->station->id;
                    })->unique()->values();

                    $categories[] = (object) [
                        'category_id' => $category->id,
                        'stations_ids' => $stations
                    ];
                }
            }
            return $categories;
        }
    }

    public function fetchAllMeasuresFromSpecificStationsAndCategory(Request $request)
    {
        $acceptedData=[];
        $wrongStationsGivenForUser=[];

        $data = $request->validate([
           'category_id' => 'required|integer|exists:categories,id',
            'stations' => 'required|array'
        ]);

        $category = Category::findOrFail($data['category_id']);
        $stations = Station::findOrFail($data['stations']);

        if(!request()->user()->isAdmin()) {

            $wrongStationsGivenForUser = $stations->filter(function($station){
                return $station->user_id !== request()->user()->id && (!$station->is_active || $station->privacy === 'private');
                });

            if($wrongStationsGivenForUser->count()) {
                if (request()->expectsJson()) {
                    return response()->json([__('messages.error') => __('messages.forbidden')], 403);
                } else {
                    abort(403);
                }
            }
        }

        $categoryCollections = $category->measures()->pluck('collection_id');
        if(!$categoryCollections->count()) return [];

        $stations->each(function($station) use(&$categoryCollections, &$category, &$acceptedData){
            $measures = $station->collections()->find($categoryCollections)->map(function($collection) use(&$category){
                return (object) [
                    'value' => $collection->measures()->where('category_id', $category->id)->first()->value,
                    'collection_id' =>$collection->id,
                    'created_at_tmstp' => $collection->created_at->timestamp
                ];
            });
            $acceptedData[] = (object) [
                'station_id' => $station->id,
                'measures' => $measures
            ];
        });

        return $acceptedData;

    }
}
