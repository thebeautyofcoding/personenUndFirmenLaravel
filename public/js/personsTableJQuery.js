$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(document).ready(function () {

    $(this).on('click', ':button.personPageButton, :button#nextButton, :button#previousButton', function () {

        var currentPageNumber = $(this).val();

        console.log(currentPageNumber)
        var ajaxPageLimit = $('#ajaxPageLimit').val()
        if ($('#personProperty').val() === '' && $('#searchInput').val() === '') {

            var controllerpath = `/ajax/persons?page=${currentPageNumber}&ajaxPageLimit=${ajaxPageLimit}`;


            $.ajax({
                type: "GET",
                url: controllerpath,




                success: function (response) {

                    $('.tr').each(function () {
                        $(this).remove()
                    })

                    $('#currentLimit').val(ajaxPageLimit)
                    $('#currentLimit').text(ajaxPageLimit)


                    console.log(response.persons)
                    $.map(response.persons.data, function (person) {
                        personHtml = `<tr data-id="${person.id}" class="tr">


                         <td  class="anrede">${person.anrede}</td>
                        <td class="vorname">${person.vorname}</td>
                        <td class="nachname">${person.nachname}</td>
                        <td class="email">${person.email}</td>
                        <td class="telefon">${person.telefon}</td>
                        <td class="handy">${person.handy}</td>
                        <td value="${person.firma.id}"class="firma">${person.firma.name}</td>
                        <td ><button data-id="${person.id}" data-target="#editPerson${person.id}" data-toggle="modal" class="btn btn-primary update">Updaten</button><td>
                        <td ><input class="personsToDeleteCheckbox" type="checkbox" name="personsToDelete" value="${person.id}"></td>
                        </tr>`


                        var editModal = `
            <div class="modal" id="editPerson${person.id}" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editiere ${person.vorname} ${person.nachname}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden"data-id="${person.id}" id="id" value="${person.id}">
                        <input type="text" class="form-control mb-3 anrede"  value="${person.anrede}">
                        <input type="text" class="form-control mb-3 vorname"  value="${person.vorname}">
                        <input type="text" class="form-control mb-3 nachname"   value="${person.nachname}">
                        <input type="text" class="form-control mb-3 email"   value="${person.email}">
                        <input type="text" class="form-control mb-3 telefon"   value="${person.telefon}">
                        <input type="text" class="form-control mb-3 handy"  value="${person.handy}">


                <div id="companiesSelectMenu">

                </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" data-id="${person.id}" data-dismiss="modal" data-target="#editPerson${person.id}" class="btn btn-primary updateButton">Save changes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>


                            `
                        $('#myTable').after(editModal)

                        $('tbody').append(personHtml)
                    })






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
                    var pagintationHtml = Mustache.render(paginationTemplate, response)
                    $('#paginationContainer').append(pagintationHtml)

                    $(`button[value=${response.persons.current_page}]`).closest('li').addClass('disabled')


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



            var limit = $("#ajaxPageLimit").val();
            var query = $("#searchInput").val();

            var personProperty = $('#personProperty').val()
            var ajaxPageLimit = $('#ajaxPageLimit').val()
            console.log(ajaxPageLimit)
            $.ajax({
                type: "GET",
                url: `persons/search?page=${currentPageNumber}&personProperty=${personProperty}&ajaxPageLimit=${ajaxPageLimit}&query=${query}`,

                success: function (response) {
                    console.log('success')
                    $('.tr').each(function () {
                        $(this).remove()
                    })

                    $('#currentLimit').val(limit)
                    $('#currentLimit').text(limit)


                    $.map(response.persons.data, function (person) {
                        personHtml = `<tr data-id="${person.id}" class="tr">

                         <td  class="anrede">${person.anrede}</td>
                        <td class="vorname">${person.vorname}</td>
                        <td class="nachname">${person.nachname}</td>
                        <td class="email">${person.email}</td>
                        <td class="telefon">${person.telefon}</td>
                        <td class="handy">${person.handy}</td>
                        <td value="${person.firma.id}"class="firma">${person.firma.name}</td>
                        <td ><button data-id="${person.id}" data-target="#editPerson${person.id}" data-toggle="modal" class="btn btn-primary update">Updaten</button><td>
                        <td ><input class="personsToDeleteCheckbox" type="checkbox" name="personsToDelete" value="${person.id}"></td>
                        </tr>`





                        $('tbody').append(personHtml)
                        var editModal = `
            <div class="modal" id="editPerson${person.id}" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editiere ${person.vorname} ${person.nachname}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden"data-id="${person.id}" class="id"value="${person.id}">
                        <input type="text" class="form-control mb-3 anrede" value="${person.anrede}">
                        <input type="text" class="form-control mb-3 vorname" value="${person.vorname}">
                        <input type="text" class="form-control mb-3 nachname" value="${person.nachname}">
                        <input type="text" class="form-control mb-3 email"  value="${person.email}">
                        <input type="text" class="form-control mb-3 telefon"  value="${person.telefon}">
                        <input type="text" class="form-control mb-3 handy" value="${person.handy}">


                <div id="companiesSelectMenu">

                </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" data-id="${person.id}" data-dismiss="modal" data-target="#editPerson${person.id}" class="btn btn-primary updateButton">Save changes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>


                            `
                        $('#myTable').after(editModal)
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
                    $(`button[value=${response.persons.current_page}]`).closest('li').addClass('disabled')
                },
                error: function (e) {
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
                    url: `persons/search?page=${currentPageNumber}&personProperty=${personProperty}&ajaxPageLimit=${ajaxPageLimit}&query=${query}`,

                    method: 'GET',

                    success: function (response) {
                        $('.tr').remove()
                        var tableRows = $(response).find('.tr')

                        $.map(response.persons.data, function (person) {
                            personHtml = `<tr data-id="${person.id}" class="tr">

                         <td  class="anrede">${person.anrede}</td>
                        <td class="vorname">${person.vorname}</td>
                        <td class="nachname">${person.nachname}</td>
                        <td class="email">${person.email}</td>
                        <td class="telefon">${person.telefon}</td>
                        <td class="handy">${person.handy}</td>
                        <td value="${person.firma.id}"class="firma">${person.firma.name}</td>
                        <td ><button data-id="${person.id}" data-target="#editPerson${person.id}" data-toggle="modal" class="btn btn-primary update">Updaten</button><td>
                        <td ><input class="personsToDeleteCheckbox" type="checkbox" name="personsToDelete" value="${person.id}"></td>
                        </tr>`


                            var editModal = `
            <div class="modal" id="editPerson${person.id}" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editiere ${person.vorname} ${person.nachname}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden"data-id="${person.id}" class="id"value="${person.id}">
                        <input type="text" class="form-control mb-3 anrede" value="${person.anrede}">
                        <input type="text" class="form-control mb-3 vorname" value="${person.vorname}">
                        <input type="text" class="form-control mb-3 nachname" value="${person.nachname}">
                        <input type="text" class="form-control mb-3 email"  value="${person.email}">
                        <input type="text" class="form-control mb-3 telefon" value="${person.telefon}">
                        <input type="text" class="form-control mb-3 handy" value="${person.handy}">


                <div id="companiesSelectMenu">

                </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" data-id="${person.id}" data-dismiss="modal" data-target="#editPerson${person.id}" class="btn btn-primary updateButton">Save changes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>


                            `
                            $('#myTable').after(editModal)


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
                'ajaxPageLimit': limit,
                'currentPage': 1
            },
            method: 'GET',

            success: function (response) {
                $('.tr').remove()

                $.map(response.persons.data, function (person) {
                    personHtml = `<tr data-id="${person.id}" class="tr">

                         <td  class="anrede">${person.anrede}</td>
                        <td class="vorname">${person.vorname}</td>
                        <td class="nachname">${person.nachname}</td>
                        <td class="email">${person.email}</td>
                        <td class="telefon">${person.telefon}</td>
                        <td class="handy">${person.handy}</td>
                        <td value="${person.firma.id}"class="firma">${person.firma.name}</td>
                        <td ><button data-id="${person.id}" data-target="#editPerson${person.id}" data-toggle="modal" class="btn btn-primary update">Updaten</button><td>
                        <td ><input class="personsToDeleteCheckbox" type="checkbox" name="personsToDelete" value="${person.id}"></td>
                        </tr>`





                    $('tbody').append(personHtml)
                    var editModal = `
            <div class="modal" id="editPerson${person.id}" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editiere ${person.vorname} ${person.nachname}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden"data-id="${person.id}" class="id"value="${person.id}">
                        <input type="text" class="form-control mb-3 anrede" value="${person.anrede}">
                        <input type="text" class="form-control mb-3 vorname"value="${person.vorname}">
                        <input type="text" class="form-control mb-3 nachname"  value="${person.nachname}">
                        <input type="text" class="form-control mb-3 email"  value="${person.email}">
                        <input type="text" class="form-control mb-3 telefon"  value="${person.telefon}">
                        <input type="text" class="form-control mb-3 handy"  value="${person.handy}">


                <div id="companiesSelectMenu">

                </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" data-id="${person.id}" data-dismiss="modal" data-target="#editPerson${person.id}" class="btn btn-primary updateButton">Save changes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>


                            `
                    $('#myTable').after(editModal)
                })



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
                var pagintationHtml = Mustache.render(paginationTemplate, response)
                console.log(pagintationHtml)
                $('#paginationContainer').append(pagintationHtml)
                $(`button[value=${response.persons.current_page}]`).closest('li').addClass('disabled')
            },
            error: function () {

            }
        });
    });



    $('#ajaxPageLimit').change(function () {


        var val = $('#ajaxPageLimit').val();

        var personProperty = $('#personProperty').val();
        var searchInput = $('#searchInput').val();


        const pageNumber = $('.page-item.disabled').find('#pageButton').val()

        var controllerpath = $("#uri_hidden").val();

        if (personProperty == '' && searchInput == '') {


            $.ajax({
                type: "GET",
                url: '/ajax/persons',
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
                    $.map(response.persons.data, function (person) {
                        personHtml = `<tr data-id="${person.id}" class="tr">

                        <td  class="anrede">${person.anrede}</td>
                        <td class="vorname">${person.vorname}</td>
                        <td class="nachname">${person.nachname}</td>
                        <td class="email">${person.email}</td>
                        <td class="telefon">${person.telefon}</td>
                        <td class="handy">${person.handy}</td>
                        <td value="${person.firma.id}"class="firma">${person.firma.name}</td>
                        <td ><button data-id="${person.id}" data-target="#editPerson${person.id}" data-toggle="modal" class="btn btn-primary update">Updaten</button><td>
                        <td ><input class="personsToDeleteCheckbox" type="checkbox" name="personsToDelete" value="${person.id}"></td>
                        </tr>`


                        var editModal = `
            <div class="modal" id="editPerson${person.id}" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editiere ${person.vorname} ${person.nachname}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden"data-id="${person.id}" class="id"value="${person.id}">
                        <input type="text" class="form-control mb-3 anrede" value="${person.anrede}">
                        <input type="text" class="form-control mb-3 vorname" value="${person.vorname}">
                        <input type="text" class="form-control mb-3 nachname"  value="${person.nachname}">
                        <input type="text" class="form-control mb-3 email"  value="${person.email}">
                        <input type="text" class="form-control mb-3 telefon" value="${person.telefon}">
                        <input type="text" class="form-control mb-3 handy" value="${person.handy}">


                <div id="companiesSelectMenu">

                </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" data-id="${person.id}" data-dismiss="modal" data-target="#editPerson${person.id}" class="btn btn-primary updateButton">Save changes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>


                            `
                        $('#myTable').after(editModal)


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
                    'ajaxPageLimit': limit,
                    'page': 1
                },
                method: 'GET',

                success: function (response) {
                    $('.tr').remove()
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
                    $('#paginationContainer').append(paginationHtml)
                    $.map(response.persons.data, function (person) {
                        personHtml = `<tr data-id="${person.id}" class="tr">

                        <td  class="anrede">${person.anrede}</td>
                        <td class="vorname">${person.vorname}</td>
                        <td class="nachname">${person.nachname}</td>
                        <td class="email">${person.email}</td>
                        <td class="telefon">${person.telefon}</td>
                        <td class="handy">${person.handy}</td>
                        <td value="${person.firma.id}"class="firma">${person.firma.name}</td>
                        <td ><button data-id="${person.id}" data-target="#editPerson${person.id}" data-toggle="modal" class="btn btn-primary update">Updaten</button><td>
                        <td ><input class="personsToDeleteCheckbox" type="checkbox" name="personsToDelete" value="${person.id}"></td>
                        </tr>`


                        var editModal = `
            <div class="modal" id="editPerson${person.id}" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editiere ${person.vorname} ${person.nachname}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden"data-id="${person.id}" class="id"value="${person.id}">
                        <input type="text" class="form-control mb-3 anrede" value="${person.anrede}">
                        <input type="text" class="form-control mb-3 vorname" value="${person.vorname}">
                        <input type="text" class="form-control mb-3 nachname"  value="${person.nachname}">
                        <input type="text" class="form-control mb-3 email"  value="${person.email}">
                        <input type="text" class="form-control mb-3 telefon"  value="${person.telefon}">
                        <input type="text" class="form-control mb-3handy"  value="${person.handy}">


                <div id="companiesSelectMenu">

                </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" data-id="${person.id}" data-dismiss="modal" data-target="#editPerson${person.id}" class="btn btn-primary updateButton">Save changes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>


                            `
                        $('#myTable').after(editModal)

                        $('tbody').append(personHtml)
                    })

                },
                error: function () {

                }
            });
        }

    })



    $(this).on('change', '.personsToDeleteCheckbox', function () {
        $('tr').not(':has(:checkbox:checked)').removeClass('waitingToBeRemoved')
        $('tr').filter(':has(:checkbox:checked)').each(function () {
            $(this).addClass('waitingToBeRemoved')

        });

    })
    $('#deletePersons').hide()
    $(this).on('change', function () {

        $(this).each(function () {

            $('.personsToDeleteCheckbox:checkbox:checked').length > 0 ? $('#deletePersons').fadeIn() : $('#deletePersons').fadeOut()

        })
    })
    $('#deletePersons').on('click', function () {

        var personsToDelete = []
        $("input:checkbox:checked").each(function () {
            personsToDelete.push($(this).val());
        });
        $.ajax({
            url: '/personsDelete', // separate file for search
            data: {
                personsToDelete: personsToDelete
            },
            method: 'POST',

            success: function (response) {


                $('.waitingToBeRemoved').css({
                    'background-color': '#f60000',
                    'color': '#fff'
                });
                $('.waitingToBeRemoved').fadeOut('slow', function () {
                    $(this).remove();
                })


                $('#deletePersons').fadeOut('slow')




            }



        })



    })

    $(this).on('click', '.update', function () {

        console.log($(this))
        console.log($(this).parent().siblings('.firma').attr('value'))
        var updateButtonId = $(this).data('id')
        var companyId = $(this).parent().siblings('.firma').attr('value');

        $.ajax({
            url: 'companies',
            method: 'GET',
            success: function (response) {
                var selectMenuHtml = `<select class="form-control" name="companies" id="company">
                <option value="">Bitte auswählen:</option>`;

                $.each(response.companies, function () {
                    selectMenuHtml = selectMenuHtml + ` <option value="${this.id}">${this.name}</option>`
                })

                selectMenuHtml = selectMenuHtml + `</select>`

                $('#company').remove()






                $(`input[data-id="${updateButtonId}"]`).siblings('#companiesSelectMenu').append(selectMenuHtml)
                $(`option[value='${companyId}']`).attr('selected', 'selected');

                console.log(companyId)
                $('#editPerson').modal('show')
            }

        })
    })


    $(this).on('click', '.updateButton', function () {

        personId = $(this).data('id')
        anrede = $(`#editPerson${personId}`).find('.anrede').val()
        vorname = $(`#editPerson${personId}`).find('.vorname').val()
        nachname = $(`#editPerson${personId}`).find('.nachname').val()

        email = $(`#editPerson${personId}`).find('.email').val()
        telefon = $(`#editPerson${personId}`).find('.telefon').val()
        handy = $(`#editPerson${personId}`).find('.handy').val()
        firma = $(`#editPerson${personId}`).find('#company').val()

        console.log($(`#editPerson${personId}`).find('.vorname').val())
        console.log($(this).parents(`.tr[data-id="${personId}"]`).find(`#editPerson${personId}`).find('.modal-body').find('.vorname'))
        $.ajax({
            url: 'persons/edit',
            data: {
                'id': personId,
                'anrede': anrede,
                'vorname': vorname,
                'nachname': nachname,
                'email': email,
                'telefon': telefon,
                'handy': handy,
                'firma': firma,

            },
            method: 'PATCH',
            success: function (response) {
                $('body').removeClass('modal-open')
                $('#editPerson').remove()
                $('.modal-backdrop').remove()



                $("tr[data-id='" + personId + "']").find('.anrede').html(`${response.updatedPerson.anrede}`)
                $("tr[data-id='" + personId + "']").find('.vorname').html(`${response.updatedPerson.vorname}`)
                $("tr[data-id='" + personId + "']").find('.nachname').html(`${response.updatedPerson.nachname}`)
                $("tr[data-id='" + personId + "']").find('.email').html(`${response.updatedPerson.email}`)
                $("tr[data-id='" + personId + "']").find('.telefon').html(`${response.updatedPerson.telefon}`)
                $("tr[data-id='" + personId + "']").find('.handy').html(`${response.updatedPerson.handy}`)
                $("tr[data-id='" + personId + "']").find('.firma').html(`${response.updatedPerson.firma.name}`)




            }
        })

    })

})
