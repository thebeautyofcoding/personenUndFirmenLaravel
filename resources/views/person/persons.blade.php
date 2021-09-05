
@extends('layouts.app')

@include('person.SearchPerson')
@include('person.personPageLimit')

<table id="myTable" class="table table-striped">
  <thead>
    <tr id="trHeader" >
      <th scope="col">Anrede</th>
      <th scope="col">Vorname</th>
      <th scope="col">Nachname</th>
      <th scope="col">Email</th>
      <th scope="col">Telefon</th>
      <th scope="col">Handy</th>
      <th scope="col">Firma</th>
      <th scope="col">Updaten </th>
      <th scope="col">Zum Löschen markieren </th>

    </tr>
  </thead>
  <tbody>
@foreach($persons as $person)
    <tr class="tr" data-id="{{$person->id}}">

      <td class="anrede">{{$person->anrede}}</td>
      <td class="vorname">{{$person->vorname}}</td>
      <td class="nachname">{{$person->nachname}}</td>
      <td class="email">{{$person->email}}</td>
      <td class="telefon">{{$person->telefon}}</td>
      <td class="handy">{{$person->handy}}</td>


      <td class="firma" value="{{$person->company->id}}">{{$person->company->name}}</td>


      <td><button  type="button" class="btn btn-primary update" data-id="{{$person->id}}"  data-toggle="modal" data-target="#editPerson{{$person->id}}">Updaten</button><td>
   @include('person.PersonEditModal')
      <td ><input class="personsToDeleteCheckbox" type="checkbox" name="personsToDelete" value="{{$person->id}}"></td>
    </tr>

@endforeach

  </tbody>

</table>

<div class="d-flex justify-content-center align-items-center mb-2" id="NewAndDeleteButtonContainer">
                    <a href="#" >New Person</f:link.action>
                    <button class="btn btn-danger ml-2" id="deletePersons" >Löschen</button>


                </div>


<div class="d-flex justify-content-center mb-5"id="paginationContainer">
<nav id="paginationNav" aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><button id="previousButton" value="{{$previousPage}}" class="page-link">Previous</button></li>
  @foreach($total as $page)

    @if($currentPage===$page)

        <li class="page-item disabled"><button class="page-link personPageButton ">{{$page}}</button></li>

    @else
    <li class="page-item"><button class="page-link personPageButton" value="{{$page}}">{{$page}}</button></li>

    @endif


    @endforeach
    <li class="page-item"><button  id="nextButton" value="{{$nextPage}}" class="page-link">Next</button></li>
  </ul>
</nav>
</div>

