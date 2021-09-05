<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Faccades\DB;
use Illuminate\Support\Faccades\Str;

use Faker\Factory as Faker;
class PersonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        foreach (range(1, 50) as $index) {
            \DB::table('persons')->insert([
                'anrede' => $faker->title,
                'vorname' => $faker->firstName,
                'nachname' => $faker->lastName,
                'email' => $faker->email,
                'telefon' => $faker->phoneNumber,
                'handy' => $faker->phoneNumber,
                'firma' => (int) $faker->randomDigit,
            ]);
        }
    }
}
