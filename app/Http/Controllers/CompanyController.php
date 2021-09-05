<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
class CompanyController extends Controller
{
    public function list()
    {
        $companies = Company::all();
        return response()->json([
            'companies' => $companies,
        ]);
    }
}
