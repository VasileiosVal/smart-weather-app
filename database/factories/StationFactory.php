<?php

use Faker\Generator as Faker;

$factory->define(\App\Station::class, function (Faker $faker) {
    return [
        'unique' => $faker->unique()->creditCardNumber,
        'name' => $faker->unique()->firstName,
        'user_id' => rand(1, 10),
        'is_active' => rand(0, 1),
        'privacy' => rand(0 ,1) ? 'private' : 'public',
        'description' => $faker->sentence,
        'location' => $faker->city,
    ];
});
