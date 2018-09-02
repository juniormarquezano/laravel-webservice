<?php

use Faker\Generator as Faker;

$factory->define(\App\Models\Product::class, function (Faker $faker) {
    return [
        'name' => $faker->unique()->word,
		'description' => $faker->sentence,
		'category_id' => rand(1, 10)
    ];
});
