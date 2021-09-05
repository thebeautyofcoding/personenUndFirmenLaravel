<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $table = 'firmen';
   
    public function person(){
        return $this->hasMany('App\Models\Person');

    }

}
