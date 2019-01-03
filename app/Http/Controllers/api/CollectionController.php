<?php

namespace App\Http\Controllers\api;

use App\Collection;
use App\Events\newCollectionWithMeasuresCreated;
use App\Events\newCollectionWithMeasuresCreatedListenEveryone;
use App\Events\newCollectionWithMeasuresCreatedWithUserStationOwner;
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
                return [];
            }
        }
    }

    public function fetchOther()
    {
        if(!request()->user()->isAdmin()){
            $stations = Station::where('user_id', '!=', request()->user()->id)->where('is_active', 1)->where('privacy', 'public')->get();
            if($stations->count()){
               $arr=[];
               foreach ($stations as $station){
                   if($station->collections()->count()){
                       $newestCollection = $station->collections()->latest()->first();
                       $arr[] = [intval($newestCollection->id), $newestCollection->series_hash, $newestCollection->created_at, $station->name, intval($station->id)];
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

    public function fetchStations()
    {
        if(!request()->user()->isAdmin()){
            $stations = Station::where('user_id', '!=', request()->user()->id)->where('is_active', 1)->where('privacy', 'public')->orWhere('user_id', request()->user()->id)->get();
            if($stations->count()){
                $arr=[];
                foreach ($stations as $station){
                    if($station->collections()->count()){
                        $arr[] = [intval($station->id), $station->name];
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

    public function createNewMeasure()
    {
        $data = request()->validate([
            'unique' => 'required|string|exists:stations,unique'
        ]);

        if($station = Station::where('unique', $data['unique'])->first()){
            if($station->is_active){
                if($station->categories()->count()){

                    $category_sum_check = false;
                    $input_sum_check = false;
                    $errors_check = false;
                    $success = false;

                    $data = request()->all();

                    $collection = $station->collections()->create([
                    'series_hash' => Collection::roleHashCode()
                    ]);

                    foreach ($station->categories as $category){
                        if(array_key_exists($category->name, $data)){
                            if(!is_null($data[$category->name]) && !is_bool($data[$category->name]) &&
                                trim($data[$category->name]) !== '' && is_numeric($data[$category->name])){
                                //to value ερχεται σε string
                                $collection->measures()->create(['category_id' => $category->id, 'value' => $data[$category->name]]);
                                //success
                                $success = true;
                            }else{
                                // null/boolean variable or missing or different type
                                $errors_check = true;
                            }
                        }else{
                            //existing category in station doesn't exist in url
                            $category_sum_check = true;
                        }
                    }

                    if($station->categories()->count() < (count($data) - 1)){
                        //more url parameters than existing categories in station
                        $input_sum_check = true;
                    }


                    if($success){
                        if($errors_check && $category_sum_check && $input_sum_check){
//                            Log::create(['goodtobad' => '2',
//                                'note'      => 'Επιτυχία συλλογής μετρήσεων. * Σταθμός: '.$station->name.'   * Ημερομηνία: '.Carbon::now().'   * Υπενθύμιση: * Έχουν σταλλεί μηδενικές τιμές * Υπάρχουν λανθασμένα κομμάτια στο URL αποστολής',
//                                'user_id'   => $station->user_id]);

                        }elseif($category_sum_check || $input_sum_check){
//                            Log::create(['goodtobad' => '2',
//                                'note'      => 'Επιτυχία συλλογής μετρήσεων. * Σταθμός: '.$station->name.'   * Ημερομηνία: '.Carbon::now().'   * Υπενθύμιση: * Υπάρχουν λανθασμένα κομμάτια στο URL αποστολής',
//                                'user_id'   => $station->user_id]);

                        }elseif($errors_check){
//                            Log::create(['goodtobad' => '2',
//                                'note'      => 'Επιτυχία συλλογής μετρήσεων. * Σταθμός: '.$station->name.'   * Ημερομηνία: '.Carbon::now().'   * Υπενθύμιση: * Έχουν σταλλεί μηδενικές τιμές',
//                                'user_id'   => $station->user_id]);

                        }else{
//                            Log::create(['goodtobad' => '1',
//                                'note'      => 'Επιτυχία συλλογής μετρήσεων. * Σταθμός: '.$station->name.'   * Ημερομηνία: '.Carbon::now().'',
//                                'user_id'   => $station->user_id]);

                        }
                        event(new newCollectionWithMeasuresCreated($collection));
                        if(!$station->user->isAdmin()){
                            event(new newCollectionWithMeasuresCreatedWithUserStationOwner($collection));
                        }
                        event(new newCollectionWithMeasuresCreatedListenEveryone($collection));
                        return response()->json('ok', 200);
                    }else{
                        $collection->delete();
                        if($errors_check && $category_sum_check && $input_sum_check){
//                            Log::create(['goodtobad' => '3',
//                                'note'      => 'Αποτυχία συλλογής μετρήσεων. * Σταθμός: '.$station->name.'   * Ημερομηνία: '.Carbon::now().'   * Αιτία: * Έχουν σταλλεί μηδενικές τιμές * Υπάρχουν λανθασμένα κομμάτια στο URL αποστολής',
//                                'user_id'   => $station->user_id]);

                        }elseif($category_sum_check || $input_sum_check){
//                            Log::create(['goodtobad' => '3',
//                                'note'      => 'Αποτυχία συλλογής μετρήσεων. * Σταθμός: '.$station->name.'   * Ημερομηνία: '.Carbon::now().'   * Αιτία: * Υπάρχουν λανθασμένα κομμάτια στο URL αποστολής',
//                                'user_id'   => $station->user_id]);

                        }elseif($errors_check){
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


    public function store(Request $request)
    {
        //
    }

    public function showOwn(Collection $collection)
    {
        if(!request()->user()->isAdmin() && $collection->station->user->id === request()->user()->id ){
            $measures = $collection->measures;
            return $measures;
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }

    public function showOther(Collection $collection)
    {
        if(!request()->user()->isAdmin() && $collection->station->user->id !== request()->user()->id && $collection->station->is_active && $collection->station->privacy === 'public'){
            $measures = $collection->measures;
            return $measures;
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }

    public function showOtherAndUser(Collection $collection)
    {
        if(!request()->user()->isAdmin()){
            $measures = $collection->measures;
            return response()->json($measures, 200);
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }


    public function showAdmin(Collection $collection)
    {
        if(request()->user()->isAdmin()){
            $measures = $collection->measures;
            return $measures;
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
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
