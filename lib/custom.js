function store(data) {
    jQuery.each(data, function (k, v) {
        window.localStorage.setItem(k, v);
    });
}

function get(data) {
    return window.localStorage.getItem(data);
}

function unset(data) {
    jQuery.each(data, function (k, v) {
        window.localStorage.removeItem(v);
    });
}

function checkLogin() {
    if (get('id') != null) {
        return true;
    } else {
        return false;
    }
}

function getTimeDiff(startTime, curtime) {
    var date1 = new Date(startTime); // 9:00 AM
    var date2 = new Date(curtime);
    var diff = date1 - date2;
    return Math.floor(diff / 1000 / 60);
}

function getTimeDiffSec(startTime, curtime) {

    var date1 = new Date(curtime); // 9:00 AM
    var date2 = new Date(startTime);
    var diff = date1 - date2;
    return Math.floor(diff / 1000);
}

function getAfterTime(startTime, minutes) {
    var d = new Date(startTime);
    return d.setMinutes(d.getMinutes() + minutes);
}

function getBeforeTime(startTime, minutes) {
    var d = new Date(startTime);
    return d.setMinutes(d.getMinutes() - 10);
}

function getDayAfter(startTime, noofDay) {
    var startDt = new Date(startTime);
    console.log("start date " + startDt + "no day => " + noofDay);
    return startDt.setDate((startDt.getDate()) + (parseInt(noofDay)));
}
var x2js = new X2JS();
function convertXml2JSon(val) {
    return JSON.stringify(val);
}

function convertJSon2XML(val) {
    return x2js.json2xml_str(val);
}

function addNew(name) {

}

function addOther(name, field, val) {
    if (jQuery('#' + name + '-1').length == 0) {
        if (val == 0) {
            var htmlStr = '';
            htmlStr = "<div id='" + name + "-1'><label class='item item-input item-floating-label'><input type='text' name='new-" + name + "' ng-model='records." + name + "' placeholder='Please Enter " + field + "' required /></label></div>";
            $("[name='" + name + "']").parent().parent().append(htmlStr);//.append('<button type="button" class="button button-small addbtn" onclick="removeOther(\'' + name + '-' + 1 + '\',this)" id="rem-' + name + '-1" >Remove</button>');
        } else {
            jQuery('#' + name + '-1').remove();
            jQuery('#rem-' + name + '-1').remove();
        }
    } else {
        jQuery('#' + name + '-1').remove();
        jQuery('#rem-' + name + '-1').remove();
    }

}
function removeOther(ele) {
    console.log(ele);
    $("#rem-" + ele).remove();
    $('#' + ele).remove();
}

function addNew(name) {
    var num = $("[name='" + name + "[]']").length;
    toClone = $("[name='" + name + "[]']:first").parent().clone().prop('id', name + '-' + num);
    $("[name='" + name + "[]']").parent().parent().append(toClone).append('<button type="button" class="button button-small addbtn" onclick="removeElement(\'' + name + '-' + num + '\',this)" id="rem-' + name + '-' + num + '" >Remove</button>');
}
function removeElement(ele) {
    console.log(ele);
    $("#rem-" + ele).remove();
    $('#' + ele).remove();
}
//Ajax Calls 
function callAjax(aType, aUrl, aData, callback) {
    var res = '';
    $.ajax({
        type: aType,
        url: aUrl,
        data: aData,
        cache: false,
        contentType: false,
        processData: false,
        success: callback,
        error: function (e) {
            res = e.responseText;
        }
    });
    return res;
}

function classtoggle(b) {
    console.log("change colour")
    console.log("change colour" + b)
    // $('.joinfooter .tab-item').removeClass('active');
    $(b).toggleClass('active');
}

function toggleclass(b) {
    console.log("change colour----" + b)
    $('.timesheet li').removeClass('active');
    $(b).toggleClass('active');

}

//Ajax Calls 
function ajaxCall(aType, aUrl, aData, callback) {
    $.ajax({
        type: aType,
        url: aUrl,
        data: aData,
        cache: false,
        success: callback,
        error: function (e) {
            return e.responseText;
        }
    });

}
//Consultation Note records
function removeFile() {
    console.log('remove');
    jQuery('.img').val('');
    jQuery('#image-holder').html('');
    jQuery('#convalid').addClass('hide');
    jQuery('#coninprec').addClass('hide');
}

function removedFile(whr) {
    console.log('remove' + whr);
    jQuery('#' + whr + ' .img').val('');
    jQuery('#' + whr + ' #image-holder').html('');
}


function connect(token) {
    disableButtons();
    session.connect(token, function (err) {
        if (!err) {
            showConnection();
        } else {
            console.error(err);
            enableButtons();
        }
    });
}

function showConnection() {
    var connectedAs = document.getElementById('connected-as');
    connectedAs.textContent = 'Connected as ' + session.connection.data;
}

function disableButtons() {
    setButtons(false);
}

function enableButtons() {
    setButtons(true);
}

function setButtons(isEnabled) {
    var connectedAs = document.getElementById('connected-as');
    var buttons = connectedAs.querySelectorAll('button');
    buttons = Array.prototype.slice.call(buttons);
    buttons.forEach(function (button) {
        button.disabled = !isEnabled;
    });
}
function showpopup(b) {
    console.log(b);
    jQuery('#' + b).addClass('active');
}
function close_popup(b) {
    jQuery('#' + b).removeClass('active');
}
function sidetab(ab) {
    var wh = jQuery(window).height();
    var ww = (jQuery(window).width()) - 45;
    var b = jQuery(ab).offset().top;
    var t = wh - (b + 80);

    jQuery(ab).css('height', t + 'px');
    jQuery(ab).css('width', ww);
    jQuery(ab).css('transform', 'translate3d(' + (ww + 5) + 'px, 0px, 0px)');
}

function jumble(key,text){
    var returntext ="";
    for(i=0;i<text.length;i++){
        returntext= returntext + String.fromCharCode(text.charCodeAt(i)+key);
    }
    return returntext;
}

function unjumble(key,text){
    var returntext ="";
    for(i=0;i<text.length;i++){
        returntext=returntext+String.fromCharCode(text.charCodeAt(i)-key);
    }
    return returntext;
}

function encrypt (text){
    var returntext = cryptico.encrypt(text, publicKey);
    return returntext.cipher;
}

function decrypt (text){
    var returntext = cryptico.decrypt(text, privateKey);
    return returntext.plaintext;
}

