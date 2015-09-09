$(function () {
    /*evento click del listado de las personas*/
    $(document).on("click", "a#user_list", function () {
        getListaPersonas();
    });
    /*evento click del creado de personas*/
    $(document).on("click", "a#create_user_form", function () {
        $('#loading').show();
        $("div#content").load("application/views/index/ui/formcreatepersonas.htm", function () {
            $('#loading').hide();
        });




        //getCreateForm(this);
    });
    $(document).on("click", "button#add_user", function () {
        addUser(this);
    });
    $(document).on("click", "a.delete_confirm", function () {
        deleteConfirmation(this);
    });
    $(document).on("click", "button.delete", function () {
        deleteUser(this);
    });
    $(document).on("dblclick", "td.edit", function () {
        makeEditable(this);
    });
    $(document).on("blur", "input#editbox", function () {
        removeEditable(this)
    });
});
/*Funsion que invoca al controlador*/
function getListaPersonas() {
    $('#loading').show();
    $.post('application/controllers/Controller.php',
            {
                action: 'get_Personas'
            },
    function (data, textStatus) {
        renderListaPersonas(data);
        $('#loading').hide();
    },
            "json"
            );
}
/*Listar de todas las Personas*/
function renderListaPersonas(jsonData) {

    var table = '<table width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr><th scope="col">Nombres</th><th scope="col">Email</th><th scope="col">Telefono</th><th scope="col">Direccion</th><th scope="col">Acciones</th></tr></thead><tbody>';

    $.each(jsonData, function (index, user) {
        table += '<tr>';
        table += '<td class="edit" field="name" user_id="' + user.id + '">' + user.name + '</td>';
        table += '<td class="edit" field="email" user_id="' + user.id + '">' + user.email + '</td>';
        table += '<td class="edit" field="mobile" user_id="' + user.id + '">' + user.mobile + '</td>';
        table += '<td class="edit" field="address" user_id="' + user.id + '">' + user.address + '</td>';
        table += '<td><a href="javascript:void(0);" user_id="' + user.id + '" class="delete_confirm"><i class="fa fa-trash"></i></a></td>';
        table += '</tr>';
    });

    table += '</tbody></table>';

    $('div#content').html(table);
}

function getCreateForm(element) {
    var form = '<div class="input-prepend">';
    form += '<span class="add-on"><i class="icon-user icon-black"></i> Name</span>';
    form += '<input type="text" id="name" name="name" value="" class="input-xlarge" />';
    form += '</div><br/><br/>';

    form += '<div class="input-prepend">';
    form += '<span class="add-on"><i class="icon-envelope icon-black"></i> Email</span>';
    form += '<input type="text" id="email" name="email" value="" class="input-xlarge" />';
    form += '</div><br/><br/>';

    form += '<div class="input-prepend">';
    form += '<span class="add-on"><i class="icon-headphones icon-black"></i> Mobile</span>';
    form += '<input type="text" id="mobile" name="mobile" value="" class="input-xlarge" />';
    form += '</div><br/><br/>';

    form += '<div class="input-prepend">';
    form += '<span class="add-on add-on-area "><i class="icon-home icon-black"></i> Address</span>';
    form += '<textarea row="5" id="address" name="address" class="input-xlarge"></textarea>';
    form += '</div><br/><br/>';

    form += '<div class="control-group">';
    form += '<div class="">';
    form += '<button type="button" id="add_user" class="btn btn-primary"><i class="icon-ok icon-white"></i> Add User</button>';
    form += '</div>';
    form += '</div>';

    $('div#content').html(form);
    $('#loading').hide();
}
function removeEditable(element) {

    $('#indicator').show();

    var User = new Object();
    User.id = $('.current').attr('user_id');
    User.field = $('.current').attr('field');
    User.newvalue = $(element).val();

    var userJson = JSON.stringify(User);

    $.post('application/controllers/Controller.php',
            {
                action: 'update_field_data',
                user: userJson
            },
    function (data, textStatus) {
        $('td.current').html($(element).val());
        $('.current').removeClass('current');
        $('#indicator').hide();
    },
            "json"
            );
}

function makeEditable(element) {
    $(element).html('<input id="editbox" size="' + $(element).text().length + '" type="text" value="' + $(element).text() + '">');
    $('#editbox').focus();
    $(element).addClass('current');
}

function deleteConfirmation(element) {
    $("#delete_confirm_modal").modal("show");
    $("#delete_confirm_modal input#user_id").val($(element).attr('user_id'));
}

function deleteUser(element) {

    var User = new Object();
    User.id = $("#delete_confirm_modal input#user_id").val();

    var userJson = JSON.stringify(User);

    $.post('application/controllers/Controller.php',
            {
                action: 'delete_user',
                user: userJson
            },
    function (data, textStatus) {
        getListaPersonas(element);
        $("#delete_confirm_modal").modal("hide");
    },
            "json"
            );
}



function addUser(element) {

    $('#loading').show();

    var User = new Object();
    User.name = $('input#name').val();
    User.email = $('input#email').val();
    User.mobile = $('input#mobile').val();
    User.address = $('input#address').val();

    var userJson = JSON.stringify(User);

    $.post('application/controllers/Controller.php',
            {
                action: 'add_user',
                user: userJson
            },
    function (data, textStatus) {
        getListaPersonas(element);

    },
            "json"
            );
}

$(document).ready(function () {

    $(window).resize(function () {

        // aquí le pasamos la clase o id de nuestro div a centrar (en este caso "caja")
        $('.imgLoad').css({
            position: 'absolute',
            left: ($(window).width() - $('.imgLoad').outerWidth()) / 2,
            top: ($(window).height() - $('.imgLoad').outerHeight()) / 2
        });

    });

// Ejecutamos la función
    $(window).resize();

});