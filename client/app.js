// I would normaly use React or something - but since I don't really know any,
// I'm just using plain-old Module-Pattern with jQuery

(function(){
    function signup(){
        const username = $('#signupForm #signupUsername').val();
        const password = $('#signupForm #signupPassword').val();

        $.ajax('post', '/v1/access-control/signup', {username, password}, (error, result) => {
            if (error)
                alert('Error');
            else
                alert('ok: ' + JSON.stringify(result));
        });
    }


    // Initialization
    $(function(){

        $('#signupLink').click(e => {
            $('form').css('display', 'none');
            $('#signupForm').css('display', 'block');
        });

        $('#loginLink').click(e => {
            $('form').css('display', 'none');
            $('#loginForm').css('display', 'block');
        });

        $('#logoutLink').click(e => {
            logout();
        });

        $('#signupButton').click(e => {
            signup();
        });

        $('#loginButton').click(e => {
            login();
        });
    });
})();
