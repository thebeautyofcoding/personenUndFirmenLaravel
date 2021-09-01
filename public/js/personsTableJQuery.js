$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(document).ready(function () {
 
    $(this).on('click', ':button.personPageButton, :button#nextButton, :button#previousButton', function () {
      var controllerpath='/persons';
        var currentPageNumber = $(this).val();

        var controllerpath = '/persons'
        var ajaxPageLimit = $('#ajaxPageLimit').val()
        if ($('#personProperty').val() === '' && $('#searchInput').val() === '') {


            $.ajax({
                type: "POST",
                url: controllerpath,



                data: { 'currentPage': currentPageNumber, 'ajaxPageLimit':ajaxPageLimit},
                success: function (response) {
           
                    $('.tr').each(function () {
                        $(this).remove()
                    })

                    $('#currentLimit').val(ajaxPageLimit)
                    $('#currentLimit').text(ajaxPageLimit)



                    $.map(response.persons, function(person){
                        personHtml=`<tr class="tr">

                        <td>${person.anrede}</td>
                        <td>${person.vorname}</td>
                        <td>${person.nachname}</td>
                        <td>${person.email}</td>
                        <td>${person.telefon}</td>
                        <td>${person.handy}}</td>
                        <td>${person.company}</td>
                        <td><button class="btn btn-primary">Updaten</button><td>
                        <td ><input type="checkbox" ></td>
                        </tr>`

                     
                        
                        
                        $('tbody').append(personHtml)
                    })


                  



                    $('#paginationNav').remove()

                    var paginationTemplate = `
                    {{^onlyOnePage}}
                    <nav id="paginationNav" aria-label="Page navigation example">
                        <ul class="pagination">
                        {{#previousPage}}
                            <li class="page-item">
                                <button class="page-link" id="previousButton" type="submit"  value="{{.}}">
                                    Previous
                                </button>
                            </li>
                            {{/previousPage}}
                            {{#total}}
                          
          
                       
                            <li class="page-item">
                                <button class="page-link personPageButton"  type="submit"  value="{{.}}">
                                   {{.}}
                                </button>
                            </li>
                            {{/total}}
                        {{^isLastPage}}
                            {{#nextPage}}
                            <li class="page-item">
                                <button class="page-link" id="nextButton" type="submit"  value="{{.}}">
                                    Next
                                </button>
                            </li>
                            {{/nextPage}}
                        {{/isLastPage}}
                        </ul>
                    </nav>
                {{/onlyOnePage}}
                `
                var pagintationHtml = Mustache.render(paginationTemplate, response)
                    $('#paginationContainer').append(pagintationHtml)

                    $(`button[value=${response.currentPage}]`).closest('li').addClass('disabled')


                    // persons = {}
                    // persons.person=[]
                    // console.log(response)
                    // var personList = []
                    // // var person= new Object()
                    // response.persons.map(function (curr) {

                    //     personList.push(curr)

                    // })
                    // console.log(response)
                    // // var persons=JSON.stringify(persons)
                    // // persons={persons:persons}
            



                    // $('#trHeader').after(html)










                }
            })

        } else {
           
            var controllerpath = '/persons'
            var limit = $("#ajaxPageLimit").val();
            var query = $("#searchInput").val();
       
            var personProperty = $('#personProperty').val()
            var ajaxPageLimit = $('#ajaxPageLimit').val()
            console.log(ajaxPageLimit)
            $.ajax({
                type: "POST",
                url: 'persons/search',
                data: { 'currentPage': currentPageNumber, 'personProperty':personProperty, 'limit':limit, 'query': query, 'ajaxPageLimit':ajaxPageLimit },
                success: function (response) {
                
                    $('.tr').each(function () {
                        $(this).remove()
                    })

                    $('#currentLimit').val(limit)
                    $('#currentLimit').text(limit)

             
                    $.map(response.persons, function(person){
                        personHtml=`<tr class="tr">

                        <td>${person.anrede}</td>
                        <td>${person.vorname}</td>
                        <td>${person.nachname}</td>
                        <td>${person.email}</td>
                        <td>${person.telefon}</td>
                        <td>${person.handy}}</td>
                        <td>${person.company}</td>
                        <td><button class="btn btn-primary">Updaten</button><td>
                        <td ><input type="checkbox" ></td>
                        </tr>`

                     
                        
                        
                        $('tbody').append(personHtml)
                    })
                  
                    
                  
                    $('#paginationNav').remove()
                    console.log(response.currentPage)
                   
                  



                       

                    var paginationTemplate = `
                    {{^onlyOnePage}}
                    <nav id="paginationNav" aria-label="Page navigation example">
                        <ul class="pagination">
                        {{#previousPage}}
                            <li class="page-item">
                                <button class="page-link" id="previousButton" type="submit" name="" value="{{.}}">
                                    Previous
                                </button>
                            </li>
                            {{/previousPage}}
                            {{#total}}
                          
          
                       
                            <li class="page-item">
                                <button class="page-link personPageButton"  type="submit" name="" value="{{.}}">
                                   {{.}}
                                </button>
                            </li>
                            {{/total}}
                        {{^isLastPage}}
                            {{#nextPage}}
                            <li class="page-item">
                                <button class="page-link" id="nextButton" type="submit" name="" value="{{.}}">
                                    Next
                                </button>
                            </li>
                            {{/nextPage}}
                        {{/isLastPage}}
                        </ul>
                    </nav>
                {{/onlyOnePage}}
                `
                var pagintationHtml = Mustache.render(paginationTemplate, response)
                    console.log(pagintationHtml)
                            $('#paginationContainer').append(pagintationHtml)
                            $(`button[value=${response.currentPage}]`).closest('li').addClass('disabled')
                },
                error: function(e) {
                    console.log(e);
                }
            })
        }
    })



    $(document).ready(function () {
        $('#searchInput').prop('disabled', 'disabled')
        $('#personProperty').change(function () {
           
            if ($(this).val() !== '') {
                $('#searchInput').prop('disabled', false)
            } else {
                $('#searchInput').prop('disabled', true)
            }
            if ($('#searchInput').val() !== '') {
                var query = $('#searchInput').val().toLowerCase().trim();
                var personProperty = $(this).val();
                var limit = $('#ajaxPageLimit').val();
                
                $.ajax({
                    url: 'persons/search',
                    data: {
                        'query': query,
                        'personProperty': personProperty,
                        'ajaxPageLimit': limit,
                        'currentPage': 1
                    },
                    method: 'POST',
    
                    success: function (response) {
                        $('.tr').remove()
                        var tableRows = $(response).find('.tr')
    
                        $('#trHeader').after(tableRows)
                        $('#paginationContainer').remove()
    
                        var pagination = $(response).find('#paginationContainer')
                        $('#table').after(pagination)
    
                    },
                    error: function () {
                        alert("something has gone wrong");
                    }
                });
            }
    
        })
    })

    $("#searchInput").on("keyup", function () {

        var query = $(this).val().toLowerCase().trim();
        var personProperty = $('#personProperty').val();
        var limit = $('#ajaxPageLimit').val().trim();
        console.log(limit)
        $.ajax({
            url: 'persons/search',
            data: {
                'query': query,
                'personProperty': personProperty,
                'limit': limit,
                'currentPage': 1
            },
            method: 'POST',

            success: function (response) {
                $('.tr').remove()

                var tableRowHtml = Mustache.render(tableRowTemplate, response)
                var paginationHtml = Mustache.render(paginationTemplate, response)
                $('#trHeader').after(tableRowHtml)
                $('.pagination').remove()


                $('#table').after(paginationHtml)

            },
            error: function () {

            }
        });
    });



    $('#ajaxPageLimit').change(function () {

        var val = $('#ajaxPageLimit').val();
        console.log(val)
        var personProperty = $('#personProperty').val();
        var searchInput = $('#searchInput').val();


        const pageNumber = $('.page-item.disabled').find('#pageButton').val()

        var controllerpath = $("#uri_hidden").val();

        if (personProperty == '' && searchInput == '') {


            $.ajax({
                type: "POST",
                url: '/persons',
                data: { 'ajaxPageLimit': val, 'pageNumber': 1 },
                success: function (response) {
                    $('.tr').each(function () {
                        $(this).remove()

                    }
                    )
                    $('#paginationNav').remove()

                    var paginationTemplate = `
                    {{^onlyOnePage}}
                    <nav id="paginationNav" aria-label="Page navigation example">
                        <ul class="pagination">
                        {{#previousPage}}
                            <li class="page-item">
                                <button class="page-link" id="previousButton" type="submit" name="" value="{{.}}">
                                    Previous
                                </button>
                            </li>
                            {{/previousPage}}
                            {{#total}}
                          
          
                       
                            <li class="page-item">
                                <button class="page-link personPageButton"  type="submit" name="" value="{{.}}">
                                   {{.}}
                                </button>
                            </li>
                            {{/total}}
                        {{^isLastPage}}
                            {{#nextPage}}
                            <li class="page-item">
                                <button class="page-link" id="nextButton" type="submit" name="" value="{{.}}">
                                    Next
                                </button>
                            </li>
                            {{/nextPage}}
                        {{/isLastPage}}
                        </ul>
                    </nav>
                {{/onlyOnePage}}
                `

                    paginationHtml = Mustache.render(paginationTemplate, response)
                    $.map(response.persons, function(person){
                        personHtml=`<tr class="tr">

                        <td>${person.anrede}</td>
                        <td>${person.vorname}</td>
                        <td>${person.nachname}</td>
                        <td>${person.email}</td>
                        <td>${person.telefon}</td>
                        <td>${person.handy}}</td>
                        <td>${person.company}</td>
                        <td><button class="btn btn-primary">Updaten</button><td>
                        <td ><input type="checkbox" ></td>
                        </tr>`

                     
                        
                        
                        $('tbody').append(personHtml)
                    })

                    $('#paginationContainer').append(paginationHtml)

                    $('#currentLimit').val(val)
                    $('#currentLimit').text(val)

                    $('#ajaxPageLimit option').show();
                    $('#ajaxPageLimit option:selected').hide();


                  

                }

            })

        } else {
            var val = $('#ajaxPageLimit').val();

            var query = $('#searchInput').val().toLowerCase().trim();
            var personProperty = $('#personProperty').val().trim();
            var limit = $('#ajaxPageLimit').val().trim();
            console.log(limit)
            $.ajax({
                url: '/persons/search',
                data: {
                    'query': query,
                    'personProperty': personProperty,
                    'limit': limit,
                    'currentPage': 1
                },
                method: 'POST',

                success: function (response) {
                    $('.tr').remove()
                    var tableRows = $(response).find('.tr')
                    $('#ajaxPageLimit option').show();
                    $('#ajaxPageLimit option:selected').hide();
                    $('#trHeader').after(tableRows)
                    $('#paginationContainer').remove()
                    $('#currentLimit').val(val)
                    $('#currentLimit').text(val)
                    var pagination = $(response).find('#paginationContainer')
                    $('#table').after(pagination)

                },
                error: function () {

                }
            });
        }

    })
    
})