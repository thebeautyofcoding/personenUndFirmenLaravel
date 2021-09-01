<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Person;
use App\Models\Company;
use Illuminate\Support\Facades\DB;
class PersonController extends Controller
{
    public function listPersons(Request $request){
     
     
        $limit=5;
        $persons=Person::paginate($limit);

        $totalNumberOfPersons=Person::all()->count();
        $totalNumberOfPages=ceil($totalNumberOfPersons/$limit);
        $arrayWithPageNumbers=[];
        foreach(range(1, $totalNumberOfPages) as $index){
            $arrayWithPageNumbers[]=(int)$index;
        }
       $linksShown =3;
        $currentPage=1;
        $nextPage=$currentPage+1;
        $previousPage=$currentPage-1;

        $visiblePages=[];
        for (
            $x = $currentPage - $linksShown;
            $x < $currentPage + $linksShown + 1;
            ++$x
        ) {
            if ($x > 0 && $x <= $totalNumberOfPages) {
                $visiblePages[]=$x;
            }
        }
        $lastPage = end($arrayWithPageNumbers);
        if ($lastPage == $currentPage) {
            $isLastPage = true;
        } else {
            $isLastPage = false;
        }

        if ($arrayWithPageNumbers['0'] == $currentPage) {
            $isFirstPage = true;
        } else {
            $isFirstPage = false;
        }
      
        
        $limits=[1,2,5,10];
        return view('person.persons', [
            'persons' => $persons,
            'total'=>$visiblePages,
            'visible'=>$visiblePages,
            'currentPage'=>$currentPage,
            
            'previousPage'=>$previousPage,
            'nextPage'=>$nextPage,
            'isFirstPage'=>$isFirstPage,
            'isLastPage'=>$isLastPage,
            'limits'=>$limits
        ]);
    }



    public function ajaxListPersons(Request $request){
        $currentPage = $request->input('currentPage');
        $query=$request->input('query');
        $personProperty=$request->input('personProperty');
        $ajaxPageLimit =$request->input('ajaxPageLimit');
        if(isset($currentPage)){
            $currentPage=(int) $currentPage;
        }else{
            $currentPage=1;
        }
        $ajaxPageLimit = $request->input('ajaxPageLimit');
        if(isset($ajaxPageLimit)){
            $limit=$ajaxPageLimit;
        }else{
            $limit=5;
        }
        
        $offset = $currentPage * $limit;
      
        $persons=Person::offset($offset)->limit($limit)->get();
        $totalNumberOfPersons=Person::all()->count();
        $totalNumberOfPages=ceil($totalNumberOfPersons/$limit);
        $arrayWithPageNumbers=[];
        foreach(range(1, $totalNumberOfPages) as $index){
            $arrayWithPageNumbers[]=(int)$index;
        }
        $linksShown =3;
       
        $nextPage=$currentPage+1;
        $previousPage=$currentPage-1;

        $visiblePages=[];
        for (
            $x = $currentPage - $linksShown;
            $x < $currentPage + $linksShown + 1;
            ++$x
        ) {
            if ($x > 0 && $x <= $totalNumberOfPages) {
                $visiblePages[]=$x;
            }
        }
        
        $lastPage = end($arrayWithPageNumbers);
        if ($lastPage == $currentPage) {
            $isLastPage = true;
        } else {
            $isLastPage = false;
        }

        if ($arrayWithPageNumbers['0'] == $currentPage) {
            $isFirstPage = true;
        } else {
            $isFirstPage = false;
        }
      
        $limits=[1,2,5,10];
        return response()->json([
            'persons' => $persons,
            'total'=>$visiblePages,
            'currentPage'=>$currentPage,
            'previousPage'=>$previousPage,
            'nextPage'=>$nextPage,
            'isFirstPage'=>$isFirstPage,
            'isLastPage'=>$isLastPage,
            'limits'=>$limits
          
        ]);
    }

    public function ajaxSearchAction(Request $request){
        $currentPage = $request->input('currentPage');
        $query=$request->input('query');
        $personProperty=$request->input('personProperty');
        $ajaxPageLimit =$request->input('ajaxPageLimit');
       
    

        if(isset($currentPage)){
            $currentPage=(int) $currentPage;
        }else{
            $currentPage=1;
        }
        $ajaxPageLimit = $request->input('ajaxPageLimit');
        if(isset($ajaxPageLimit)){
            $limit=$ajaxPageLimit;
        }else{
            $limit=5;
        }
        
        $offset = $currentPage * $limit;
       
        $persons=DB::table('persons')->where($personProperty,'=' ,$query)->get();
        dd($persons);
        $totalNumberOfPersons=Person::all()->count();
        $totalNumberOfPages=ceil($totalNumberOfPersons/$limit);
        $arrayWithPageNumbers=[];
        foreach(range(1, $totalNumberOfPages) as $index){
            $arrayWithPageNumbers[]=(int)$index;
        }
        $linksShown =3;
       
        $nextPage=$currentPage+1;
        $previousPage=$currentPage-1;

        $visiblePages=[];
        for (
            $x = $currentPage - $linksShown;
            $x < $currentPage + $linksShown + 1;
            ++$x
        ) {
            if ($x > 0 && $x <= $totalNumberOfPages) {
                $visiblePages[]=$x;
            }
        }
        
        $lastPage = end($arrayWithPageNumbers);
        if ($lastPage == $currentPage) {
            $isLastPage = true;
        } else {
            $isLastPage = false;
        }

        if ($arrayWithPageNumbers['0'] == $currentPage) {
            $isFirstPage = true;
        } else {
            $isFirstPage = false;
        }
      
        $limits=[1,2,5,10];
        return response()->json([
            'persons' => $persons,
            'total'=>$visiblePages,
            'currentPage'=>$currentPage,
            'previousPage'=>$previousPage,
            'nextPage'=>$nextPage,
            'isFirstPage'=>$isFirstPage,
            'isLastPage'=>$isLastPage,
            'limits'=>$limits
          
        ]);

    }
}
