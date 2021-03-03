/// <reference path="jquery-3.3.1.min.js" />



window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;






$(document).ready(function () {
    contactsNamespace.initialize();
});
(function () {

    this.contactsNamespace = this.contactsNamespace || {};
    var ns = this.contactsNamespace;
    var currentRecord;
    var db;


    ns.initialize = function () {
        $('#btnSave').on('click', ns.save);
        var request = indexedDB.open("IdbR44DB", 1);

        request.onupgradeneeded = function (response) {
            var options = {
                keypath: "id", autoIncrement: true
            };
            response.currentTarget.result.createObjectStore("contacts", options);
        }
        request.onsuccess = function (respon) {
            db = request.result;
            ns.display();

        }

    }

    function retrieveFromStorage() {
        var contactsJSON = localStorage.getItem('contacts');
        return contactsJSON ? JSON.parse(contactsJSON) : [];
    }

    ns.display = function () {
        $('#currentAction').html('Add Contact');
        currentRecord = { key: null, contact: {} };
        displayCurrentRecord();

        var result = retrieveFromStorage();
        bindToGrid(result);

    }
    function bindToGrid(result) {
        var html = '';
        for (var i = 0; i < result.length; i++) {
            var contact = result[i];
            html += '<tr><td>' + contact.email + '</td>';
            html += '<td>' + contact.firstName + '' + contact.lastName + '</td > ';
            html += '<td> <a class="edit" href="javascript:void(0)" data-key=' + i + '>Edit</a></td ></tr> ';

        }
        html = html || '<tr><td colspan="3">No Records Available Here!!!!!</td></tr>'
        $('#contacts tbody').html(html);
        $('#contacts a.edit').on('click', ns.loadContact);
    }
    ns.loadContact = function () {
        var key = parseInt($(this).attr('data-key'));
        var result = retrieveFromStorage();
        $('#currentAction').html('Edit Contact');
        currentRecord = { key: key, contact: result[key] };
        displayCurrentRecord();

    }
    function displayCurrentRecord() {
        var contact = currentRecord.contact;
        $('#firstName').val(contact.firstName);
        $('#lastName').val(contact.lastName);
        $('#email').val(contact.email);
        $('#phoneNumber').val(contact.phoneNumber);
        //$('#fileUpload').val(contact.phoneNumber);
    }

    ns.save = function () {
        var contact = currentRecord.contact;
        contact.firstName = $('#firstName').val();
        contact.lastName = $('#lastName').val();
        contact.email = $('#email').val();
        contact.phoneNumber = $('#phoneNumber').val();
        //contact.phoneNumber = $('#fileUpload').val();

        var results = retrieveFromStorage();
        if (currentRecord.key != null) {
            results[currentRecord.key] = contact;
        }
        else {
            results.push(contact)
        }
        localStorage.setItem('contacts', JSON.stringify(results));
        ns.display();
    }
})();






//    'use strict';
//    /**
//    // ||||||||||||||||||||||||||||||| \\
//    //	Global Object $: Generic controls
//    // ||||||||||||||||||||||||||||||| \\
//    **/
//        (function () {
//            // http://stackoverflow.com/questions/4083351/what-does-jquery-fn-mean
//            var $ = function (elem) {
//                if (!(this instanceof $)) {
//                    return new $(elem);
//}
//this.el = document.getElementById(elem);
//};
//window.$ = $;
//            $.prototype = {
//        onChange: function (callback) {
//        this.el.addEventListener('change', callback);
//    return this;
//}
//};
//})();

///**
//// ||||||||||||||||||||||||||||||| \\
////	Drag and Drop code for Upload
//// ||||||||||||||||||||||||||||||| \\
//**/
//        var dragdrop = {
//        init: function (elem) {
//        elem.setAttribute('ondrop', 'dragdrop.drop(event)');
//    elem.setAttribute('ondragover', 'dragdrop.drag(event)');
//},
//            drop: function (e) {
//        e.preventDefault();
//    var file = e.dataTransfer.files[0];
//    runUpload(file);
//},
//            drag: function (e) {
//        e.preventDefault();
//}
//};

///**
//// ||||||||||||||||||||||||||||||| \\
////	Code to capture a file (image)
////  and upload it to the browser
//// ||||||||||||||||||||||||||||||| \\
//**/
//        function runUpload(file) {
//            // http://stackoverflow.com/questions/12570834/how-to-preview-image-get-file-size-image-height-and-width-before-upload
//            if (file.type === 'image/png' ||
//        file.type === 'image/jpg' ||
//        file.type === 'image/jpeg' ||
//        file.type === 'image/gif' ||
//                file.type === 'image/bmp') {
//                var reader = new FileReader(),
//        image = new Image();
//    reader.readAsDataURL(file);
//                reader.onload = function (_file) {
//        $('imgPrime').el.src = _file.target.result;
//    $('imgPrime').el.style.display = 'inline';
//} // END reader.onload()
//} // END test if file.type === image
//}

///**
//// ||||||||||||||||||||||||||||||| \\
////	window.onload fun
//// ||||||||||||||||||||||||||||||| \\
//**/
//        window.onload = function () {
//            if (window.FileReader) {
//        // Connect the DIV surrounding the file upload to HTML5 drag and drop calls
//        dragdrop.init($('userActions').el);
//    //	Bind the input[type="file"] to the function runUpload()
//                $('fileUpload').onChange(function () {runUpload(this.files[0]); });
//            } else {
//                // Report error message if FileReader is unavilable
//                var p = document.createElement('p'),
//        msg = document.createTextNode('Sorry, your browser does not support FileReader.');
//    p.className = 'error';
//    p.appendChild(msg);
//    $('userActions').el.innerHTML = '';
//    $('userActions').el.appendChild(p);
//}
//};

   