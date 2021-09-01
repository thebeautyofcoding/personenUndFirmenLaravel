
@extends('layouts.app')

@include('person.SearchPerson')
@include('person.personPageLimit')

<table class="table table-striped">
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
    <tr class="tr">

      <td>{{$person->anrede}}</td>
      <td>{{$person->vorname}}</td>
      <td>{{$person->nachname}}</td>
      <td>{{$person->email}}</td>
      <td>{{$person->telefon}}</td>
      <td>{{$person->handy}}</td>
      <td>{{$person->company->name}}</td>
      <td><button class="btn btn-primary">Updaten</button><td>
      <td ><input type="checkbox" ></td>
    </tr>
@endforeach
  </tbody>
</table>


<div class="d-flex justify-content-center mb-5"id="paginationContainer">
<nav id="paginationNav" aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><button id="previousButton" value="{{$previousPage}}" class="page-link">Previous</button></li>
  @foreach($total as $page)
 
    @if($currentPage===$page)
   
        <li class="page-item disabled"><button class="page-link personPageButton ">{{$page}}</button></li>

    @else
    <li class="page-item"><button class="page-link personPageButton" >{{$page}}</button></li>
  
    @endif


    @endforeach
    <li class="page-item"><button  id="nextButton" value="{{$nextPage}}" class="page-link">Next</button></li>
  </ul>
</nav>
</div>

