

<select name="ajaxPageLimit" class="form-control" id="ajaxPageLimit">
  <option id="currentLimit" value="">Bitte auswählen:</option>
  @foreach ($limits as $limit)
    <option value="{{$limit}}">{{$limit}}</option>
@endforeach
</select>

