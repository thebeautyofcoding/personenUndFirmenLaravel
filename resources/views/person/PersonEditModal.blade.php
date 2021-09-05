<div class="modal" id="editPerson{{$person->id}}" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Editiere {{$person->vorname}} {{$person->nachname}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <input type="hidden"data-id="{{$person->id}}" class="{{$person->uid}}"value="{{$person->id}}">
          <input type="text" class="form-control mb-3 anrede" value="{{$person->anrede}}">
        <input type="text" class="form-control mb-3 vorname" value="{{$person->vorname}}">
        <input type="text" class="form-control mb-3 nachname" value="{{$person->nachname}}">
        <input type="text" class="form-control mb-3 email" value="{{$person->email}}">
        <input type="text" class="form-control mb-3 telefon"  value="{{$person->telefon}}">
        <input type="text" class="form-control mb-3 handy"  value="{{$person->handy}}">


<div id="companiesSelectMenu">

</div>
      </div>
      <div class="modal-footer">
        <button type="button" data-id="{{$person->id}}" data-dismiss="modal" data-target="#editPerson{{$person->id}}" class="btn btn-primary updateButton">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
