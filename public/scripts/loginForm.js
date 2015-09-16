var LoginControl = React.createClass({
    getInitialState: function () {
        return {
            messageClass:'alert alert-success',
            notificationMessage:''
        };
    },
    restRequest:function(url, verb) {
        return $.ajax({
            url: url,
            type: verb||'POST',
            data: this.state
        });
    },
    handleChange: function (event) {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    },
    displayHideNotification:function(css){
        this.state.messageClass = css;
        this.setState({ created:true });
        $('.alert').fadeIn("fast");
        setTimeout(function() {
            $('.alert').fadeOut("slow");
        }, 3000);
    },
    create:function() {
        var _context = this,
            response = _context.restRequest('api/create');
        //this.setState({notificationMessage:''});
        response.done(function(data) {
            _context.state.username = '';
            _context.state.password = '';
            _context.state.notificationMessage = "User created";
           _context.displayHideNotification('alert alert-success');
        }).fail(function(err) {
            console.log(err);
            _context.state.notificationMessage = "Error! unable to create user.";
            _context.displayHideNotification('alert alert-danger');
        });
    },
    logIn: function () {
        var response = this.restRequest('api/login');
        response.done(function() {
            document.location = '/';
        }).fail(function(error) {
            console.log(error);
        });
    },
    render: function () {
        return (

            <form role="form">
                <div className={ this.state.messageClass } style={ this.state.created? { display:'block' } : { display:'none' } }>{ this.state.notificationMessage }</div>
                <div className="form-group">
                    <label htmlFor="userName">User name:</label>
                    <input onChange={ this.handleChange } type="text" name="username" placeholder="Enter your user name"
                           className="form-control" id="userName" value={ this.state.username }/>
                </div>
                <div class="form-group">
                    <label htmlFor="userPassword">Password</label>
                    <input onChange={ this.handleChange } type="password" placeholder="Enter your password" name="password"
                           className="form-control" id="userPassword" value={ this.state.password }/>
                </div>
                <div className="form-group">
                    <hr/>
                    <a className="btn btn-success pull-right"  onClick={ this.create }>Create</a>
                    <a className="btn btn-primary" onClick={ this.logIn }>Sign in</a>&nbsp;
                    <a className="btn btn-default">Cancel</a>
                </div>
            </form>
        );
    }
});

React.render(<LoginControl />, document.getElementById('loginCtrl'));