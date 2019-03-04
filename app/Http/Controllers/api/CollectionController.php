<?php

namespace App\Http\Controllers\api;

use App\Collection;
use App\Events\collectionDeleted;
use App\Events\collectionDeletedBelongToUserStation;
use App\Events\needForRender;
use App\Events\newCollectionWithMeasuresCreated;
use App\Events\newCollectionWithMeasuresCreatedNotifyUsersGeneral;
use App\Events\newCollectionWithMeasuresCreatedWithUserStationOwner;
use App\Events\stationAllScenariosInformUsersOnMeasures;
use App\Station;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CollectionController extends Controller
{
    public function index()
    {
        $stations=[];
        if(request()->user()->isAdmin()){
            return Collection::all();
        } else {
            if(request()->user()->stations()->count()){
                $stations = request()->user()->stations()->pluck('id');
                return Collection::whereIn('station_id', $stations)->get();
            } else {
                return $stations;
            }
        }
    }

    public function fetchCollectionsMeasures(Request $request) {
        $error = false;
        $collections = [];

        if(request()->user()->isAdmin()) {
            return count($request->collectionsIds) ?
                Collection::with('measures')->findOrFail($request->collectionsIds)
                : [];
        } else {
            if(count($request->collectionsIds)){
               $collections = Collection::with('measures')->findOrFail($request->collectionsIds)->each(function($collection) use (&$error){
                    if($collection->station->user->id !== request()->user()->id && (
                        !$collection->station->is_active ||
                        $collection->station->privacy === 'private')) $error = true;
                });
                if(!$error) return $collections;
            } else return [];
        }
    }

    public function destroy(Collection $collection) {
        if(request()->user()->isAdmin()){
            event((new collectionDeleted($collection, $collection->station))->dontBroadcastToCurrentUser());
            if(!$collection->station->user->isAdmin()){
                event((new collectionDeletedBelongToUserStation($collection, $collection->station, $collection->station->user))->dontBroadcastToCurrentUser());
            }
            event((new stationAllScenariosInformUsersOnMeasures(collect([$collection->station->id])))->dontBroadcastToCurrentUser());
            $collection->delete();
            return $collection;
        } else {
            if($collection->station->user->id === request()->user()->id){
                event((new collectionDeleted($collection, $collection->station))->dontBroadcastToCurrentUser());
                event((new stationAllScenariosInformUsersOnMeasures(collect([$collection->station->id])))->dontBroadcastToCurrentUser());
                $collection->delete();
                return $collection;
            }
        }
    }

    public function fetchStations()
    {
        if(!request()->user()->isAdmin()){
            $stations = Station::where('user_id', '!=', request()->user()->id)->where('is_active', 1)->where('privacy', 'public')->orWhere('user_id', request()->user()->id)->get();
            if($stations->count()){
                $arr=[];
                foreach ($stations as $station){
                    if($station->collections()->count()){
                        $arr[] = [$station->id, $station->name, $station->collections()->latest()->get()];
                    }
                }
                return $arr;
            }
            return [];
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }

    public function createNewMeasure(Request $request)
    {
        $data = $request->validate([
            'unique' => 'required|string|exists:stations,unique'
        ]);

        if($station = Station::where('unique', $data['unique'])->first()){
            if($station->is_active){
                if($station->categories()->count()){

                    $categoryMissingFromUrl = false;
                    $moreUrlParameters = false;
                    $categoryGivenValueError = false;
                    $success = false;

                    $data = $request->all();

                    if(array_key_exists('time', $data) && is_string($data['time']) && trim($data['time']) !== '' && is_numeric($data['time'])){
                        $collection = $station->collections()->create([
                            'series_hash' => Collection::roleHashCode(),
                            'created_at' => gmdate("Y-m-d H:i:s", $data['time'])
                        ]);
                    } else {
                        $collection = $station->collections()->create([
                        'series_hash' => Collection::roleHashCode()
                        ]);
                    }

                    foreach ($station->categories as $category){
                        if(array_key_exists($category->name, $data)){
                            if(is_string($data[$category->name]) && trim($data[$category->name]) !== '' && is_numeric($data[$category->name])){
                                // value is coming in string type
                                //checking for min/max value and assignment
                                if(floatval($data[$category->name]) <= floatval($category->minValue)) $data[$category->name] = $category->minValue;
                                if(floatval($data[$category->name]) > floatval($category->maxValue)) $data[$category->name] = $category->maxValue;

                                $collection->measures()->create(['category_id' => $category->id, 'value' => floatval($data[$category->name])]);
                                //success
                                $success = true;
                            }else{
                                // null/boolean or different type variable or missing
                                $categoryGivenValueError = true;
                            }
                        }else{
                            //existing category in station doesn't exist in url
                            $categoryMissingFromUrl = true;
                        }
                    }

                    //check also for + timestamp if exists

                    if($station->categories()->count() < (count($data) - 1)){
                        //more url parameters than existing categories in station
                        $moreUrlParameters = true;
                    }


                    if($success){
                        if($categoryGivenValueError && $categoryMissingFromUrl && $moreUrlParameters){
//                            Log::create(['goodtobad' => '2',
//                                'note'      => 'Επιτυχία συλλογής μετρήσεων. * Σταθμός: '.$station->name.'   * Ημερομηνία: '.Carbon::now().'   * Υπενθύμιση: * Έχουν σταλλεί λανθασμένες τιμές, πιθανώς μηδενικές * Υπάρχουν λανθασμένα κομμάτια στο URL αποστολής',
//                                'user_id'   => $station->user_id]);

                        }elseif($categoryMissingFromUrl || $moreUrlParameters){
//                            Log::create(['goodtobad' => '2',
//                                'note'      => 'Επιτυχία συλλογής μετρήσεων. * Σταθμός: '.$station->name.'   * Ημερομηνία: '.Carbon::now().'   * Υπενθύμιση: * Υπάρχουν λανθασμένα κομμάτια στο URL αποστολής',
//                                'user_id'   => $station->user_id]);

                        }elseif($categoryGivenValueError){
//                            Log::create(['goodtobad' => '2',
//                                'note'      => 'Επιτυχία συλλογής μετρήσεων. * Σταθμός: '.$station->name.'   * Ημερομηνία: '.Carbon::now().'   * Υπενθύμιση: * Έχουν σταλλεί λανθασμένες τιμές, πιθανώς μηδενικές,
//                                'user_id'   => $station->user_id]);

                        }else{
//                            Log::create(['goodtobad' => '1',
//                                'note'      => 'Επιτυχία συλλογής μετρήσεων. * Σταθμός: '.$station->name.'   * Ημερομηνία: '.Carbon::now().'',
//                                'user_id'   => $station->user_id]);

                        }
                        event(new newCollectionWithMeasuresCreated($collection, $collection->station->name));
                        if(!$station->user->isAdmin()){
                            event(new newCollectionWithMeasuresCreatedWithUserStationOwner($collection, $collection->station->name));
                        }
                        if($station->is_active && $station->privacy === 'public'){
                            event(new needForRender());
                            event(new newCollectionWithMeasuresCreatedNotifyUsersGeneral($station->name));
                        }
                        return response()->json('collection created successfully', 200);
                    }else{
                        $collection->delete();
                        if($categoryGivenValueError && $categoryMissingFromUrl && $moreUrlParameters){
//                            Log::create(['goodtobad' => '3',
//                                'note'      => 'Αποτυχία συλλογής μετρήσεων. * Σταθμός: '.$station->name.'   * Ημερομηνία: '.Carbon::now().'   * Αιτία: * Έχουν σταλλεί μηδενικές τιμές * Υπάρχουν λανθασμένα κομμάτια στο URL αποστολής',
//                                'user_id'   => $station->user_id]);

                        }elseif($categoryMissingFromUrl || $moreUrlParameters){
//                            Log::create(['goodtobad' => '3',
//                                'note'      => 'Αποτυχία συλλογής μετρήσεων. * Σταθμός: '.$station->name.'   * Ημερομηνία: '.Carbon::now().'   * Αιτία: * Υπάρχουν λανθασμένα κομμάτια στο URL αποστολής',
//                                'user_id'   => $station->user_id]);

                        }elseif($categoryGivenValueError){
//                            Log::create(['goodtobad' => '3',
//                                'note'      => 'Αποτυχία συλλογής μετρήσεων. * Σταθμός: '.$station->name.'   * Ημερομηνία: '.Carbon::now().'   * Αιτία: * Έχουν σταλλεί μηδενικές τιμές',
//                                'user_id'   => $station->user_id]);
                        }
                        return response()->json('not ok', 200);
                    }
                }else{
                    //station has no categories selected
                    return response()->json([__('messages.error') => __('messages.conflict')], 409);
                }
            }else{
                //station inactive
                return response()->json([__('messages.error') => __('messages.conflict')], 409);
            }
        }else{
            //station not found
            return response()->json([__('messages.error') => __('messages.content_not_found')], 404);
        }
    }
}
