<?php

namespace App\Http\Controllers\api;

use App\Category;
use App\Events\needForRender;
use App\Events\stationAllScenariosInformUsersOnMeasures;
use App\Events\stationCreated;
use App\Events\stationCreatedFromAdminToUser;
use App\Events\stationDeleted;
use App\Events\stationDeletedBelongToUser;
use App\Events\stationEdited;
use App\Events\stationEditedBelongToUserOnlyPrivacyActivity;
use App\Events\stationEditedOwnershipToUser;
use App\Events\userForcedDeleteOwnStation;
use App\Station;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StationController extends Controller
{
    protected $cities = [
        'Αλεξανδρούπολη', 'Κομοτηνή', 'Ξάνθη', 'Καβάλα', 'Δράμα',
        'Σέρρες', 'Κιλκίς', 'Θεσσαλονίκη', 'Πολύγυρος', 'Έδεσσα',
        'Βέροια', 'Φλώρινα', 'Κοζάνη', 'Καστοριά', 'Κατερίνη',
        'Γρεβενά', 'Λάρισα', 'Βόλος', 'Καρδίτσα', 'Τρίκαλα',
        'Ιωάννινα', 'Ηγουμενίτσα', 'Πρέβεζα', 'Άρτα', 'Αθήνα',
        'Λιβαδειά', 'Λαμία', 'Άμφισσα', 'Μεσολόγγι', 'Καρπενήσι',
        'Χαλκίδα', 'Κόρινθος', 'Πάτρα', 'Πύργος', 'Τρίπολη',
        'Ναύπλιο', 'Καλαμάτα', 'Σπάρτη', 'Χανιά', 'Ρέθυμνο',
        'Ηράκλειο', 'Άγιος Νικόλαος', 'Ερμούπολη', 'Ρόδος', 'Σάμος',
        'Μυτιλήνη', 'Χίος', 'Κέρκυρα', 'Αργοστόλι', 'Λευκάδα', 'Ζάκυνθος'
    ];

    public function index()
    {
        return request()->user()->isAdmin() ?
            Station::with('categories')->get()
            :
            request()->user()->stations()->with('categories')->get();
    }

    public function storeAdmin(Request $request)
    {
        $categories=[];
        if(request()->user()->isAdmin()){
            $data = $request->validate([
                'name' => 'required|string|max:255|unique:stations,name',
                'unique' => 'required|string|max:255|unique:stations,unique',
                'user_id' => 'required|integer|exists:users,id',
                'location' => 'required|max:255|string|in:'.implode(',', $this->cities),
                'is_active' => 'required|integer|in:0,1',
                'privacy' => 'required|string|max:255|in:public,private',
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

            $station = Station::with('categories')->find($station->id);
            event((new stationCreated($station))->dontBroadcastToCurrentUser());

            if(!$station->user->isAdmin()){
                event((new stationCreatedFromAdminToUser($station))->dontBroadcastToCurrentUser());
            }
            return $station;
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
                'name' => 'required|string|max:255|unique:stations,name',
                'unique' => 'required|string|max:255|unique:stations,unique',
                'user_id' => 'required|integer|exists:users,id',
                'location' => 'required|string|max:255|in:'.implode(',', $this->cities),
                'is_active' => 'required|integer|in:0,1',
                'privacy' => 'required|string|max:255|in:public,private',
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

            $station = Station::with('categories')->find($station->id);
            event((new stationCreated($station))->dontBroadcastToCurrentUser());

            return $station;
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }

    private function compareCategoriesEqualSame($arr1, $arr2){
        $diff = $arr1->diff($arr2);
        return count($arr1) === count($arr2) && !$diff->count();
    }

    public function editAdmin(Request $request, Station $station)
    {
        $needForRender=false;
        $changedName=false;
        $collections=[];
        $lastIsActive=0;
        $lastPrivacy='';
        $ownershipChanged=false;
        $lastCategories=[];
        $newCategories=[];

        if(request()->user()->isAdmin() && $station->user_id === request()->user()->id){
            $data = $request->validate([
                'name' => 'required|string|max:255|unique:stations,name,'.$station->id,
                'unique' => 'required|string|max:255|unique:stations,unique,'.$station->id,
                'user_id' => 'required|integer|exists:users,id',
                'location' => 'required|string|max:255|in:'.implode(',', $this->cities),
                'is_active' => 'required|integer|in:0,1',
                'privacy' => 'required|string|max:255|in:public,private',
                'description' => 'string|nullable|max:255'
            ]);

            $lastCategories = $station->categories()->pluck('id');

            if(!empty($request->categories)){
                $newCategories = collect($request->categories)->each(function($id){
                    return Category::findOrFail($id);
                });
            }

            $lastIsActive=$station->is_active;
            $lastPrivacy=$station->privacy;

            $station->fill($data);

            if($station->isClean()){
               if($this->compareCategoriesEqualSame($lastCategories, $newCategories)){
                   return response()->json($station, 202);
               } else {
                   if(!empty($newCategories)){
                       $station->categories()->sync($newCategories);
                   } else {
                       $station->categories()->detach();
                   }
                   $station = Station::with('categories')->find($station->id);
                   event((new stationEdited($station))->dontBroadcastToCurrentUser());
                   return $station;
               }
            } else {
                if(!$this->compareCategoriesEqualSame($lastCategories, $newCategories)) {
                    if (!empty($newCategories)) {
                        $station->categories()->sync($newCategories);
                    } else {
                        $station->categories()->detach();
                    }
                }
                if($station->isDirty('name') || $station->isDirty('location') && $station->collections()->count()){
                    $changedName=true;
                }
                if((!($lastIsActive && $lastPrivacy==='public') && !($station->is_active && $station->privacy==='public')) ||
                    ($lastIsActive && $lastPrivacy==='public') && ($station->is_active && $station->privacy==='public')){
                    $needForRender=false;
                }else{
                    if($station->collections()->count()){
                        $needForRender=true;
                    }
                }
                if($station->isDirty('user_id')){
                    $ownershipChanged=true;
                }
                $station->save();
                $station = Station::with('categories')->find($station->id);
                event((new stationEdited($station))->dontBroadcastToCurrentUser());
                if($ownershipChanged && !$station->user->isAdmin()){
                    if($station->collections()->count()){
                        $collections = $station->collections;
                    }
                    event((new stationEditedOwnershipToUser($station, $collections))->dontBroadcastToCurrentUser());
                }
                if($needForRender){
                    event((new needForRender())->dontBroadcastToCurrentUser());
                } else if($changedName){
                    event((new stationAllScenariosInformUsersOnMeasures(collect([$station->id])))->dontBroadcastToCurrentUser());
                }

                return $station;
            }
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }

    public function editUser(Request $request, Station $station)
    {
        $needForRender=false;
        $changedName=false;
        $lastIsActive=0;
        $lastPrivacy='';
        $lastCategories=[];
        $newCategories=[];
        if(!request()->user()->isAdmin() && $station->user_id === request()->user()->id && $request->user_id === request()->user()->id){
            $data = $request->validate([
                'name' => 'required|string|max:255|unique:stations,name,'.$station->id,
                'unique' => 'required|string|max:255|unique:stations,unique,'.$station->id,
                'user_id' => 'required|integer|exists:users,id',
                'location' => 'required|string|max:255|in:'.implode(',', $this->cities),
                'is_active' => 'required|integer|in:0,1',
                'privacy' => 'required|string|max:255|in:public,private',
                'description' => 'string|nullable|max:255'
            ]);

            $lastCategories = $station->categories()->pluck('id');

            if(!empty($request->categories)){
                $newCategories = collect($request->categories)->each(function($id){
                    return Category::findOrFail($id);
                });
            }

            $lastIsActive=$station->is_active;
            $lastPrivacy=$station->privacy;

            $station->fill($data);

            if($station->isClean()){
                if($this->compareCategoriesEqualSame($lastCategories, $newCategories)){
                    return response()->json($station, 202);
                } else {
                    if(!empty($newCategories)){
                        $station->categories()->sync($newCategories);
                    } else {
                        $station->categories()->detach();
                    }
                    $station = Station::with('categories')->find($station->id);
                    event((new stationEdited($station))->dontBroadcastToCurrentUser());
                    return $station;
                }
            } else {
                if(!$this->compareCategoriesEqualSame($lastCategories, $newCategories)) {
                    if (!empty($newCategories)) {
                        $station->categories()->sync($newCategories);
                    } else {
                        $station->categories()->detach();
                    }
                }
                if($station->isDirty('name') && $station->collections()->count()){
                    $changedName=true;
                }
                if((!($lastIsActive && $lastPrivacy==='public') && !($station->is_active && $station->privacy==='public')) ||
                    ($lastIsActive && $lastPrivacy==='public') && ($station->is_active && $station->privacy==='public')){
                    $needForRender=false;
                }else{
                    if($station->collections()->count()){
                        $needForRender=true;
                    }
                }
                $station->save();
                $station = Station::with('categories')->find($station->id);
                event((new stationEdited($station))->dontBroadcastToCurrentUser());
                if($needForRender){
                    event((new needForRender())->dontBroadcastToCurrentUser());
                } else if($changedName){
                    event((new stationAllScenariosInformUsersOnMeasures(collect([$station->id])))->dontBroadcastToCurrentUser());
                }
                return $station;
            }
          }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        } else {
            abort(403);
        }
    }

    public function editAll(Request $request, Station $station)
    {
        $needForRender=false;
        $collections=[];
        $lastIsActive=0;
        $lastPrivacy='';
        $lastUser=0;
        $ownershipChanged=false;
        $notifyUserForUpdatedStation=false;

        if(request()->user()->isAdmin() && $station->user_id !== request()->user()->id && $station->user_id !== 1){
            $data = $request->validate([
                'user_id' => 'required|integer|exists:users,id',
                'is_active' => 'required|integer|in:0,1',
                'privacy' => 'required|string|max:255|in:public,private',
            ]);

            $lastIsActive=$station->is_active;
            $lastPrivacy=$station->privacy;
            $lastUser=$station->user;

            $station->fill($data);

            if($station->isClean()){
                return response()->json($station, 202);
            } else {
                if((!($lastIsActive && $lastPrivacy==='public') && !($station->is_active && $station->privacy==='public')) ||
                    ($lastIsActive && $lastPrivacy==='public') && ($station->is_active && $station->privacy==='public')){
                    $needForRender=false;
                }else{
                    if($station->collections()->count()){
                        $needForRender=true;
                    }
                }
                if($station->isDirty('user_id')){
                    $ownershipChanged=true;
                }
                if($station->isDirty('is_active') || $station->isDirty('privacy') && !$ownershipChanged){
                    $notifyUserForUpdatedStation=true;
                }
                $station->save();
                $station = Station::with('categories')->find($station->id);
                event((new stationEdited($station))->dontBroadcastToCurrentUser());
                if($ownershipChanged){
                    if(!$lastUser->isAdmin()){
                        event((new userForcedDeleteOwnStation($lastUser, $station))->dontBroadcastToCurrentUser());
                    }
                    if(!$station->user->isAdmin()){
                        if($station->collections()->count()){
                            $collections = $station->collections;
                        }
                        event((new stationEditedOwnershipToUser($station, $collections))->dontBroadcastToCurrentUser());
                    }
                } else if($notifyUserForUpdatedStation && !$station->user->isAdmin()){
                    event((new stationEditedBelongToUserOnlyPrivacyActivity($station))->dontBroadcastToCurrentUser());
                }
                if($needForRender){
                    event((new needForRender())->dontBroadcastToCurrentUser());
                }
                return $station;
            }
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
            event((new stationDeleted($station))->dontBroadcastToCurrentUser());
            if($station->collections()->count() && $station->is_active && $station->privacy === 'public'){
                event((new stationAllScenariosInformUsersOnMeasures(collect([$station->id])))->dontBroadcastToCurrentUser());
            }
            $station->delete();
            return $station;
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
            event((new stationDeleted($station))->dontBroadcastToCurrentUser());
            if(!$station->user->isAdmin()){
                event((new stationDeletedBelongToUser($station))->dontBroadcastToCurrentUser());
            }
            if($station->collections()->count() && $station->is_active && $station->privacy==='public'){
                event((new stationAllScenariosInformUsersOnMeasures(collect([$station->id])))->dontBroadcastToCurrentUser());
            }
            $station->delete();

            return $station;
        }
        if(request()->expectsJson()){
            return response()->json([__('messages.error') => __('messages.forbidden')], 403);
        }else{
            abort(403);
        }
    }

}
