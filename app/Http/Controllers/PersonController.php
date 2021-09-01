<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Person;
use App\Models\Company;
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
        
        dd($request);
        $data = [];

        $data = $this->personRepository->ajaxSearch(
            $query,
            $personProperty,
            $currentPage,
            $limit
        );
        $data['currentPage'] = $currentPage;
        $data['nextPage'] = $currentPage + 1;
        $data['previousPage'] = $currentPage - 1;

        $loggedInUser = $GLOBALS['TSFE']->fe_user->user;

        $data['loggedInUser'] = $loggedInUser;
        $data['defaultLimit'] = $ajaxPageLimit;
        $loggedInUser = $GLOBALS['TSFE']->fe_user->user;
        $lastPage = end($data['pages']);
        if ($lastPage == $data['currentPage']) {
            $isLastPage = true;
        } else {
            $isLastPage = false;
        }

        if ($data['pages']['0'] == $data['currentPage']) {
            $isFirstPage = true;
        } else {
            $isFirstPage = false;
        }

        if (count($data['pages']) == 1) {
            $data['onlyOnePage'] = true;
        } else {
            $data['onlyOnePage'] = false;
        }
        $data['isLastPage'] = $isLastPage;
        $data['isFirstPage'] = $isFirstPage;
        $data['loggedInUser'] = $loggedInUser;
        $data['defaultLimit'] = $this->settings['limitForPersons'];
        $data['currentLimit'] = $ajaxPageLimit;
        // $this->view->setVariablesToRender(['data']);
        $personsWithCompany = [];
        $personWithCompany = [];
        foreach ($data['persons'] as $person) {
            $personsWithCompany[] = [
                'anrede' => $person->getAnrede() ? $person->getAnrede() : '',
                'vorname' => $person->getVorname() ? $person->getVorname() : '',
                'nachname' => $person->getNachname()
                    ? $person->getNachname()
                    : '',
                'email' => $person->getEmail(),
                'telefon' => $person->getTelefon(),
                'handy' => $person->getHandy(),
                'uid' => $person->getUid(),
                'firmaUid' => $person->getFirma()
                    ? $person->getFirma()->getUid()
                    : '',
                'firmaName' => $person->getFirma()
                    ? $person->getFirma()->getName()
                    : '',
            ];
        }

        $data['persons'] = $personsWithCompany;

        $data = json_encode($data);

        return $data;


    }
}
