<!-- Stored in resources/views/layouts/app.blade.php -->

<html>
    <head>
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <script src="https://unpkg.com/mustache@latest" type="module"></script>

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

    <link href="{{ asset('/bootstrap.min.css') }}" rel="stylesheet" type="text/css" >

    <script src="{{ asset('/js/jQuery.js') }}" ></script>





    </head>
    <body>
  <script src="{{ asset('/js/personsTableJQuery.js') }}" ></script>
    </body>
</html>

