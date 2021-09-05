<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('persons', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('anrede');
            $table->string('vorname');
            $table->string('nachname');
            $table->string('email');
            $table->string('telefon');
            $table->string('handy');
            $table
                ->bigInteger('firma')
                ->nullable()
                ->unsigned();
            $table

                ->foreign('firma')
                ->references('id')
                ->on('firmen')
                
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('persons');
    }
}
