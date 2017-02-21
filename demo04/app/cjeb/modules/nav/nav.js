define(function(require, exports, module) {
    var loginSucHtml = "<span class='log-suc'>登录成功</span>" +
        "<span class='login-out'>注销<span>";
    var navMod = {
        init: function() {
            this.login();
            this.register();
            if (sessionStorage.getItem('uid')) {
                $('#logWin').html(loginSucHtml);
            }
        },
        login: function() {
            $('#logWin').on('click', '#log', function(event) {
                $('.globalbg').show('slow');
                $('.register-div').hide('slow');
                $('.login-div').show('slow');
            });
            $('.login-inreg-btn').on('click', function(event) {
                $('.globalbg').show('slow');
                $('.register-div').hide('slow');
                $('.login-div').show('slow');
            });
            $('.login-btn').click(function(event) {
                var username = $('.username-login').val();
                var password = $('.password-login').val();
                var sqlservice = new gEcnu.WebSQLServices.SQLServices({
                    'processCompleted': function(data) {
                        if (data&&data.length!==0) {
                            alert("登录成功！");
                            $('.globalbg').hide('slow');
                            $('.login-div').hide('slow');
                            sessionStorage.setItem('uid', data[0].uid);
                            $('#logWin').html(loginSucHtml);
                        }
                    },
                    'processFailed': function() {
                        alert("登录失败！");
                    }
                });
                var filter = 'username="' + username + '" and password="' + password + '"';
                var sql = { 'lyr': 'users', 'fields': 'uid', 'filter': filter };
                sqlservice.processAscyn("SQLQUERY", "CJEB", sql);
            });
        },
        register: function() {
            $('#logWin').on('click', '#sign_up', function(event) {
                $('.globalbg').show('slow');
                $('.login-div').hide('slow');
                $('.register-div').show('slow');
            });
            $('.goto-register').click(function(event) {
                $('.globalbg').show('slow');
                $('.login-div').hide('slow');
                $('.register-div').show('slow');
            });
            $('.submit-register-btn').click(function(event) {
                event.preventDefault();
                var username = $('.username').val();
                var pswd = $('.pwd-text').val();
                var pswd2 = $('.re-pwd-text').val();
                var email = $('.email').val();
                if (pswd !== pswd2) {
                    alert('两次输入的密码不一样！');
                    return;
                }
                if (username && pswd && pswd2) {
                    var sqlservice = new gEcnu.WebSQLServices.SQLServices({
                        'processCompleted': function() {
                            alert("注册成功，请登录！");
                        },
                        'processFailed': function() {
                            alert("对不起，注册失败！用户名已经被使用！");
                        },
                    });
                    var Params = {
                        'Fields': ["username", "password", "email"],
                        'Data': [
                            [username, pswd, email]
                        ]
                    };
                    sqlservice.processAscyn("ADD", "CJEB", "users", Params);
                }

            });

        }
    };

    $('.login-div-close').click(function(event) {
        $('.globalbg').hide('slow');
        $('.login-div').hide('slow');
    });
    $('.register-div-close').click(function(event) {
        $('.globalbg').hide('slow');
        $('.register-div').hide('slow');
    });

    // $('#logWin').on('hover', '.log-suc', function(event) {
    // 	$('.login-out').show('slow');
    // });
    $('#logWin').hover(function() {
        $('.login-out').show('slow');
    }, function() {
        $('.login-out').hide('slow');
    });
    $('#logWin').on('click', '.login-out', function(event) {
        sessionStorage.setItem('uid', '');
        var initLoginHtml = "<span id='log' class='logBtn'>登录</span>" +
            "<div id='log_cut'></div>" +
            "<span id='sign_up' class='logBtn'>注册</span>";
        $('#logWin').html(initLoginHtml);
    });
    module.exports = navMod;
});
