<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Faccades\DB;
use Illuminate\Support\Faccades\Str;


use Faker\Factory as Faker;
class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        foreach(range(1,50) as $index){
            
            \DB::table('firmen')->insert([
                'name' => $faker->company,
                'unterzeile' => $faker->company,
                'strasse' => $faker->streetName,
                'hausnummer' => $faker->randomDigit,
                'plz' => $faker->postcode,
                'ort' => $faker->city,
                'telefon' => $faker->phoneNumber,
                'fax' => $faker->phoneNumber,
                'web' => $faker->email,

            ]);
        }
    }
}
