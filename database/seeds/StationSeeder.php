<?php

use App\Station;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Station::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');

        factory(Station::class, 20)->create();
    }
}
